import type { NextApiRequest, NextApiResponse } from "next";
import { error } from "../../../../util/serverLogger";
import { render } from "../../../../util/mjml";
import { getPreviewComponent } from "../../../../util/moduleManifestUtil";

export default async function showPreview(
  req: NextApiRequest,
  res: NextApiResponse<ShowPreviewResponseBody>
) {
  // render preview
  const { previewClass, previewFunction } = req.query;

  if (typeof previewFunction !== "string" || typeof previewClass !== "string") {
    res.writeHead(404);
    res.end("previewClass and previewFunction required");
    return;
  }

  const cleanpreviewFunction = previewFunction.replace(/\.json$/, "");
  const component = await getPreviewComponent(
    previewClass,
    cleanpreviewFunction
  );

  if (component?.props) {
    try {
      const { html, errors, htmlLint } = render(component);
      if (errors.length) {
        error(errors);
      }

      res.json({ html, errors, htmlLint });
    } catch (e) {
      error("caught error rendering mjml to html", e);
      res.writeHead(500);
      res.end(JSON.stringify(e));
    }
  } else {
    const msg = `${previewFunction}() from previews/${previewClass} must return an email template`;
    error(msg);
    res.writeHead(404);
    res.end(msg);
  }
}
