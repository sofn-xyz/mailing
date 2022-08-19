import { resolve } from "path";
import { IncomingMessage, ServerResponse } from "http";
import { error } from "../../log";
import { getPreviewsDirectory } from "../../paths";
import { renderNotFound } from "./application";
import { getConfig } from "../../config";

export async function sendPreview(req: IncomingMessage, res: ServerResponse) {
  const config = getConfig();
  const previewsPath = getPreviewsDirectory(config.emailsDir);

  if (!previewsPath) {
    error("Previews path not found");
    return renderNotFound(res);
  }

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  const body: SendPreviewRequestBody = JSON.parse(data);

  // Caller can provide html or preview references, html takes precedence.
  const { html, to, subject } = body;
  let component;
  if (!html && body.previewClass && body.previewFunction) {
    const modulePath = resolve(previewsPath, body.previewClass);
    delete require.cache[modulePath]; // clean require
    const module = require(modulePath);
    component = module[body.previewFunction]();
  }

  if (!html && !component) {
    error("no html provided, no component found");
    res.writeHead(400);
    res.end(JSON.stringify({ error: "no html provided, no component found" }));
    return;
  }

  const sendMail = require(resolve(previewsPath, ".."));
  if (!sendMail?.default) {
    error(`sendMail not exported from ${resolve(previewsPath, "..")}`);
  }

  await sendMail.default({
    html,
    component,
    to,
    forceDeliver: true,
    subject,
  });

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end("{}");
}
