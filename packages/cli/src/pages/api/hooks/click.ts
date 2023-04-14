import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
import Analytics from "../../../util/analytics";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, messageId } = req.query;

  if ("string" !== typeof url) {
    return res.status(406).json({ error: "Missing required parameters: url" });
  }

  if (typeof messageId === "string") {
    await Analytics.track({
      event: "email.click",
      properties: { url, messageId },
    });

    try {
      await prisma.click.upsert({
        where: {
          messageId_url: {
            messageId: messageId,
            url,
          },
        },
        create: {
          messageId: messageId,
          url,
        },
        update: {
          count: { increment: 1 },
        },
      });
    } catch (e) {
      console.error("Writing click failed", e);
    }
  }

  res.redirect(307, url);
}
