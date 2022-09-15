import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender, Mjml2HtmlOptions } from "mjml-react";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options: {} = {}
) {
  const mjmlOptions: Mjml2HtmlOptions = {
    validationLevel: "soft",
    ...options,
  };

  return mjRender(component, mjmlOptions);
}
