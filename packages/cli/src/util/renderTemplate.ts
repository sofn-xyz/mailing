import React from "react";
import { render } from "mailing-core";
import { templates } from "../moduleManifest";
import { getTemplateModule } from './moduleManifestUtil'

type renderTemplateResult = {
  error?: string;
  mjmlErrors?: MjmlError[];
  html?: string;
  subject?: string;
};

const renderTemplate = (
  templateName: string,
  props: { [key: string]: any }
): renderTemplateResult => {
  const Template = getTemplateModule(templateName)
  if (!Template) {
    return {
      error: `Template ${templateName} not found in list of templates: ${Object.keys(
        templates
      ).join(", ")}`,
    };
  }

  const { html, errors } = render(React.createElement(Template as any, props));

  let subject
  if (typeof Template.subject === "function") {
    subject = Template.subject(props);
  } else if (typeof Template.subject === "string") {
    subject = Template.subject;
  }

  return {
    html,
    subject,
    mjmlErrors: errors,
  }
};

export default renderTemplate;
