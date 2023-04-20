import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  minifyCb?: (html: string) => string
) {
  const { html, errors } = mjRender(component, {
    validationLevel: "soft",
    minify: undefined,
  });

  return {
    html: minifyCb?.(html) || html,
    errors,
  };
}
