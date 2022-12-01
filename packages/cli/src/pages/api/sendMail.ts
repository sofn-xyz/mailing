import type { NextApiRequest, NextApiResponse } from "next";
import { MjmlError } from "mjml-react";
import { sendMail } from "../../moduleManifest";
import { validateApiKey } from "../../util/validate/validateApiKey";
import { createElement } from "react";
import { getTemplateModule } from "../../util/moduleManifestUtil";
import { validateMethod } from "../../util/validate/validateMethod";
import {
  errorTemplateNameMustBeSpecified,
  errorTemplateNotFoundInListOfTemplates,
} from "../../util/validate/validateTemplate";

type Data = {
  error?: string; // api error messages
  mjmlErrors?: MjmlError[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!validateMethod(["POST"], req, res)) return;
  if (!(await validateApiKey(req, res))) return;

  const { templateName, previewName, props, ...mailOptions } = req.body;

  const html = req.body.html;
  let component;

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
      return errorTemplateNameMustBeSpecified(res);
    }

    const template = getTemplateModule(templateName);

    if (!template)
      return errorTemplateNotFoundInListOfTemplates(templateName, res);

    component = createElement(template, props);
  }

  try {
    const sendMailResult = await sendMail({
      component,
      previewName,
      ...mailOptions,
      html,
    });

    const json = sendMailResult ? { result: sendMailResult } : {};
    return res.status(200).json(json);
  } catch (e: any) {
    if ("number" === typeof e.status) {
      return res.status(e.status).json({ error: e.message });
    } else {
      return res
        .status(500)
        .json({ error: `sendMail returned an error: ${e.message}` });
    }
  }
}
