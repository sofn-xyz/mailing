import http from "http";
import { resolve } from "path";
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
import { renderNotFound } from "../preview/controllers/application";

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
      if (!req.url) {
        res.end(404);
        return;
      }

      // Never cache anything so that we know the current url from the request.
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

      try {
        if (req.url === "/") {
          return showPreviewIndex(req, res);
        } else if (req.url === "/favicon.ico") {
          return renderNotFound(res);
        } else if (req.url === "/should_reload.json") {
          return showShouldReload(req, res);
        } else if (req.url === "/intercepts" && req.method === "POST") {
          return createIntercept(req, res);
        } else if (/^\/intercepts\//.test(req.url)) {
          return showIntercept(req, res);
        } else {
          return showPreview(req, res);
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
  log(`Watching for changes to ${changeWatchPath}`);
};
