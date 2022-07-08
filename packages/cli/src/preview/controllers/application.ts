import { readFileSync } from "fs-extra";
import { ServerResponse, IncomingMessage } from "http";
import { resolve } from "path";
import { error } from "../../log";

export function renderNotFound(res: ServerResponse) {
  res.writeHead(404);
  res.end("Not found");
}
