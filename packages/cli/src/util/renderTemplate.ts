import React from "react";
import { render } from "mailing-core";
import { templates } from "../moduleManifest";

type renderTemplateResult = {
  error?: string;
  mjmlErrors?: MjmlError[];
  html?: string;
};

const renderTemplate = (
  templateName: string,
  props: { [key: string]: any }
): renderTemplateResult => {
  const Template = templates[templateName as keyof typeof templates];
  if (!Template) {
    return {
      error: `Template ${templateName} not found in list of templates: ${Object.keys(
        templates
      ).join(", ")}`,
    };
  }

  return render(React.createElement(Template as any, props));
};

export default renderTemplate;
