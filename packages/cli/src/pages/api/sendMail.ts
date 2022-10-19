import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "mailing-core";
import { MjmlError } from "mjml-react";
import { templates, sendMail } from "../../moduleManifest";
import prisma from "../../../prisma";
import Analytics from "../../util/analytics";

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

async function validApiKey(apiKey: string | string[] | undefined) {
  if (!apiKey) return false;

  const host = process.env.MM_DEV ? "http://localhost:3883" : "yourInstallUrl";
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
    previewName,
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

  let html = req.body.html;

  if (!(await validApiKey(req.headers && req.headers["x-api-key"])))
    return res.status(401).json({
      error: "invalid API key",
    });

  // validate at least one of to, cc, bcc exists
  if (
    typeof to === "undefined" &&
    typeof cc === "undefined" &&
    typeof bcc === "undefined"
  ) {
    return res
      .status(403)
      .json({ error: "to, cc, or bcc must be specified" } as Data);
  }

  // validate subject
  if (typeof subject !== "string") {
    return res.status(403).json({ error: "subject must be specified" } as Data);
  }

  // validate template name
  if (typeof templateName !== "string" && typeof html !== "string") {
    return res
      .status(403)
      .json({ error: "templateName or html must be specified" } as Data);
  }

  // render template if html doesn't exist
  if (!html) {
    const { error, html: renderedHtml } = renderTemplate(
      templateName.replace(/\.[jt]sx?$/, ""),
      props
    );

    if (error) {
      return res.status(404).json({ error } as Data);
    }
    html = renderedHtml;
  }

  const sendMailResult = await sendMail({
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

  // create analytics data
  const emailContent = await prisma.emailContent.create({
    data: {
      html,
      subject,
    },
  });

  const recipients = [
    ...new Set(Array(to).concat(Array(cc)).concat(Array(bcc))),
  ].filter(Boolean);

  console.log(recipients);

  await prisma.send.createMany({
    data: recipients.map((recipient) => ({
      emailContentId: emailContent.id,
      templateName,
      previewName,
      to: recipient,
    })),
  });

  const sends = await prisma.send.findMany({
    where: {
      emailContentId: emailContent.id,
    },
  });

  // track analytics
  Analytics.trackMany(
    sends.map((send) => ({
      event: "email.send",
      properties: {
        to: send.to,
        sendId: send.id,
        templateName,
        previewName,
      },
    }))
  );

  res.status(200).json(sendMailResult || {});
}
