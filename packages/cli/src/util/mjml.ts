import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";
import { parse } from "node-html-parser";

function lintHtml(html: string) {
  const lines = html.split("\n");
  const lint: HtmlLintError[] = [];

  // check html for images with relative paths or localhost
  const root = parse(html);
  const images = root.querySelectorAll("img");
  for (const image of images) {
    const src = image.getAttribute("src");
    if (!src) continue;
    if (src.startsWith("http://localhost")) {
      lint.push({
        line: lines.findIndex((line) => line.includes(`src="${src}"`)) + 1,
        message: `image src "${src}" uses localhost`,
      });
    } else if (!src.startsWith("http")) {
      lint.push({
        line: lines.findIndex((line) => line.includes(`src="${src}"`)) + 1,
        message: `image src "${src}" is relative and must be absolute`,
      });
    }
  }

  // check html for links with relative paths
  const links = root.querySelectorAll("a");
  for (const link of links) {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http")) {
      lint.push({
        line: lines.findIndex((line) => line.includes(`href="${href}"`)) + 1,
        message: `link with href "${href}" and copy "${link.rawText.trim()}" is relative and must be absolute`,
      });
    }
  }

  // add context of surrounding lines
  for (const l of lint) {
    if (l.line < 0) continue;
    l.context = lines.slice(l.line - 1 > 0 ? l.line - 1 : 0, l.line + 2);
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
