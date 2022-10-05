import type { NextApiRequest, NextApiResponse } from "next";
import * as EmailValidator from "email-validator";
import { genSalt, hash } from "bcrypt";
import { randomBytes } from "crypto";

import prisma from "../../prisma";
import { Prisma } from "../../prisma/generated/client";

type DataError = {
  error: string;
};

type DataSuccess = {
  code: string;
};

type ResponseData = DataSuccess | DataError;

const MINS_VALID = 10;

async function createPlaceholderOrganization() {
  return await prisma.organization.create({
    data: {
      name: "My organization",
    },
  });
}

const ERRORS = {
  userExists: "a user with that email already exists",
  passwordMinLength: "password should be at least 8 characters",
  unknown: "an unknown error occurred",
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== "POST") return res.status(404).end();

  const email = req.body.email;
  const plainTextPassword = req.body.password;

  // validations
  if (!EmailValidator.validate(email))
    return res.status(400).json({ error: "email is invalid" });

  if (plainTextPassword?.length < 8)
    return res.status(400).json({ error: ERRORS.passwordMinLength });

  const salt = await genSalt(10);
  const hashedPassword = await hash(plainTextPassword, salt);

  let user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) return res.status(400).json({ error: ERRORS.userExists });

  // create organization in db
  const organization = await createPlaceholderOrganization();

  /* Create the user
   */
  try {
    user = await prisma.user.create({
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

  if (!user) {
    console.error("user null");
    return res.status(500).json({ error: ERRORS.unknown });
  }

  // Create the auth code
  const code = randomBytes(10).toString("hex");
  await prisma.oauthAuthorizationCode.create({
    data: {
      code,
      userId: user.id,
      organizationId: organization.id,
      expiresAt: new Date(Date.now() + MINS_VALID * 60 * 1000),
    },
  });

  res.status(201).json({ code });
};

export default handler;
