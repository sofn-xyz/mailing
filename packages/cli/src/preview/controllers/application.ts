import { readFileSync } from "fs-extra";
import { ServerResponse, IncomingMessage } from "http";
import { resolve } from "path";
import { error } from "../../log";

export function renderNotFound(res: ServerResponse) {
  res.writeHead(404);
  res.end("Not found");
}

export function showStaticAsset(req: IncomingMessage, res: ServerResponse) {
  const urlParts = req.url?.split("/");
  if (urlParts?.length !== 2 || req.method !== "GET")
    return renderNotFound(res);
  const asset = urlParts[1];

  try {
    const file = readFileSync(resolve(__dirname, "./static/", asset));
    res.writeHead(200);
    res.end(file);
  } catch (e) {
    error(e);
    renderNotFound(res);
  }
}
