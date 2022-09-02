import { relative, resolve } from "path";
import { execSync } from "child_process";
import pkg from "../../../../package.json";
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
import { build, BuildOptions } from "esbuild";

export const COMPONENT_FILE_REGEXP = /^[^\s-]+\.[tj]sx$/; // no spaces, .jsx or .tsx

export type PreviewServerOptions = {
  emailsDir: string;
  port: number;
  quiet: boolean;
};

export async function linkEmailsDirectory(emailsDir: string) {
  const dotMailingSrcPath = ".mailing/src";
  const dynManifestPath = dotMailingSrcPath + "/moduleManifest.ts";
  const dynFeManifestPath = dotMailingSrcPath + "/feManifest.ts";

  const previewsPath = emailsDir + "/previews";

  const previewCollections = (await readdir(previewsPath)).filter((path) =>
    COMPONENT_FILE_REGEXP.test(path)
  );
  debug("scanning for previews at", previewsPath, previewCollections);
  const uniquePreviewCollections = Array.from(new Set(previewCollections));
  const previewImports: string[] = [];
  const previewConsts: string[] = [];

  // calculate the relative path the user's emailsDir
  // so we can import templates and previews from there
  // when in the context of the build output
  const relativePathToEmailsDir = relative(dotMailingSrcPath, emailsDir);

  uniquePreviewCollections.forEach((p) => {
    const moduleName = p.replace(/\.[jt]sx/g, "");
    previewImports.push(
      `import * as ${moduleName}Preview from "${relativePathToEmailsDir}/previews/${moduleName}";`
    );
    previewConsts.push(`${moduleName}: ${moduleName}Preview`);
  });

  let indexFound = false;

  const emailsDirContents = await readdir(emailsDir);
  const templates = emailsDirContents.filter((path) => {
    if (/^index\.[jt]sx?$/.test(path)) {
      indexFound = true; // index.ts, index.js
      return false;
    }
    return COMPONENT_FILE_REGEXP.test(path);
  });
  if (!indexFound)
    throw new Error("index.ts or index.js not found in emails directory");

  const uniqueTemplates = Array.from(new Set(templates));
  const templateImports: string[] = [];
  const templateModuleNames: string[] = [];
  uniqueTemplates.forEach((p) => {
    const moduleName = p.replace(/\.[jt]sx/g, "");
    templateModuleNames.push(moduleName);
    templateImports.push(
      `import ${moduleName} from "${relativePathToEmailsDir}/${moduleName}";`
    );
  });

  const moduleManifestContents =
    `import config from "../../mailing.config.json";\n` +
    `import sendMail from "${relativePathToEmailsDir}";\n` +
    templateImports.join("\n") +
    "\n" +
    previewImports.join("\n") +
    "\n\n" +
    `const previews = { ${previewConsts.join(", ")} };\n` +
    `const templates = { ${templateModuleNames.join(", ")} };\n\n` +
    `export { sendMail, config, templates, previews };\n` +
    `const moduleManifest = { sendMail, templates, previews };\n` +
    `export default moduleManifest;\n\n`;

  await writeFile(dynManifestPath, moduleManifestContents);

  const feManifestContents =
    `import config from "../../mailing.config.json";\n` +
    `export { config };\n` +
    `const feManifest = { config };\n` +
    `export default feManifest;\n\n`;

  await writeFile(dynFeManifestPath, feManifestContents);

  debug("writing module manifest to", dynManifestPath);

  // build the module manifests
  await buildManifest("node", dynManifestPath);
  await buildManifest("browser", dynFeManifestPath);
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
  if (process.env.MM_DEV) {
    await Promise.all(
      (
        await readdir(nodeMailingPath)
      )
        .filter(
          (path) =>
            !/__test__|generator_templates|src\/commands|src\/index\.ts$|src\/dev\.js$|\.mailing$|\.next|node_modules$|\/cypress$/.test(
              path
            )
        )
        .map(async (p) =>
          copy(p, mailingPath + "/" + relative(".", p), {
            recursive: true,
            dereference: true,
            overwrite: true,
          })
        )
    );
  } else {
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
  }

  // delete .mailing/src/emails after copying because we should be using the user's
  // emailsDir, not the copied version (mostly for sanity)
  await rm(mailingPath + "/src/emails", {
    recursive: true,
    force: true,
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

async function buildManifest(
  buildType: "node" | "browser",
  manifestPath: string
) {
  const buildOutdir = ".mailing/src";

  const buildOpts: BuildOptions = {
    entryPoints: [manifestPath],
    outdir: buildOutdir,
    write: true,
    bundle: true,
    format: "esm",
    jsx: "preserve",
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  };

  if ("node" === buildType) {
    buildOpts.platform = "node";
    buildOpts.target = "node12";
  } else {
    buildOpts.platform = "browser";
    buildOpts.target = "esnext";
  }

  // build the manifest
  debug(`bundling ${buildType} manifest for ${manifestPath}...`);
  await build(buildOpts);

  // delete the original .ts file so there is no confusion loading the bundled .js files
  await remove(manifestPath);
  delete require.cache[manifestPath];
  debug(`bundled ${buildType} manifest for ${manifestPath} to ${buildOutdir}`);
}
