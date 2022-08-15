import http from "http";
import { relative, resolve } from "path";
import open from "open";
import { watch } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { getPreviewsDirectory } from "../paths";
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
import { cwd, exit } from "process";
import { parse } from "url";
import next from "next";
import registerRequireHooks from "./util/registerRequireHooks";
import { DEFAULTS } from "../config";

export type PreviewArgs = ArgumentsCamelCase<{
  port: number;
  quiet: boolean;
}>;

export const command = "preview";

export const describe = "start the email preview server";

export const builder = {
  port: {
    default: DEFAULTS.port,
    description: "what port to start the preview server on",
  },
  quiet: {
    default: DEFAULTS.quiet,
    descriptioin: "quiet mode (don't open browser after starting)",
    boolean: true,
  },
  "emails-dir": {
    default: DEFAULTS.emailsDir,
    description: "the directory of your email templates",
  },
};

export const handler = async (argv: PreviewArgs) => {
  const port = argv.port;

  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  registerRequireHooks();

  const dev = !!process.env.MM_DEV;
  const hostname = "localhost";

  const app = next({
    dev,
    hostname,
    port,
    dir: dev ? resolve(__dirname, "../..") : __dirname,
  });
  const nextHandle = app.getRequestHandler();
  await app.prepare();

  // @ts-ignore
  const previewsPath = getPreviewsDirectory(argv.emailsDir);
  if (!previewsPath) {
    error(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://${hostname}:${port}`;
  let currentUrl = `${host}/`;
  let shouldReload = false;

  http
    .createServer(async function(req, res) {
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

      const config = {
        emailsDir: argv.emailsDir,
      };

      try {
        if (req.url === "/previews.json") {
          showPreviewIndex(req, res, config);
        } else if (req.url === "/should_reload.json") {
          noLog = true;
          showShouldReload(req, res);
        } else if (req.url === "/intercepts" && req.method === "POST") {
          createIntercept(req, res);
        } else if (req.url === "/previews/send.json" && req.method === "POST") {
          await sendPreview(req, res, config);
        } else if (/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) {
          showIntercept(req, res);
        } else if (/^\/previews\/.*\.json/.test(req.url)) {
          showPreview(req, res, config);
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
      if (!argv.quiet) await open(currentUrl);
    })
    .on("error", function onServerError(e: NodeJS.ErrnoException) {
      if (e.code === "EADDRINUSE") {
        error(`Port ${port} is taken, is mailing already running?`);
        process.exit(1);
      } else {
        error("Preview server error:", JSON.stringify(e));
      }
    });

  // simple live reload implementation
  const changeWatchPath = argv.emailsDir;
  if (!changeWatchPath) {
    log("Error finding emails dir in . or ./src");
    return;
  }

  // @ts-ignore
  watch(changeWatchPath, { recursive: true }, (eventType, filename) => {
    log(`Detected ${eventType} on ${filename}, reloading`);
    // @ts-ignore
    delete require.cache[resolve(changeWatchPath, filename)];
    shouldReload = true;
  });
  // @ts-ignore
  log(`Watching for changes to ${relative(cwd(), changeWatchPath)}`);
};
