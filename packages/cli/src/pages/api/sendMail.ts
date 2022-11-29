import type { NextApiRequest, NextApiResponse } from "next";
import { MjmlError } from "mjml-react";
import { sendMail } from "../../moduleManifest";
import renderTemplate from "../../util/renderTemplate";
import { validateApiKey } from "../../util/validateApiKey";

type Data = {
  error?: string; // api error messages
  mjmlErrors?: MjmlError[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  if (!(await validateApiKey(req, res))) return;

  const { templateName, previewName, props, ...mailOptions } = req.body;

  let html = req.body.html;

  // validate at least one of to, cc, bcc exists
  if (
    typeof mailOptions.to === "undefined" &&
    typeof mailOptions.cc === "undefined" &&
    typeof mailOptions.bcc === "undefined"
  ) {
    return res.status(422).json({ error: "to, cc, or bcc must be specified" });
  }

  if (!html) {
    // validate template name
    if (typeof templateName !== "string") {
      return res
        .status(422)
        .json({ error: "templateName or html must be specified" });
    }

    // render template if html doesn't exist
    const {
      error,
      mjmlErrors,
      html: renderedHtml,
    } = renderTemplate(templateName.replace(/\.[jt]sx?$/, ""), props);

    if (error) {
      return res.status(422).json({ error, mjmlErrors });
    }
    html = renderedHtml;
  }

  const sendMailResult = await sendMail({ previewName, ...mailOptions, html });

  res.status(200).json({ result: sendMailResult });
}
