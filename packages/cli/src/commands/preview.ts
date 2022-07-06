import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { watch } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { getPreviewsDirectory, getExistingEmailsDir } from "../paths";
import { debug, error, log } from "../log";
import {
  createIntercept,
  showIntercept,
} from "../preview/controllers/intercepts";
import { showPreview, showPreviewIndex } from "../preview/controllers/previews";
import {
  renderNotFound,
  showStaticAsset,
} from "../preview/controllers/application";
import { start } from "repl";
import { cwd } from "process";

const DEFAULT_PORT = 3883;

export const command = "preview";

export const describe = "start the email preview server";

export const builder = {
  port: {
    default: DEFAULT_PORT,
  },
};

export const handler = async (argv: ArgumentsCamelCase<{ port?: number }>) => {
  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  log("Starting preview server 🤠");

  require("ts-node").register({
    compilerOptions: {
      module: "commonjs",
      jsx: "react",
      moduleResolution: "node",
      skipLibCheck: true,
    },
  });

  const port = argv?.port || DEFAULT_PORT;

  const previewsPath = getPreviewsDirectory();
  if (!previewsPath) {
    log(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://localhost:${port}`;
  let currentUrl = `${host}/`;
  let shouldReload = false;

  http
    .createServer(function (req, res) {
      const startTime = Date.now();
      let noLog = false;

      if (!req.url) {
        res.end(404);
        return;
      }

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
        if (!noLog) log(`${req.url} ${Date.now() - startTime}ms`);
      });

      try {
        if (req.url === "/") {
          showPreviewIndex(req, res);
        } else if (req.url === "/should_reload.json") {
          noLog = true;
          showShouldReload(req, res);
        } else if (req.url === "/intercepts" && req.method === "POST") {
          createIntercept(req, res);
        } else if (/^\/intercepts\//.test(req.url)) {
          showIntercept(req, res);
        } else if (/^\/previews\/.*/.test(req.url)) {
          showPreview(req, res);
        } else {
          showStaticAsset(req, res);
        }
      } catch (e) {
        error("caught error", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
        return;
      }
    })
    .listen(port);
  await open(currentUrl);

  log(`Running preview at ${currentUrl}`);

  // simple live reload implementation
  const changeWatchPath = getExistingEmailsDir();
  if (!changeWatchPath) {
    log("Error finding emails dir in . or ./src");
    return;
  }
  watch(changeWatchPath, { recursive: true }, (eventType, filename) => {
    log(`Detected ${eventType} on ${filename}, reloading`);
    delete require.cache[resolve(changeWatchPath, filename)];
    shouldReload = true;
  });
  log(`Watching for changes to ${relative(cwd(), changeWatchPath)}`);
};
