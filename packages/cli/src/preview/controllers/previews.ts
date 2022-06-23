import React from "react";
import { resolve } from "path";
import { IncomingMessage, ServerResponse } from "http";
// import { renderToPipeableStream } from "react-dom/server";
import { render } from "../../mjml";
import PreviewIndex from "../../PreviewIndex";
import { log } from "../../log";
import { getPreviewsDirectory } from "../../paths";
import { renderNotFound } from "./application";

const LIVE_RELOAD_SNIPPET = `
  window.setInterval(async function checkForReload() {
    const shouldReload = await fetch("/should_reload.json");
    console.log(shouldReload)
  }, 1000);
`;

export function showPreviewIndex(req: IncomingMessage, res: ServerResponse) {
  const component = React.createElement(PreviewIndex);

  try {
    const { html, errors } = render(component);
    const liveReloadHtml = html?.replace(
      "</head>",
      `<script>${LIVE_RELOAD_SNIPPET}</script></head>`
    );

    res.writeHead(200);
    res.end(liveReloadHtml || JSON.stringify(errors));
  } catch (e) {
    log("caught error rendering mjml to html", e);
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
}

export function showPreview(req: IncomingMessage, res: ServerResponse) {
  const previewsPath = getPreviewsDirectory();

  if (!req.url || !previewsPath) {
    return renderNotFound(res);
  }

  // previews
  const [_blank, moduleName, functionName] = req.url.split("/");
  const modulePath = resolve(previewsPath, moduleName);
  delete require.cache[modulePath];
  const module = require(modulePath);
  const component = module[functionName]();

  try {
    const { html, errors } = render(component);
    const liveReloadHtml = html?.replace(
      "</head>",
      `<script>${LIVE_RELOAD_SNIPPET}</script></head>`
    );

    res.writeHead(200);
    res.end(liveReloadHtml || JSON.stringify(errors));
  } catch (e) {
    log("caught error rendering mjml to html", e);
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
}
