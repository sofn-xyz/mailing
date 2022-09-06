import http from "http";
import { resolve } from "path";
import open from "open";
import next from "next";
import { pathExists } from "fs-extra";
import { parse } from "url";
import { shutdown as shutdownAnalytics } from "../../../util/postHog";

import { getPreviewsDirectory } from "../../../util/paths";
import { error, log, debug } from "../../../util/log";
import {
  createIntercept,
  showIntercept,
} from "../../../preview/controllers/intercepts";
import registerRequireHooks from "../../util/registerRequireHooks";
import { bootstrapMailingDir, linkEmailsDirectory } from "./setup";
import { getConfig } from "../../../util/config";
import { pollShouldReload, startChangeWatcher } from "./livereload";

export default async function startPreviewServer() {
  const { emailsDir, port, quiet } = getConfig();

  const emailsDirExists = await pathExists(emailsDir);

  if (!emailsDirExists)
    throw new Error(`emailsDir does not exist in ${resolve(emailsDir)}`);

  const previewsPath = getPreviewsDirectory(emailsDir);
  if (!previewsPath)
    throw new Error(
      `previews directory does not exist in ${resolve(emailsDir)}`
    );

  // delaying this makes the load feel faster
  const loadLag = setTimeout(() => {
    log("starting preview server");
  }, 500);

  registerRequireHooks();

  await bootstrapMailingDir();
  await linkEmailsDirectory(emailsDir);

  const hostname = "localhost";

  const app = next({
    dev: true, // true will use the app from source, not built .next bundle
    hostname,
    port,
    dir: resolve("./.mailing"),
  });
  const nextHandle = app.getRequestHandler();
  await app.prepare();

  debug("prepared next server");

  if (!previewsPath) {
    error(
      "could not find emails directory\nhave you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://${hostname}:${port}`;
  let currentUrl = `${host}/`;

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

      res.once("close", () => {
        if (!noLog || process.env.MM_VERBOSE)
          log(`${res.statusCode} ${req.url} ${Date.now() - startTime}ms`);
      });

      try {
        if (/^\/should_reload\.json/.test(req.url)) {
          noLog = true;
          pollShouldReload(req, res);
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
      log(`running preview at ${currentUrl}`);
      if (!quiet) await open(currentUrl);
    })
    .on("error", async function onServerError(e: NodeJS.ErrnoException) {
      if (e.code === "EADDRINUSE") {
        error(`port ${port} is taken, is mailing already running?`);
        await shutdownAnalytics();
        process.exit(1);
      } else {
        error("preview server error:", JSON.stringify(e));
      }
    });

  startChangeWatcher(emailsDir);

  return server;
}
