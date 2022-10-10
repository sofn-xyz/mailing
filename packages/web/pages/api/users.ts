import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

type Data = {
  error?: string;
};

const users = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return res.status(404).end();

  const email = req.body?.email;
  if (typeof email !== "string") {
    return res.status(403).json({ error: "email not provided" });
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return res.status(200).end();
  }

  await prisma.user.create({
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

export default users;
