import { IncomingMessage, ServerResponse } from "http";
import React from "react";
import { error, log } from "../../log";
import { render } from "../../mjml";
import Preview from "../../Preview";
import { renderMailPreview } from "../../renderMailPreview";
import { renderNotFound } from "./application";

const cache: {
  [id: string]: { html: string; to?: string; from?: string; subject?: string };
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
  const id = parts ? parts[parts.length - 1] : "";
  const data = cache[id];

  if (data) {
    const preview = <Preview {...data} />;
    const { html, errors } = render(preview);

    if (errors?.length) {
      error(errors);
      res.writeHead(500);
      res.end(errors);
    } else {
      res.writeHead(200);
      res.end(html);
    }
  } else {
    renderNotFound(res);
  }
}
