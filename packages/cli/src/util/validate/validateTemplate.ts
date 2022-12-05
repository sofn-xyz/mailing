import { NextApiResponse } from "next";
import { templates } from "../../moduleManifest";
import { getTemplateModule } from "../moduleManifestUtil";

export function errorTemplateNameMustBeSpecified(res: NextApiResponse) {
  return res.status(422).json({ error: "templateName must be specified" });
}

export function errorTemplateNotFoundInListOfTemplates(
  templateName: string,
  res: NextApiResponse
) {
  return res.status(422).json({
    error: `Template ${templateName} not found in list of templates: ${Object.keys(
      templates
    ).join(", ")}`,
  });
}

export function validateTemplate(
  templateName: string,
  res: NextApiResponse
): boolean {
  if (typeof templateName !== "string") {
    errorTemplateNameMustBeSpecified(res);

    return false;
  } else {
    const template = getTemplateModule(templateName);
    if (!template) {
      errorTemplateNotFoundInListOfTemplates(templateName, res);

      return false;
    }

    return true;
  }
}
