import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";

type Data = {
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return res.status(404).end();

  const email = req.body.email;
  const plainTextPassword = req.body.password;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user)
    return res.status(400).json({ error: "no user exists with that email" });

  const authenticated = await compare(plainTextPassword, user.password);

  if (authenticated) {
    res.status(201);
  } else {
    res.status(401).json({ errors: "invalid password" });
  }
};

export default handler;
