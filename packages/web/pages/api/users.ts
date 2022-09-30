import type { NextApiRequest, NextApiResponse } from "next";
import * as EmailValidator from "email-validator";
import { genSalt, hash } from "bcrypt";
import { randomBytes } from "crypto";

import prisma from "../../prisma";
import { Prisma } from "@prisma/client";

type DataError = {
  error: string;
};

type DataSuccess = {
  clientId: string;
  clientSecret: string;
};

type ResponseData = DataSuccess | DataError;

// https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/

function generateClientSecret() {
  return randomBytes(32).toString("hex");
}

async function createPlaceholderOrganization(hashedClientSecret: string) {
  return await prisma.organization.create({
    data: {
      name: "My organization",
      clientSecret: hashedClientSecret,
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

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) return res.status(400).json({ error: ERRORS.userExists });

  /* Create the organization
   */
  // generate client secret
  const clientSecret = generateClientSecret();
  const clientSecretSalt = await genSalt(10);
  const hashedClientSecret = await hash(clientSecret, clientSecretSalt);

  // create organization in db
  const organization = await createPlaceholderOrganization(hashedClientSecret);

  /* Create the user
   */
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

  res.status(201).json({ clientId: organization.id, clientSecret });
};

export default handler;
