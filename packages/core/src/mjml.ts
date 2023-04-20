import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: {
    processHtml?: (html: string) => string;
  }
) {
  const { html, errors } = mjRender(component, {
    validationLevel: "soft",
    minify: undefined,
  });

  return {
    html: options?.processHtml?.(html) || html,
    errors,
  };
}
