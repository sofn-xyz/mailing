import { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../../util/analytics";
import prisma from "../../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, sendId } = req.query;

  if (typeof sendId === "string") {
    Analytics.track({
      event: "email.open",
      properties: { email: email, sendId: sendId },
    });

    const send = await prisma.send.findUnique({ where: { id: sendId } });
    await prisma.send.update({
      where: { id: sendId },
      data: {
        openCount: { increment: 1 },
        openedAt: send?.openedAt ? undefined : new Date(),
      },
    });
  }

  res.status(200).json({ email, sendId });
}
