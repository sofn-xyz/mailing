import React from "react";
import { createTransport } from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import buildSendMail, { render } from "mailing-core";
import { MjmlError } from "mjml-react";
import { templates } from "../../moduleManifest";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).end();

  const { templateName, props } = req.query;

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

  const transport = createTransport({
    pool: true,
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.SES_USER,
      pass: process.env.SES_PASSWORD,
    },
  });

  const options = {
    transport,
    defaultFrom: "alex.farrill@gmail.com",
    configPath: "",
  };

  const sendMail = buildSendMail(options);
  const to = "alex.farrill@gmail.com";

  sendMail({ to, html });

  res.status(200).end();
}
