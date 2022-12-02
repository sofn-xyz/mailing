import type { NextApiRequest, NextApiResponse } from "next";
import { MjmlError } from "mjml-react";

import renderTemplate from "../../util/renderTemplate";
import { validateApiKey } from "../../util/validate/validateApiKey";
import { validateMethod } from "../../util/validate/validateMethod";
import { validateTemplate } from "../../util/validate/validateTemplate";

type Data = {
  error?: string;
  html?: string;
  mjmlErrors?: MjmlError[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!validateMethod(["GET", "POST"], req, res)) return;

  if (
    process.env.REQUIRE_API_KEY === "true" &&
    !(await validateApiKey(req, res))
  )
    return;

  const { templateName } = "GET" === req.method ? req.query : req.body;

  if (!validateTemplate(templateName, res)) return;

  // parse props
  let parsedProps = {};
  try {
    parsedProps =
      "GET" === req.method
        ? JSON.parse(decodeURIComponent(req.query.props as string))
        : req.body.props;
  } catch {
    return res.status(422).json({
      error:
        "props could not be parsed from " + req.method === "GET"
          ? "querystring"
          : "request body",
    });
  }

  const { error, mjmlErrors, html } = renderTemplate(
    templateName.replace(/\.[jt]sx?$/, ""),
    parsedProps
  );

  if (error) return res.status(422).json({ error });

  res.status(200).json({ html, mjmlErrors });
}
