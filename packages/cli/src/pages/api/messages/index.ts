import type { NextApiRequest, NextApiResponse } from "next";
import { apiKeyFromReq } from "../../../util/validateApiKey";
import createMessage from "../../../util/createMessage";
import prisma from "../../../../prisma";

type Data = {
  error?: string;
  message?: any;
  memberId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // todo: verify that required fields like to, from, subject, html are present

  const apiKey = apiKeyFromReq(req);

  const { skipUnsubscribeChecks } = req.body;

  if (typeof apiKey !== "string") {
    return res
      .status(422)
      .end("expected x-api-key in header or apiKey in query");
  }

  let organizationId;

  try {
    const apiKeyRecord = await prisma.apiKey.findFirstOrThrow({
      where: {
        id: apiKey,
        active: true,
      },
    });

    organizationId = apiKeyRecord.organizationId;
  } catch {
    return res.status(401).end("API key is not valid");
  }

  let memberId;

  if (!skipUnsubscribeChecks) {
    const organization = await prisma.organization.findFirstOrThrow({
      where: { id: organizationId },
    });

    const listName = req.query.listName || req.body.listName;
    let list, defaultList, listMember, defaultListMember;

    // if listName exists, look it up
    if (listName) {
      list = await prisma.list.findUniqueOrThrow({ where: { name: listName } });
    }

    // also lookup the default list
    if (list?.isDefault) {
      defaultList = list;
    } else {
      defaultList = await prisma.list.findFirstOrThrow({
        where: { organizationId: organization.id, isDefault: true },
      });
    }

    if (list) {
      listMember = await prisma.member.findFirst({
        where: { listId: list.id, email: req.body.email },
      });
    }

    if (list !== defaultList) {
      defaultListMember = await prisma.member.findFirst({
        where: { listId: defaultList.id, email: req.body.email },
      });
    }

    // return early if your status to either list is not "subscribed"
    if (
      (listMember && listMember.status !== "subscribed") ||
      (defaultListMember && defaultListMember.status !== "subscribed")
    ) {
      return res
        .status(200)
        .json({ error: "user is not subscribed to either list" });
    }

    // if there's no record for the list that was specified, create one (subscribed)

    if (list && !listMember) {
      listMember = await prisma.member.create({
        data: {
          listId: list.id,
          email: req.body.to,
          status: "subscribed",
        },
      });
    }

    // if there's no record for the default list, create one (subscribed)

    if (!defaultListMember) {
      const data = {
        listId: defaultList.id,
        email: req.body.to,
        status: "subscribed" as const,
      };

      defaultListMember = await prisma.member.create({ data });
    }

    memberId = listMember?.id || defaultListMember.id;
  }

  const message = await createMessage({
    to: req.body.to,
    bcc: req.body.bcc,
    cc: req.body.cc,
    from: req.body.from,
    subject: req.body.subject,
    html: req.body.html,
    templateName: req.body.templateName,
    previewName: req.body.previewName,
  });

  return res.status(200).json({ message, memberId });
}
