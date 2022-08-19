import type { NextApiRequest, NextApiResponse } from "next";
import moduleManifest from "../../../../../moduleManifest";
import { error } from "../../../../log";
import { render } from "../../../../mjml";

type Data = {
  name: string;
};

export default function showPreview(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // render preview
  const { moduleName, functionName } = req.query;

  const previewModule = moduleManifest[moduleName.toString()];
  const component = previewModule[functionName]();

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
    const msg = `${functionName}() from previews/${moduleName} must return an email template`;
    error(msg);
    res.writeHead(404);
    res.end(msg);
  }
}
