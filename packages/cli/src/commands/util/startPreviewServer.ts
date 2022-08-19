import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { rmSync, symlinkSync, readFileSync } from "fs";
import { mkdir, readdir, symlink, watch, writeFile } from "fs-extra";
import { getPreviewsDirectory } from "../../paths";
import { error, log, setQuiet, debug } from "../../log";
import { debounce } from "lodash";
import {
  createIntercept,
  showIntercept,
} from "../../preview/controllers/intercepts";
import { cwd } from "process";
import { parse } from "url";
import next from "next";
import registerRequireHooks from "./registerRequireHooks";
import { execSync } from "child_process";

export type PreviewServerOptions = {
  emailsDir: string;
  port: number;
  quiet: boolean;
};

async function writeModuleManifest(emailsDir: string, previewsPath: string) {
  const mailingPath = resolve(process.cwd(), ".mailing/src");
  const manifestPath = resolve(mailingPath, "moduleManifest.ts");

  const previewCollections = (await readdir(previewsPath)).filter(
    (path) => !/^\./.test(path)
  );
  const uniquePreviewCollections = Array.from(new Set(previewCollections));
  const previewImports: string[] = [];
  const previewConsts: string[] = [];
  uniquePreviewCollections.forEach((p) => {
    const moduleName = p.replaceAll(/\.[jt]sx/g, "");
    const path = relative(manifestPath, emailsDir + "/previews/" + moduleName);
    previewImports.push(`import * as ${moduleName}Preview from "${path}";`);
    previewConsts.push(`${moduleName}: ${moduleName}Preview`);
  });

  const templates = (await readdir(emailsDir)).filter(
    (path) => !/^\./.test(path) && /\.[jt]sx?$/.test(path)
  );
  const uniqueTemplates = Array.from(new Set(templates));
  const templateImports: string[] = [];
  const templateModuleNames: string[] = [];
  let indexFound = false;
  uniqueTemplates.forEach((p) => {
    if (/^index\.[jt]sx?$/.test(p)) {
      // index.ts, index.js
      indexFound = true;
      return;
    }

    const moduleName = p.replaceAll(/\.[jt]sx/g, "");
    templateModuleNames.push(moduleName);
    const path = relative(manifestPath, emailsDir + "/" + moduleName);
    templateImports.push(`import ${moduleName} from "${path}";`);
  });

  if (!indexFound)
    throw new Error("index.ts or index.js not found in emails directory");

  const contents =
    `import sendMail from "${relative(manifestPath, emailsDir)}";\n` +
    templateImports.join("\n") +
    "\n" +
    previewImports.join("\n") +
    "\n\n" +
    `const previews = { ${previewConsts.join(", ")} }\n` +
    `const templates = { ${templateModuleNames.join(", ")} }\n\n` +
    `export { templates, previews, sendMail };\n` +
    `export default { templates, previews, sendMail };\n\n`;

  debug("Writing module manifest to", manifestPath);
  await mkdir(mailingPath, { recursive: true });
  await writeFile(manifestPath, contents);

  delete require.cache[manifestPath];
}

function packageJsonVersionsMatch(): boolean {
  const mailingPackageJsonPath = ".mailing/package.json";
  const cliPackageJsonPath = "./packages/cli/package.json";

  let mailingPackageJsonVersion: string, cliPackageJsonVersion: string;

  // read .mailing package.json
  try {
    const mailingPackageJson = readFileSync(mailingPackageJsonPath);
    mailingPackageJsonVersion = JSON.parse(
      mailingPackageJson.toString()
    ).version;
  } catch (err: any) {
    if ("ENOENT" === err?.code) {
      // .mailing package.json doesn't exist
      return false;
    } else {
      throw err;
    }
  }

  // read cli package.json
  try {
    const cliPackageJson = readFileSync(cliPackageJsonPath);
    cliPackageJsonVersion = JSON.parse(cliPackageJson.toString()).version;
  } catch (err: any) {
    if ("ENOENT" === err?.code) {
      // cli package.json doesn't exist
      return false;
    } else {
      throw err;
    }
  }

  // compare versions and return early if the same
  return cliPackageJsonVersion === mailingPackageJsonVersion;
}

async function setupNextServer(emailsDir: string) {
  const mailingPath = ".mailing";

  // return early if .mailing exists and version matches packages.json
  if (packageJsonVersionsMatch()) return;

  // copy node_modules mailing into .mailing
  const nodeMailingPath = resolve(process.cwd(), "node_modules/mailing");

  rmSync(resolve(mailingPath), { recursive: true, force: true });

  if (process.env.MM_DEV) {
    await symlink("packages/cli/", ".mailing");
    return;
  }

  await mkdir(mailingPath, { recursive: true });
  // cpSync(nodeMailingPath + "/*", mailingPath, { recursive: true }, () => false);
  execSync(`cp -R ${nodeMailingPath + "/*"} ${mailingPath}`);

  // emails dir: delete boilerplate and symlink
  execSync(`rm -rf ${mailingPath + "/src/emails"}`);
  symlinkSync(resolve(emailsDir), resolve(mailingPath + "/src/emails"));

  // run npm commands
  execSync(`cd ${mailingPath} && npm add react react-dom && npm i`);
}

export default async function startPreviewServer(opts: PreviewServerOptions) {
  const { emailsDir, port, quiet } = opts;
  setQuiet(quiet);

  await setupNextServer(emailsDir);

  registerRequireHooks();

  const previewsPath = getPreviewsDirectory(emailsDir);
  if (!previewsPath) throw new Error("previewsPath is not defined");

  await writeModuleManifest(emailsDir, previewsPath);

  const dev = !!process.env.MM_DEV;
  const hostname = "localhost";

  const app = next({
    dev,
    hostname,
    port,
    dir: dev ? resolve(__dirname, "../../..") : __dirname,
    quiet,
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
      await writeModuleManifest(emailsDir, previewsPath);
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
