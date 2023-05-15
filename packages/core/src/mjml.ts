import { JSXElementConstructor, ReactElement } from "react";
import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import mjml2html from "mjml";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: {
    processHtml?: (html: string) => string;
  }
) {
  const { html, errors } = mjml2html(renderToMjml(component), {
    validationLevel: "soft",
  });

  return {
    html: options?.processHtml?.(html) || html,
    errors,
  };
}
