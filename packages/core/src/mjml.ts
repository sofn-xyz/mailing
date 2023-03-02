import { JSXElementConstructor, ReactElement } from "react";
import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import mjml2html from "mjml";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return mjml2html(renderToMjml(component), {
    validationLevel: "soft",
  });
}
