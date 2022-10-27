import { JSXElementConstructor, ReactElement } from "react";
import { render as mjRender } from "mjml-react";
import { parse } from "node-html-parser";

function lintHtml(html: string) {
  const lint = [];
  // check html for images with relative paths or localhost
  const root = parse(html);
  const images = root.querySelectorAll("img");
  for (const image of images) {
    const src = image.getAttribute("src");
    if (!src) continue;
    if (src.startsWith("http://localhost")) {
      lint.push(`image src "${src}" uses localhost`);
    } else if (!src.startsWith("http")) {
      lint.push(`image src "${src}" is relative and must be absolute`);
    }
  }

  // check html for links with relative paths
  const links = root.querySelectorAll("a");
  for (const link of links) {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http")) {
      lint.push(`link href "${href}" is relative and must be absolute`);
    }
  }

  return lint;
}

export function render(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const { html, errors } = mjRender(component);
  const lint = lintHtml(html);
  return { html, errors, lint };
}
