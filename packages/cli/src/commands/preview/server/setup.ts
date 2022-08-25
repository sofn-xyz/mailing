import { resolve } from "path";
import { execSync } from "child_process";
import {
  copy,
  mkdir,
  mkdirp,
  readdir,
  remove,
  rm,
  writeFile,
  readFile,
  appendFile,
} from "fs-extra";

import { debug, log } from "../../../util/log";

export const COMPONENT_FILE_REGEXP = /^[^\s-]+\.[tj]sx$/; // no spaces, .jsx or .tsx

export type PreviewServerOptions = {
  emailsDir: string;
  port: number;
  quiet: boolean;
};

export async function linkEmailsDirectory(emailsDir: string) {
  const mailingPath = ".mailing/src";
  const manifestPath = mailingPath + "/moduleManifest.ts";
  const previewsPath = emailsDir + "/previews";
  const mailingEmailsPath = mailingPath + "/emails";

  const previewCollections = (await readdir(previewsPath)).filter((path) =>
    COMPONENT_FILE_REGEXP.test(path)
  );
  debug("scanning for previews at", previewsPath, previewCollections);
  const uniquePreviewCollections = Array.from(new Set(previewCollections));
  const previewImports: string[] = [];
  const previewConsts: string[] = [];
  uniquePreviewCollections.forEach((p) => {
    const moduleName = p.replace(/\.[jt]sx/g, "");
    previewImports.push(
      `import * as ${moduleName}Preview from "./emails/previews/${moduleName}";`
    );
    previewConsts.push(`${moduleName}: ${moduleName}Preview`);
  });

  const templates = (await readdir(emailsDir)).filter((path) =>
    COMPONENT_FILE_REGEXP.test(path)
  );
  const uniqueTemplates = Array.from(new Set(templates));
  const templateImports: string[] = [];
  const templateModuleNames: string[] = [];
  let indexFound = false;
  uniqueTemplates.forEach((p) => {
    if (/^index\.[jt]sx?$/.test(p)) {
      indexFound = true; // index.ts, index.js
      return;
    }

    const moduleName = p.replace(/\.[jt]sx/g, "");
    templateModuleNames.push(moduleName);
    templateImports.push(`import ${moduleName} from "./emails/${moduleName}";`);
  });

  if (!indexFound)
    throw new Error("index.ts or index.js not found in emails directory");

  const contents =
    `import sendMail from "./emails";\n` +
    templateImports.join("\n") +
    "\n" +
    previewImports.join("\n") +
    "\n\n" +
    `const previews = { ${previewConsts.join(", ")} };\n` +
    `const templates = { ${templateModuleNames.join(", ")} };\n\n` +
    `export { templates, previews, sendMail };\n` +
    `const moduleManifest = { templates, previews, sendMail };\n` +
    `export default moduleManifest;\n\n`;

  // Re-copy emails directory
  await remove(mailingEmailsPath);
  await mkdirp(mailingEmailsPath);
  const copyEmailsDirContents = (await readdir(resolve(emailsDir)))
    .filter(
      (path) =>
        !/__test__$|\.mailing$|\.next$|node_modules|package\.json|^\.|yarn\.lock|yalc\.lock|mailing\.config\.json/.test(
          path
        )
    )
    .map((path) => {
      debug("copy to .mailing/src/emails", path);
      return copy(resolve(emailsDir, path), resolve(mailingEmailsPath, path), {
        overwrite: true,
        recursive: true,
        dereference: true,
      });
    });
  await Promise.all(copyEmailsDirContents);

  debug(`copied ${emailsDir} to ${mailingEmailsPath}`);
  debug("writing module manifest to", manifestPath);
  await writeFile(manifestPath, contents);

  delete require.cache[manifestPath];
}

export async function packageJsonVersionsMatch(): Promise<boolean> {
  const mailingPackageJsonPath = "./.mailing/package.json";

  let mailingPackageJsonVersion: string;

  // read .mailing package.json
  try {
    const mailingPackageJson = await readFile(mailingPackageJsonPath);
    const pkgJSON = JSON.parse(mailingPackageJson.toString());
    mailingPackageJsonVersion = pkgJSON.version;
    debug(".mailing version:\t", mailingPackageJsonVersion);
  } catch (err: any) {
    if ("ENOENT" === err?.code) {
      // .mailing package.json doesn't exist
      return false;
    } else {
      throw err;
    }
  }

  const cliPackageJsonVersion = execSync("npx mailing --version")
    .toString()
    .trim();
  debug("cli version:\t\t", cliPackageJsonVersion);

  // compare versions and return early if the same
  return cliPackageJsonVersion === mailingPackageJsonVersion;
}

export async function bootstrapMailingDir() {
  const mailingPath = "./.mailing";

  // return early if .mailing exists and version matches packages.json
  if (await packageJsonVersionsMatch()) {
    debug("versions match, returning");
    return;
  }

  // copy node_modules mailing into .mailing
  const nodeMailingPath = resolve(
    process.env.MM_DEV ? __dirname + "/../../../.." : __dirname + "/.."
  );

  debug("versions do not match, copying .mailing from", nodeMailingPath);

  await rm(mailingPath, { recursive: true, force: true });
  await mkdir(mailingPath, { recursive: true });
  await copy(nodeMailingPath, mailingPath, {
    recursive: true,
    dereference: true,
    overwrite: true,
    filter: (path) => {
      return !/__test__|generator_templates|src\/commands|src\/index\.ts$|src\/dev\.js$|\.mailing$|\.next$|node_modules$|\/cypress$/.test(
        path
      );
    },
  });

  // add .mailing to .gitignore if it does not exist
  try {
    const ignored = (await readFile(".gitignore")).toString().split("\n");
    if (ignored.includes(".mailing")) return;
    log("adding .mailing to .gitignore");
    await appendFile(".gitignore", "\n.mailing\n");
  } catch (err: any) {
    if ("ENOENT" === err?.code) {
      log("adding .gitignore");
      await writeFile(".gitignore", ".mailing\nnode_modules\n", { flag: "wx" });
    } else {
      throw err;
    }
  }
}
