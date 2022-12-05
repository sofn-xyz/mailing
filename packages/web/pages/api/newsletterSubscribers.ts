import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

type Data = {
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return res.status(404).end();

  const email = req.body?.email;
  if (typeof email !== "string") {
    return res.status(422).json({ error: "email not provided" });
  }

  const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
    where: { email },
  });
  if (newsletterSubscriber) {
    return res.status(200).end();
  }

  await prisma.newsletterSubscriber.create({
    data: {
      email,
      ip:
        req.headers["x-forwarded-for"]?.toString() ||
        req.socket?.remoteAddress ||
        "",
    },
  });

  res.status(201).end();
};

export default handler;
