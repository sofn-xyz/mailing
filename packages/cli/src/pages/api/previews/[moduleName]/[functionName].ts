import type { NextApiRequest, NextApiResponse } from "next";
import { ReactElement } from "react";
import moduleManifest from "../../../../moduleManifest";
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

  if (typeof functionName !== "string" || typeof moduleName !== "string") {
    res.writeHead(404);
    res.end("moduleName and functionName required");
    return;
  }

  const previewModules = moduleManifest.previews;
  const cleanFunctionName = functionName.replace(/\.json$/, "");
  const previewModule: {
    [key: string]: () => ReactElement;
  } = previewModules[moduleName as keyof typeof previewModules];
  const component = previewModule[cleanFunctionName]();

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
