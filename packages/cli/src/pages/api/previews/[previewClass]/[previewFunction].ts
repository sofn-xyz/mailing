import type { NextApiRequest, NextApiResponse } from "next";
import { error } from "../../../../util/log";
import { render } from "../../../../util/mjml";
import { getPreviewComponent } from "../../../../util/moduleManifestUtil";

type Data = {
  name: string;
};

export default function showPreview(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // render preview
  const { previewClass, previewFunction } = req.query;

  if (typeof previewFunction !== "string" || typeof previewClass !== "string") {
    res.writeHead(404);
    res.end("previewClass and previewFunction required");
    return;
  }

  const cleanpreviewFunction = previewFunction.replace(/\.json$/, "");
  const component = getPreviewComponent(previewClass, cleanpreviewFunction);

  if (component?.props) {
    try {
      const { html, errors } = render(component);
      if (errors.length) {
        error(errors);
      }

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({ html, errors }));
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
