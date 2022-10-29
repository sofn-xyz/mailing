import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";
import { parse } from "node-html-parser";

function lintHtml(html: string) {
  const lint: HtmlLintError[] = [];

  // lint img tags
  const root = parse(html);
  const images = root.querySelectorAll("img");

  for (const image of images) {
    const src = image.getAttribute("src");
    if (!src) continue;
    if (src.startsWith("http://localhost")) {
      lint.push({
        message: `image src "${src}" uses localhost`,
      });
    } else if (src?.startsWith("/")) {
      lint.push({
        message: `image src "${src}" is relative but must be absolute`,
      });
    }
  }

  // lint a tags
  const links = root.querySelectorAll("a");

  for (const link of links) {
    const href = link.getAttribute("href");
    if (href?.startsWith("http://localhost")) {
      lint.push({
        message: `link with href "${href}" and text "${link.rawText.trim()}" uses localhost`,
      });
    } else if (href?.startsWith("/")) {
      lint.push({
        message: `link with href "${href}" and text "${link.rawText.trim()}" is relative but must be absolute`,
      });
    }
  }

  return lint;
}

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const { html, errors } = mjRender(component);
  const htmlLint = lintHtml(html);
  return { html, errors, htmlLint };
}
