import type { NextApiRequest, NextApiResponse } from "next";
import { validateApiKey, apiKeyFromReq } from "../../../util/validateApiKey";
import createMessage from "../../../util/createMessage";
import prisma from "../../../../prisma";

type Data = {
  error?: string;
  message?: any;
};

async function defaultListId(apiKey: string) {
  const organizationId = (
    await prisma.apiKey.findFirstOrThrow({
      where: { id: apiKey },
    })
  ).organizationId;

  const list = await prisma.list.findFirst({
    where: { organizationId, isDefault: true },
  });

  if (!list) {
    throw new Error("no default list found");
  }

  return list.id;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await validateApiKey(req, res))) return;

  const apiKey = apiKeyFromReq(req);

  const listId =
    req.query.listId || req.body.listId || (await defaultListId(apiKey));

  const message = await createMessage({
    to: req.body.to,
    bcc: req.body.bcc,
    cc: req.body.cc,
    from: req.body.from,
    subject: req.body.subject,
    html: req.body.html,
    templateName: req.body.templateName,
    previewName: req.body.previewName,
    listId,
  });

  return res.status(200).json({ message });
}
