import type { NextApiRequest, NextApiResponse } from "next";
import { apiKeyFromReq } from "../../../util/validate/validateApiKey";
import createMessage from "../../../util/createMessage";
import prisma from "../../../../prisma";
import { Prisma } from "../../../../prisma/generated/client";

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

  const { skipUnsubscribeChecks, to: email } = req.body;

  if (typeof apiKey !== "string") {
    return res
      .status(422)
      .json({ error: "expected x-api-key in header or apiKey in query" });
  }

  let organizationId;

  const apiTestMode =
    process.env.MAILING_INTEGRATION_TEST && "testApiKey" === apiKey;

  if (!apiTestMode) {
    try {
      const apiKeyRecord = await prisma.apiKey.findFirstOrThrow({
        where: {
          id: apiKey,
          active: true,
        },
      });

      organizationId = apiKeyRecord.organizationId;
    } catch {
      return res.status(401).json({ error: "API key is not valid" });
    }
  }

  let memberId;

  const organization = await prisma.organization.findFirstOrThrow({
    where: { id: organizationId },
  });

  if (skipUnsubscribeChecks) {
    // in this case we still want to add the email to the default list if it doesn't exist
    const defaultList = await prisma.list.findFirstOrThrow({
      where: { organizationId: organization.id, isDefault: true },
    });

    try {
      await prisma.member.create({
        data: {
          listId: defaultList.id,
          email,
          status: "subscribed",
        },
      });
    } catch (e) {
      // ignore if it's a duplicate key error because that means the email is already on the default list
      if ((e as Prisma.PrismaClientKnownRequestError).code !== "P2002") {
        throw e;
      }
    }
  } else {
    const listName = req.query.listName || req.body.listName;
    let list, defaultList, listMember, defaultListMember;

    // if listName is passed, look it up or create it
    if (listName) {
      // capitalize the first letter of the list name
      const displayName = listName.charAt(0).toUpperCase() + listName.slice(1);

      list = await prisma.list.upsert({
        where: { name: listName },
        create: {
          name: listName,
          displayName,
          isDefault: false,
          organizationId: organization.id,
        },
        update: {},
      });
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
        where: { listId: list.id, email },
      });
    }

    if (list !== defaultList) {
      defaultListMember = await prisma.member.findFirst({
        where: { listId: defaultList.id, email },
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
          status: "subscribed",
          email,
        },
      });
    }

    // if there's no record for the default list, create one (subscribed)

    if (list === defaultList) {
      defaultListMember = listMember;
    } else if (!defaultListMember) {
      const data = {
        listId: defaultList.id,
        email,
        status: "subscribed" as const,
      };

      defaultListMember = await prisma.member.create({ data });
    }

    memberId = listMember?.id || defaultListMember?.id;
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
