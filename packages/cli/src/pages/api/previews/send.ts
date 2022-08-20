import type { NextApiRequest, NextApiResponse } from "next";
import { ReactElement } from "react";
import { pickBy, identity } from "lodash";
import { error } from "../../../log";
import { sendMail, previews } from "../../../moduleManifest";
import { ComponentMail } from "mailing-core";

export default async function showPreviewsIndex(
  req: NextApiRequest,
  res: NextApiResponse<SendPreviewResponseBody>
) {
  if (req.method !== "POST" || !req.body) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const body: SendPreviewRequestBody = req.body;

  // Caller can provide html or preview references, html takes precedence.
  const { html, to, subject, previewClass, previewFunction } = body;
  let component;
  if (!html && previewClass && previewFunction) {
    const previewModule: {
      [key: string]: () => ReactElement;
    } = previews[previewClass as keyof typeof previews];
    component = previewModule[previewFunction]();
  }

  if (!html && !component) {
    error("no html provided, no component found");
    res.writeHead(400);
    res.end(JSON.stringify({ error: "no html provided, no component found" }));
    return;
  }

  await sendMail({
    html,
    component,
    to,
    forceDeliver: true,
    subject,
  });

  res.json({});
}
