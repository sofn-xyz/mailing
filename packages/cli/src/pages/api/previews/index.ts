import { flatten } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "../../../util/mjml";
import {
  getPreviewComponent,
  previewTree,
} from "../../../util/moduleManifestUtil";
import { JSDOM, VirtualConsole } from "jsdom";
import { error, debug } from "../../../util/log";

export type PreviewIndexResponseBody = {
  previews: [string, string[]][];
  previewText: {
    [path: string]: string;
  };
};

const noopConsole = new VirtualConsole();
noopConsole.on("error", (data) => {
  // No-op to skip console errors.
  debug(data?.toString());
});

const MAX_TEXT_CHARS = 140;

function getPreviewFunction(
  previewClass: string,
  name: string
): [string, string] {
  let text = "";
  try {
    const component = getPreviewComponent(previewClass, name);
    if (!component) throw new Error(`${previewClass}#${name} not found`);
    const { html } = render(component);
    // slice out the body to minimize funky head parsing
    const body = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(html);
    if (body && body[1]) {
      // let jsdom figure out what the text content is
      const dom = new JSDOM(body[1], { virtualConsole: noopConsole });
      text =
        dom.window.document.body.textContent
          ?.replace(/\s+/g, " ")
          .trim()
          .substring(0, MAX_TEXT_CHARS) || "";
    }
  } catch (e) {
    error(`error rendering text preview for ${previewClass}#${name}`, e);
  }
  return [`/previews/${previewClass}/${name}`, text];
}

export default async function showPreviewsIndex(
  _req: NextApiRequest,
  res: NextApiResponse<PreviewIndexResponseBody>
) {
  const previews = previewTree();
  const previewText = Object.fromEntries(
    flatten(
      previews.map((previewGroup) =>
        previewGroup[1].map((pf) => getPreviewFunction(previewGroup[0], pf))
      )
    )
  );
  res.json({ previews, previewText });
}
