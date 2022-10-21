import { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../../util/analytics";
import prisma from "../../../../prisma";
import { debug } from "../../../util/log";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, messageId } = req.query;

  if (typeof messageId === "string") {
    Analytics.track({
      event: "email.open",
      properties: { email: email, messageId: messageId },
    });

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    try {
      await prisma.message.update({
        where: { id: messageId },
        data: {
          openCount: { increment: 1 },
          openedAt: message?.openedAt ? undefined : new Date(),
        },
      });
    } catch (err) {
      debug(err);
    }
  }

  res.status(200).json({ email, messageId });
}
