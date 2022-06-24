import { ServerResponse } from "http";

export function renderNotFound(res: ServerResponse) {
  res.writeHead(404);
  res.end("Not found");
}
