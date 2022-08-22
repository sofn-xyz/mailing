import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { execSync } from "child_process";
import next from "next";
import { rmSync, readFileSync } from "fs";
import {
  copy,
  mkdir,
  mkdirp,
  readdir,
  remove,
  rm,
  watch,
  writeFile,
} from "fs-extra";
import { debounce } from "lodash";
import { cwd } from "process";
import { parse } from "url";

import { getPreviewsDirectory } from "../../paths";
import { error, log, setQuiet, debug } from "../../log";
import {
  createIntercept,
  showIntercept,
} from "../../preview/controllers/intercepts";
import registerRequireHooks from "./registerRequireHooks";

const SOURCE_FILE_REGEXP = /^[^\s-]+\.[tj]sx?$/; // no spaces, .js/x or .ts/x

export type PreviewServerOptions = {
  emailsDir: string;
  port: number;
  quiet: boolean;
};

async function writeModuleManifest(emailsDir: string) {
  const mailingPath = resolve(cwd(), ".mailing/src");
  const manifestPath = resolve(mailingPath, "moduleManifest.ts");
  const previewsPath = resolve(emailsDir, "previews");
  const mailingEmailsPath = resolve(mailingPath, "emails");

  const previewCollections = (await readdir(previewsPath)).filter((path) =>
    SOURCE_FILE_REGEXP.test(path)
  );
  debug("scanning for previews at", previewsPath, previewCollections);
  const uniquePreviewCollections = Array.from(new Set(previewCollections));
  const previewImports: string[] = [];
  const previewConsts: string[] = [];
  uniquePreviewCollections.forEach((p) => {
    const moduleName = p.replaceAll(/\.[jt]sx/g, "");
    previewImports.push(
      `import * as ${moduleName}Preview from "./emails/previews/${moduleName}";`
    );
    previewConsts.push(`${moduleName}: ${moduleName}Preview`);
  });

  const templates = (await readdir("./.mailing/src/emails")).filter((path) =>
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
    `export default { templates, previews, sendMail };\n\n`;

  // Re-copy emails directory
  await remove(mailingEmailsPath);
  await mkdirp(mailingEmailsPath);
  await copy(resolve(emailsDir), mailingEmailsPath, {
    overwrite: true,
    recursive: true,
    dereference: true,
  });
  debug(`Copied ${emailsDir} to ${mailingEmailsPath}`);
  debug("Writing module manifest to", manifestPath);
  // await mkdir(mailingPath, { recursive: true });
  await writeFile(manifestPath, contents);

  delete require.cache[manifestPath];
}

function packageJsonVersionsMatch(): boolean {
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
  debug("CLI version:\t\t", cliPackageJsonVersion);

  // compare versions and return early if the same
  return cliPackageJsonVersion === mailingPackageJsonVersion;
}

async function setupNextServer() {
  const mailingPath = "./.mailing";

  // return early if .mailing exists and version matches packages.json
  if (packageJsonVersionsMatch()) {
    debug("Versions match, returning");
    return;
  }
  debug("Versions do not match, constructing .mailing");

  // copy node_modules mailing into .mailing
  const nodeMailingPath = resolve("./node_modules/mailing");

  await rm(resolve(mailingPath), { recursive: true, force: true });
  await mkdir(mailingPath, { recursive: true });
  await copy(nodeMailingPath, mailingPath, {
    recursive: true,
    dereference: true,
    overwrite: true,
  });
}

export default async function startPreviewServer(opts: PreviewServerOptions) {
  const { emailsDir, port, quiet } = opts;
  setQuiet(quiet);

  // delaying this makes the load feel faster
  const loadLag = setTimeout(() => {
    log("Starting preview server");
  }, 500);

  await setupNextServer();

  registerRequireHooks();

  const previewsPath = getPreviewsDirectory(emailsDir);
  if (!previewsPath) throw new Error("previewsPath is not defined");

  await writeModuleManifest(emailsDir);

  const hostname = "localhost";

  const app = next({
    dev: true, // true will use the app from source, not built .next bundle
    hostname,
    port,
    dir: resolve("./.mailing"),
    quiet: true,
  });
  const nextHandle = app.getRequestHandler();
  await app.prepare();

  if (!previewsPath) {
    error(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://${hostname}:${port}`;
  let currentUrl = `${host}/`;
  let shouldReload = false;

  const server = http
    .createServer(async function (req, res) {
      const startTime = Date.now();
      let noLog = false;

      if (!req.url) {
        res.end(404);
        return;
      }

      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Never cache anything
      res.setHeader(
        "Cache-Control",
        "no-cache, max-age=0, must-revalidate, no-store"
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "-1");

      const emailsPath = resolve(previewsPath, "..");
      for (const path in require.cache) {
        if (path.startsWith(emailsPath)) {
          delete require.cache[path];
        }
      }

      currentUrl = `${host}${req.url}`;
      function showShouldReload(
        _req: http.IncomingMessage,
        res: http.ServerResponse
      ): void {
        res.writeHead(200);
        res.end(JSON.stringify({ shouldReload }));
        shouldReload = false;
      }

      res.once("close", () => {
        if (!noLog || process.env.MM_VERBOSE)
          log(`${res.statusCode} ${req.url} ${Date.now() - startTime}ms`);
      });

      try {
        if (req.url === "/should_reload.json") {
          noLog = true;
          showShouldReload(req, res);
        } else if (req.url === "/intercepts" && req.method === "POST") {
          createIntercept(req, res);
        } else if (/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) {
          showIntercept(req, res);
        } else if (/^\/_+next/.test(req.url)) {
          noLog = true;
          await app.render(req, res, `${pathname}`, query);
        } else {
          // static assets in public directory
          await nextHandle(req, res, parsedUrl);
        }
      } catch (e) {
        error("caught error", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
        return;
      }
    })
    .listen(port, async () => {
      clearTimeout(loadLag);
      log(`Running preview at ${currentUrl}`);
      if (!quiet) await open(currentUrl);
    })
    .on("error", function onServerError(e: NodeJS.ErrnoException) {
      if (e.code === "EADDRINUSE") {
        error(`Port ${port} is taken, is mailing already running?`);
        process.exit(1);
      } else {
        error("Preview server error:", JSON.stringify(e));
      }
    });

  try {
    // simple live reload implementation
    const changeWatchPath = emailsDir;
    if (!changeWatchPath) {
      log("Error finding emails dir in . or ./src");
      return;
    }

    const reload = debounce(async () => {
      debug("Reload from change");
      await writeModuleManifest(emailsDir);
      shouldReload = true;
    }, 200);

    watch(changeWatchPath, { recursive: true }, (eventType, filename) => {
      log(`Detected ${eventType} on ${filename}, reloading`);
      delete require.cache[resolve(changeWatchPath, filename)];
      reload();
    });
    log(`Watching for changes to ${relative(cwd(), changeWatchPath)}`);
  } catch (e) {
    error(`Error starting change watcher`, e);
  }

  return server;
}
