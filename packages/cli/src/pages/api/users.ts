import type { NextApiRequest, NextApiResponse } from "next";
import * as EmailValidator from "email-validator";
import { genSalt, hash } from "bcrypt";

import prisma from "../../../prisma";
import { Prisma } from "../../../prisma/generated/client";

type DataError = {
  error: string;
};

type DataSuccess = {
  code: string;
};

type ResponseData = DataSuccess | DataError;

async function createPlaceholderOrganization() {
  return await prisma.organization.create({
    data: {
      name: "My organization",
    },
  });
}

const ERRORS = {
  userWithEmailExists: "a user with that email already exists",
  userExists: "mailing only supports one user for now",
  passwordMinLength: "password should be at least 8 characters",
  unknown: "an unknown error occurred",
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== "POST") return res.status(404).end();

  // for now, we only let you have one user
  const existingUser = await prisma.user.findFirst();
  if (existingUser) {
    return res.status(400).json({ error: ERRORS.userExists });
  }

  const email = req.body.email;
  const plainTextPassword = req.body.password;

  // validations
  if (!EmailValidator.validate(email))
    return res.status(400).json({ error: "email is invalid" });

  if (plainTextPassword?.length < 8)
    return res.status(400).json({ error: ERRORS.passwordMinLength });

  const salt = await genSalt(10);
  const hashedPassword = await hash(plainTextPassword, salt);

  let user;

  // uncomment this when multiple users per install are supported
  // let user = await prisma.user.findFirst({
  //   where: { email },
  // });
  // if (user) return res.status(400).json({ error: ERRORS.userWithEmailExists });

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
        return res.status(400).json({ error: ERRORS.userWithEmailExists });
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

  res.status(201).end();
};

export default handler;
