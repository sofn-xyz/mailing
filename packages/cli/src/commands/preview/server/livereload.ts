import { IncomingMessage, ServerResponse } from "http";
import { debounce } from "lodash";
import { cwd } from "process";
import { relative, resolve } from "path";
import { watch } from "chokidar";

import { error, log, debug } from "../../../util/log";
import { linkEmailsDirectory } from "./setup";
import {
  LONG_POLLING_INTERVAL,
  SHORT_POLLING_INTERVAL,
} from "../../util/livereloadUtil";
import { URL } from "url";

export const WATCH_IGNORE = /^\.|node_modules/;

let vectorClock = Date.now();

function renderClock(res: ServerResponse) {
  debug("livereload render clock", vectorClock);
  res.writeHead(200);
  res.end(JSON.stringify({ vectorClock }));
}

function requireParam(
  param: string,
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    return JSON.parse(url.searchParams.get(param)!);
  } catch (e) {
    const err = `error parsing ${param} from url`;
    error(err, e);
    res.writeHead(403);
    res.end(JSON.stringify({ err }));
    return null;
  }
}

export function pollShouldReload(
  req: IncomingMessage,
  res: ServerResponse
): void {
  res.setHeader("Content-Type", "application/json");

  const clientVectorClock: number = requireParam("vectorClock", req, res);
  if (403 === res.statusCode) return;

  const poller = setInterval(() => {
    if (clientVectorClock >= vectorClock) return;
    clearInterval(poller);
    clearTimeout(timeout);
    renderClock(res);
  }, SHORT_POLLING_INTERVAL);
  const timeout = setTimeout(() => {
    // timed out long poll, close connection
    clearInterval(poller);
    renderClock(res);
  }, LONG_POLLING_INTERVAL);
}

export function startChangeWatcher(emailsDir: string) {
  try {
    // simple live reload implementation
    const changeWatchPath = emailsDir;
    if (!changeWatchPath) {
      log("error finding emails dir in . or ./src");
      return;
    }

    const reload = debounce(
      async () => {
        debug("reload from change");
        await linkEmailsDirectory(emailsDir);
        vectorClock++;
      },
      100,
      { leading: true }
    );

    watch(changeWatchPath, { ignoreInitial: true }).on(
      "all",
      (eventType, filename) => {
        if (WATCH_IGNORE.test(filename)) return;
        log(`detected ${eventType} on ${filename}, reloading`);
        delete require.cache[resolve(changeWatchPath, filename)];
        reload();
      }
    );
    log(`watching for changes to ${relative(cwd(), changeWatchPath)}`);
  } catch (e) {
    error(`error starting livereload change watcher`, e);
  }
}
