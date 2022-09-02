import { IncomingMessage, ServerResponse } from "http";

export const LONG_POLLING_INTERVAL = 10000;
export const SHORT_POLLING_INTERVAL = 10;

let shouldReload = false;

export function setShouldReload(v: boolean) {
  shouldReload = v;
}

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
