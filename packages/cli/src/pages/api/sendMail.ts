import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "mailing-core";
import { MjmlError } from "mjml-react";
import { templates, sendMail } from "../../moduleManifest";

type Data = {
  error?: string; // api error messages
  html?: string;
  mjmlErrors?: MjmlError[];
};

function renderTemplate(
  templateName: string,
  props: { [key: string]: any }
): { error?: string; mjmlErrors?: MjmlError[]; html?: string } {
  const Template = templates[templateName as keyof typeof templates];
  if (!Template) {
    return {
      error: `Template ${templateName} not found in list of templates: ${Object.keys(
        templates
      ).join(", ")}`,
    };
  }

  return render(React.createElement(Template as any, props as any));
}

async function validApiKey(apiKey: string) {
  const host = process.env.MM_DEV
    ? "localhost:3000"
    : "https://www.mailing.run";
  const response = await fetch(`${host}/api/apiKeys/${apiKey}/validate`);

  return 200 === response.status;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).end();

  const {
    templateName,
    props,
    to,
    subject,
    cc,
    bcc,
    from,
    text,
    sender,
    replyTo,
    inReplyTo,
    references,
  } = req.body;

  if (!(await validApiKey(req.headers["X-API-Key"])))
    return res.status(401).json({
      error:
        "please use a valid API key or create one at https://www.mailing.run/settings",
    });

  // validate to, cc, bcc name
  if (
    typeof to !== "string" &&
    typeof cc !== "string" &&
    typeof bcc !== "string"
  ) {
    return res
      .status(403)
      .json({ error: "to, cc, or bcc must be specified" } as Data);
  }

  // validate template name
  if (typeof templateName !== "string") {
    return res
      .status(403)
      .json({ error: "templateName must be specified" } as Data);
  }

  // parse props
  let parsedProps = {};
  try {
    parsedProps = JSON.parse(decodeURIComponent(props as string));
  } catch {
    return res
      .status(403)
      .json({ error: "props could not be parsed from querystring" } as Data);
  }

  const { error, mjmlErrors, html } = renderTemplate(
    templateName.replace(/\.[jt]sx?$/, ""),
    parsedProps
  );

  if (error) {
    return res.status(404).json({ error } as Data);
  }

  sendMail({
    html,
    to,
    cc,
    bcc,
    subject,
    from,
    text,
    sender,
    replyTo,
    inReplyTo,
    references,
  });

  res.status(200).end();
}
