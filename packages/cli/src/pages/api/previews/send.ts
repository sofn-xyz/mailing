import type { NextApiRequest, NextApiResponse } from "next";
import { error } from "../../../util/serverLogger";
import { sendMail } from "../../../moduleManifest";
import {
  getPreviewComponent,
  getTemplateModule,
} from "../../../util/moduleManifestUtil";
import { jsonStringifyError } from "../../../util/jsonStringifyError";

export default async function send(
  req: NextApiRequest,
  res: NextApiResponse<SendPreviewResponseBody>
) {
  if (req.method !== "POST" || !req.body) {
    res.writeHead(405).end();
    return;
  }

  const body: SendPreviewRequestBody = req.body;
  const { to, previewClass, previewFunction } = body;
  let subject = `${previewClass} - ${previewFunction}`;

  const component = await getPreviewComponent(previewClass, previewFunction);
  if (!component) {
    error("no component found");
    res.status(400).json({ error: "no html provided, no component found" });
    return;
  }

  const template = getTemplateModule(previewClass);
  if (template) {
    if (typeof template.subject === "function") {
      subject = template.subject(component.props);
    } else if (typeof template.subject === "string") {
      subject = template.subject;
    }
  }

  try {
    await sendMail({
      component,
      to,
      dangerouslyForceDeliver: true,
      subject,
    });
    res.json({});
  } catch (e: any) {
    error("error sending mail", e);

    res
      .status(500)
      .json({ error: "sendMail threw an error: " + jsonStringifyError(e) });
  }
}
