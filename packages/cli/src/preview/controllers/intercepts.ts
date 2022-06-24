import { IncomingMessage, ServerResponse } from "http";
import { log } from "../../log";
import { renderNotFound } from "./application";

const cache: { [id: string]: { html: string } } = {};

export function createIntercept(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", function onData(data) {
    body += data;
    if (body.length > 1e8) req.destroy();
  });

  req.on("end", function onEnd() {
    const { html } = JSON.parse(body);
    const id = Date.now();
    cache[id] = { html };
    res.writeHead(201);
    res.end(JSON.stringify({ id }));
    log(`Cached intercept preview at /previews/${id}`);
  });
}

export function showIntercept(req: IncomingMessage, res: ServerResponse) {
  const parts = req.url?.split("/");
  const id = parts ? parts[parts.length - 1] : "";
  const data = cache[id];

  if (data) {
    res.writeHead(200);
    res.end(data.html);
  } else {
    renderNotFound(res);
  }
}
