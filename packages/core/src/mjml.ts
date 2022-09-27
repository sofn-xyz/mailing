import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "@faire/mjml-react";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return mjRender(component, {
    validationLevel: "soft",
    minify: undefined,
  });
}
