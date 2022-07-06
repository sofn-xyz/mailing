import React from "react";
import { resolve } from "path";
import { IncomingMessage, ServerResponse } from "http";
import { render } from "../../mjml";
import PreviewIndex from "../../PreviewIndex";
import { error, log } from "../../log";
import { getPreviewsDirectory } from "../../paths";
import { renderNotFound } from "./application";

const LIVE_RELOAD_SNIPPET = `
  window.setInterval(async function checkForReload() {
    const shouldReload = await fetch("/should_reload.json");
    const json = await shouldReload.json()
    if (json['shouldReload']) {
      window.location.reload();
    }
  }, 1200);
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
  const [_blank, _previews, moduleName, functionName] = req.url.split("/");
  const modulePath = resolve(previewsPath, moduleName);

  delete require.cache[modulePath];
  const module = require(modulePath);
  const component = module[functionName]();

  if (component?.props) {
    try {
      const { html, errors } = render(component);
      const liveReloadHtml = html?.replace(
        "</head>",
        `<script>${LIVE_RELOAD_SNIPPET}</script></head>`
      );

      res.writeHead(200);
      res.end(liveReloadHtml || JSON.stringify(errors));
    } catch (e) {
      error("caught error rendering mjml to html", e);
      res.writeHead(500);
      res.end(JSON.stringify(e));
    }
  } else {
    const emailsPath = resolve(previewsPath, "..");
    const msg = `${functionName}() from ${modulePath} must return a react component defined in ${emailsPath}`;
    error(msg);
    res.writeHead(404);
    res.end(msg);
  }
}
