import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { render } from "../../../util/mjml";
import {
  getPreviewComponent,
  getTemplateModule,
  previewTree,
} from "../../../util/moduleManifestUtil";
import { error } from "../../../util/log";

export type PreviewIndexResponseBody = {
  previews: [string, string[]][];
  previewText: {
    [path: string]: string;
  };
};

const MAX_TEXT_CHARS = 140;

async function getPreviewFunction(
  previewClass: string,
  name: string
): Promise<[string, string]> {
  let text = "";
  try {
    const component = await getTemplateModule(previewClass);
    if (!component) throw new Error(`${previewClass} not found`);

    const previewComponent = await getPreviewComponent(previewClass, name);
    if (!previewComponent) throw new Error(`${previewClass}#${name} not found`);

    // Try to build preview text from subject
    if (typeof component.subject === "function") {
      text = component.subject(previewComponent.props);
    }

    // If that didn't work, try to build preview text from the rendered preview
    if (text.length === 0) {
      const { html } = render(previewComponent);
      // slice out the body to minimize funky head parsing
      const body = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(html);
      if (body && body[1]) {
        const root = parse(body[1]);
        text = root.text
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, MAX_TEXT_CHARS);
      }
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
    await Promise.all(
      previews.flatMap((previewGroup) =>
        previewGroup[1].map((pf) => getPreviewFunction(previewGroup[0], pf))
      )
    )
  );
  res.json({ previews, previewText });
}
