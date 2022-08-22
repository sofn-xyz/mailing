import { resolve } from "path";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { copy, mkdir, mkdirp, readdir, remove, rm, writeFile } from "fs-extra";

import { debug } from "../../../util/log";

const SOURCE_FILE_REGEXP = /^[^\s-]+\.[tj]sx?$/; // no spaces, .js/x or .ts/x

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
    SOURCE_FILE_REGEXP.test(path)
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
    SOURCE_FILE_REGEXP.test(path)
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

    const moduleName = p.replaceAll(/\.[jt]sx/g, "");
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
  await copy(resolve(emailsDir), mailingEmailsPath, {
    overwrite: true,
    recursive: true,
    dereference: true,
    filter: (path) => !/__test__/.test(path),
  });
  debug(`copied ${emailsDir} to ${mailingEmailsPath}`);
  debug("writing module manifest to", manifestPath);
  // await mkdir(mailingPath, { recursive: true });
  await writeFile(manifestPath, contents);

  delete require.cache[manifestPath];
}

export function packageJsonVersionsMatch(): boolean {
  const mailingPackageJsonPath = "./.mailing/package.json";

  let mailingPackageJsonVersion: string, cliPackageJsonVersion: string;

  // read .mailing package.json
  try {
    const mailingPackageJson = readFileSync(mailingPackageJsonPath);
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

  cliPackageJsonVersion = execSync("npx mailing --version").toString().trim();
  debug("cli version:\t\t", cliPackageJsonVersion);

  // compare versions and return early if the same
  return cliPackageJsonVersion === mailingPackageJsonVersion;
}

export async function bootstrapMailingDir() {
  const mailingPath = "./.mailing";

  // return early if .mailing exists and version matches packages.json
  if (packageJsonVersionsMatch()) {
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
    filter: (path) =>
      !/__test__|generator_templates|src\/commands|src\/index/.test(path),
  });
}
