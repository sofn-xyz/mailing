import type { NextApiRequest, NextApiResponse } from "next";
import { genSalt, hash } from "bcrypt";

import prisma from "../../prisma";
import { Prisma } from "@prisma/client";

type Data = {
  error?: string;
};

async function createPlaceholderOrganization() {
  return await prisma.organization.create({
    data: {
      name: "My organization",
    },
  });
}

const ERRORS = {
  userExists: "a user with that email already exists",
  unknown: "an unknown error occurred",
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") return res.status(404).end();

  const email = req.body.email;
  const plainTextPassword = req.body.password;

  // TODO: Verify password meets some criteria of length etc.

  const salt = await genSalt(10);
  const hashedPassword = await hash(plainTextPassword, salt);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) return res.status(400).json({ error: ERRORS.userExists });

  const organization = await createPlaceholderOrganization();

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId: organization.id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({ error: ERRORS.userExists });
      } else {
        console.error(error);
        return res.status(500).json({ error: ERRORS.unknown });
      }
    }
  }

  res.status(201).end();
};

export default handler;
