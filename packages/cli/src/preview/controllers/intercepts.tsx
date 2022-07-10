import { IncomingMessage, ServerResponse } from "http";
import { log } from "../../log";
import { renderNotFound } from "./application";

const cache: {
  [id: string]: Intercept;
} = {};

export function createIntercept(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", function onData(data) {
    body += data;
    if (body.length > 1e8) req.destroy();
  });

  req.on("end", function onEnd() {
    const id = Date.now();
    cache[id] = JSON.parse(body);
    res.writeHead(201);
    res.end(JSON.stringify({ id }));
    log(`Cached intercept preview at /previews/${id}`);
  });
}

export function showIntercept(req: IncomingMessage, res: ServerResponse) {
  const parts = req.url?.split("/");
  const id = parts ? parts[parts.length - 1].split(".")[0] : "";
  const data = cache[id];

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data));
  } else {
    renderNotFound(res);
  }
}
