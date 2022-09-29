import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import * as EmailValidator from "email-validator";
import prisma from "../../prisma";

import { withIronSessionApiRoute } from "iron-session/next";

type Data = {
  error?: string;
};

const handler = withIronSessionApiRoute(
  async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") return res.status(404).end();

    const email = req.body.email;
    const plainTextPassword = req.body.password;

    if (!EmailValidator.validate(email))
      return res.status(400).json({ error: "email is invalid" });

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user)
      return res.status(400).json({ error: "no user exists with that email" });

    const authenticated = await compare(plainTextPassword, user.password);

    if (authenticated) {
      req.session.user = user;
      await req.session.save();

      res.status(201).end();
    } else {
      res.status(401).json({ error: "invalid password" });
    }
  },
  {
    cookieName: "mailing",
    password: process.env.SESSION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    ttl: 0,
  }
);

export default handler;
