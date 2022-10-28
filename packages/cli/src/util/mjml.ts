import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";
import { parse } from "node-html-parser";

function lintHtml(html: string) {
  const lines = html.split("\n");
  const lint: HtmlLintError[] = [];

  // lint img tags
  const root = parse(html);
  const images = root.querySelectorAll("img");

  // keep track of the last line we've seen an image on
  // we skip lines that we've already thrown errors about
  let lastLine = 0;

  for (const image of images) {
    const src = image.getAttribute("src");
    if (!src) continue;
    if (src.startsWith("http://localhost")) {
      lint.push({
        line:
          lines.findIndex(
            (line, i) => i >= lastLine && line.includes(`src="${src}"`)
          ) + 1,
        message: `image src "${src}" uses localhost`,
      });
      lastLine = lint[lint.length - 1].line;
    } else if (!src.startsWith("http")) {
      lint.push({
        line:
          lines.findIndex(
            (line, i) => i >= lastLine && line.includes(`src="${src}"`)
          ) + 1,
        message: `image src "${src}" is relative but must be absolute`,
      });
      lastLine = lint[lint.length - 1].line;
    }
  }

  // check html for links with relative paths or localhost
  const links = root.querySelectorAll("a");
  lastLine = 0;

  for (const link of links) {
    const href = link.getAttribute("href");
    if (href?.startsWith("http://localhost")) {
      lint.push({
        line:
          lines.findIndex(
            (line, i) => i >= lastLine && line.includes(`href="${href}"`)
          ) + 1,
        message: `link with href "${href}" and text "${link.rawText.trim()}" uses localhost`,
      });
      lastLine = lint[lint.length - 1].line;
    } else if (href && !href.startsWith("http")) {
      lint.push({
        line:
          lines.findIndex(
            (line, i) => i >= lastLine && line.includes(`href="${href}"`)
          ) + 1,
        message: `link with href "${href}" and text "${link.rawText.trim()}" is relative but must be absolute`,
      });
      lastLine = lint[lint.length - 1].line;
    }
  }

  // add context of surrounding lines
  for (const l of lint) {
    if (l.line < 0) continue;
    l.context = lines.slice(l.line - 2 > 0 ? l.line - 1 : 0, l.line + 3);
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
