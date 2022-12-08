import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { render } from "../../../util/mjml";
import {
  getPreviewComponent,
  getTemplateModule,
  previewTree,
} from "../../../util/moduleManifestUtil";
import { error } from "../../../util/serverLogger";

export type PreviewIndexResponseBody = {
  previews: [string, string[]][];
  previewInfo: {
    [path: string]: { previewText?: string; subject?: string };
  };
};

const MAX_TEXT_CHARS = 140;

async function getPreviewFunction(previewClass: string, name: string) {
  let subject = "";
  let previewText = "";
  try {
    const component = await getPreviewComponent(previewClass, name);
    if (!component) throw new Error(`${previewClass}#${name} not found`);

    // Try to build preview text from subject
    const template = getTemplateModule(previewClass);
    if (template) {
      if (typeof template.subject === "function") {
        subject = template.subject(component.props);
      } else if (typeof template.subject === "string") {
        subject = template.subject;
      }
    }

    const { html } = render(component);
    // slice out the body to minimize funky head parsing
    const body = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(html);
    if (body && body[1]) {
      const root = parse(body[1]);
      previewText = root.text
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, MAX_TEXT_CHARS);
    }
  } catch (e) {
    error(`error rendering text preview for ${previewClass}#${name}`, e);
  }

  return [
    `/previews/${previewClass}/${name}`,
    {
      previewText,
      subject,
    },
  ];
}

export default async function showPreviewsIndex(
  _req: NextApiRequest,
  res: NextApiResponse<PreviewIndexResponseBody>
) {
  const previews = previewTree();
  const previewInfo = Object.fromEntries(
    await Promise.all(
      previews.flatMap((previewGroup) =>
        previewGroup[1].map((pf) => getPreviewFunction(previewGroup[0], pf))
      )
    )
  );
  res.json({ previews, previewInfo });
}
