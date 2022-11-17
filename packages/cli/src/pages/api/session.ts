import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionAPIRoute } from "../../util/session";
import { validate } from "email-validator";
import { compare } from "bcrypt";
import prisma from "../../../prisma";

type Data = {
  error?: string;
};

const handler = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const email = req.body.email;
  const plainTextPassword = req.body.password;

  if (!validate(email))
    return res.status(400).json({ error: "email is invalid" });

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user)
    return res.status(400).json({ error: "No user exists with that email." });

  const authenticated = await compare(plainTextPassword, user.password);

  if (authenticated) {
    req.session.user = user;
    await req.session.save();

    res.status(201).end();
  } else {
    res.status(401).json({ error: "invalid password" });
  }
});

export default handler;
