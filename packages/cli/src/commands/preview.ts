import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { watch } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { getPreviewsDirectory, getExistingEmailsDir } from "../paths";
import { error, log } from "../log";
import {
  createIntercept,
  showIntercept,
} from "../preview/controllers/intercepts";
import {
  sendPreview,
  showPreview,
  showPreviewIndex,
} from "../preview/controllers/previews";
import { cwd } from "process";
import { parse } from "url";
import next from "next";

type Args = ArgumentsCamelCase<{ port?: number }>;

const DEFAULT_PORT = 3883;

export const command = "preview";

export const describe = "start the email preview server";

export const builder = {
  port: {
    default: DEFAULT_PORT,
  },
};

const bootServer = async (argv: Args) => {
  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  if (!process.env.MM_DEV) require("../registerRequireHooks").module();

  const port = argv?.port || DEFAULT_PORT;

  const dev = !!process.env.MM_DEV;
  const hostname = "localhost";
  log("hi");

  const app = next({
    dev,
    hostname,
    port,
    dir: dev ? resolve(__dirname, "..") : __dirname,
  });
  const nextHandle = app.getRequestHandler();
  await app.prepare();

  log("hello");
  const previewsPath = getPreviewsDirectory();
  if (!previewsPath) {
    error(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://${hostname}:${port}`;
  let currentUrl = `${host}/`;
  let shouldReload = false;

  try {
    http
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
            showPreviewIndex(req, res);
          } else if (req.url === "/should_reload.json") {
            noLog = true;
            showShouldReload(req, res);
          } else if (req.url === "/intercepts" && req.method === "POST") {
            createIntercept(req, res);
          } else if (
            req.url === "/previews/send.json" &&
            req.method === "POST"
          ) {
            await sendPreview(req, res);
          } else if (/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) {
            showIntercept(req, res);
          } else if (/^\/previews\/.*\.json/.test(req.url)) {
            showPreview(req, res);
          } else if (/^\/_next/.test(req.url)) {
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
        await open(currentUrl);
      });
  } catch (e) {
    log(JSON.stringify(e));
    error("OH HI");
  }

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

export const handler = async (argv: Args) => {
  try {
    await bootServer(argv);
  } catch (e) {
    error(e);
  }
};
