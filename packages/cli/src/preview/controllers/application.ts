import { ServerResponse } from "http";

export function renderNotFound(res: ServerResponse) {
  res.write(404);
  res.end("Not found");
}
