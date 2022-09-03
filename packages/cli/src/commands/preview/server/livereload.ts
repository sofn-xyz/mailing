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

export const WATCH_IGNORE = /^\.|node_modules/;

let shouldReload = false;

export function pollShouldReload(
  _req: IncomingMessage,
  res: ServerResponse
): void {
  const render = () => {
    res.writeHead(200);
    res.end(JSON.stringify({ shouldReload }));
  };
  const poller = setInterval(() => {
    if (!shouldReload) return;
    clearInterval(poller);
    clearTimeout(timeout);
    res.writeHead(200);
    res.end(JSON.stringify({ shouldReload }));
    shouldReload = false;
  }, SHORT_POLLING_INTERVAL);
  const timeout = setTimeout(() => {
    clearInterval(poller);
    render();
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
        shouldReload = true;
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
    error(`error starting change watcher`, e);
  }
}
