import { JSXElementConstructor, ReactElement } from "react";
import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import mjml2html from "mjml";

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: {
    processHtml?: (html: string) => string;
  }
) {
  // `@types/mjml` pulls `@types/mjml-core` via a `*` range, which now resolves
  // to v5 where `mjml2html` is typed as async (`Promise<MJMLParseResults>`).
  // We pin `mjml@^4`, whose `mjml2html` is synchronous at runtime, so assert the
  // result to the awaited (unwrapped) return type — a no-op when the resolved
  // types are already synchronous. See gh#504.
  const { html, errors } = mjml2html(renderToMjml(component), {
    validationLevel: "soft",
  }) as unknown as Awaited<ReturnType<typeof mjml2html>>;

  return {
    html: options?.processHtml?.(html) || html,
    errors,
  };
}
