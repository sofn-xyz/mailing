import type { NextApiRequest, NextApiResponse } from "next";
import { error } from "../../../util/log";
import { sendMail } from "../../../moduleManifest";
import { getPreviewComponent } from "../../../util/moduleManifestUtil";

export default async function send(
  req: NextApiRequest,
  res: NextApiResponse<SendPreviewResponseBody>
) {
  if (req.method !== "POST" || !req.body) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const body: SendPreviewRequestBody = req.body;

  const { to, subject, previewClass, previewFunction } = body;
  let component;
  if (previewClass && previewFunction) {
    component = getPreviewComponent(previewClass, previewFunction);
  }

  if (!component) {
    error("no component found");
    res.writeHead(400);
    res.end(JSON.stringify({ error: "no html provided, no component found" }));
    return;
  }

  await sendMail({
    component,
    to,
    dangerouslyForceDeliver: true,
    subject,
  });

  res.json({});
}
