import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { mkdir, readdir, watch, writeFile } from "fs-extra";
import { rmSync, existsSync, symlinkSync, readFileSync } from "fs";
import { getPreviewsDirectory, readPackageJSON } from "../../paths";
import { error, log, setQuiet } from "../../log";
import {
  createIntercept,
  showIntercept,
} from "../../preview/controllers/intercepts";
import {
  sendPreview,
  showPreview,
  showPreviewIndex,
} from "../../preview/controllers/previews";
import { cwd, exit } from "process";
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
  const previewCollections = (await readdir(previewsPath)).filter(
    (path) => !/^\./.test(path)
  );
  const uniquePreviewCollections = Array.from(new Set(previewCollections));
  let exportedModuleNames: string[] = [];
  const previews: string[] = uniquePreviewCollections.map((p) => {
    const moduleName = p.replaceAll(/\.[jt]sx/g, "");
    exportedModuleNames.push(moduleName);
    const path = emailsDir + "/" + moduleName;
    return `import * as ${moduleName} from "${path}";`;
  });

  const contents =
    previews.join("\n") +
    "\n\n" +
    `export default { ${exportedModuleNames.join(", ")} };` +
    "\n\n";

  const mailingPath = resolve(process.cwd(), ".mailing");
  const manifestPath = resolve(mailingPath, "moduleManifest.ts");

  await mkdir(mailingPath, { recursive: true });
  await writeFile(manifestPath, contents);

  delete require.cache[manifestPath];
}

async function setupNextServer(emailsDir: string) {
  const mailingPath = ".mailing";
  const mailingPackageJson = mailingPath + "/package.json";

  // return early if .mailing exists and version matches packages.json
  if (existsSync(mailingPackageJson)) {
    // read it
    const mailingPackageJsonVersion = JSON.parse(
      readFileSync(mailingPackageJson).toString()
    ).version;

    // read cli package.json
    const cliPackageJson = "./packages/cli/package.json";
    const cliPackageJsonVersion = JSON.parse(
      readFileSync(cliPackageJson).toString()
    ).version;

    // compare versions and return early if the same
    if (cliPackageJsonVersion === mailingPackageJsonVersion) {
      console.log("early return");
      return;
    }
  }

  // copy node_modules mailing into .mailing
  const nodeMailingPath = resolve(process.cwd(), "node_modules/mailing");

  rmSync(resolve(mailingPath), { recursive: true, force: true });
  await mkdir(mailingPath, { recursive: true });
  // cpSync(nodeMailingPath + "/*", mailingPath, { recursive: true }, () => false);
  execSync(`cp -R ${nodeMailingPath + "/*"} ${mailingPath}`);

  // emails dir: delete boilerplate and symlink
  execSync(`rm -rf ${mailingPath + "/emails"}`);
  symlinkSync(
    resolve(emailsDir),
    resolve(mailingPath + "/emails"),
    () => false
  );

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
        if (req.url === "/previews.json") {
          // TODO: move this to next app
          showPreviewIndex(req, res);
        } else if (req.url === "/should_reload.json") {
          noLog = true;
          showShouldReload(req, res);
        } else if (req.url === "/intercepts" && req.method === "POST") {
          createIntercept(req, res);
        } else if (req.url === "/previews/send.json" && req.method === "POST") {
          await sendPreview(req, res);
        } else if (/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) {
          showIntercept(req, res);
        } else if (/^\/previews\/.*\.json/.test(req.url)) {
          // TODO: move this to next app
          showPreview(req, res);
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

  if (process.env.NODE_ENV === "production") return server;

  try {
    // simple live reload implementation
    const changeWatchPath = emailsDir;
    if (!changeWatchPath) {
      log("Error finding emails dir in . or ./src");
      return;
    }

    watch(changeWatchPath, { recursive: true }, async (eventType, filename) => {
      log(`Detected ${eventType} on ${filename}, reloading`);
      await writeModuleManifest(previewsPath);
      delete require.cache[resolve(changeWatchPath, filename)];
      shouldReload = true;
    });
    log(`Watching for changes to ${relative(cwd(), changeWatchPath)}`);
  } catch (e) {
    error(`Error starting change watcher`, e);
  }

  return server;
}
