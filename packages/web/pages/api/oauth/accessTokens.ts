import type { NextApiRequest, NextApiResponse } from "next";
import * as EmailValidator from "email-validator";
import { genSalt, hash, compare } from "bcrypt";
import { randomBytes } from "crypto";

import prisma from "../../prisma";
import { Prisma } from "@prisma/client";
import { withSessionAPIRoute } from "../../util/session";

type DataError = {
  error: string;
};

type DataSuccess = {
  clientId: string;
  clientSecret: string;
  code: string;
};

type ResponseData = DataSuccess | DataError;

const ERRORS = {
  userExists: "a user with that email already exists",
  passwordMinLength: "password should be at least 8 characters",
  unknown: "an unknown error occurred",
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { code, organizationId, userId } = req.query;

  if (
    typeof code !== "string" ||
    typeof organizationId !== "string" ||
    typeof userId !== "string"
  ) {
    return res.status(403).end("code, organizationId, userId required");
  }

  const authCode = await prisma.oauthAuthorizationCode.findFirstOrThrow({
    where: { organizationId, userId },
    orderBy: { createdAt: "desc" },
  });

  const authenticated = await compare(code, authCode.code);
  if (!authenticated) {
    return res.status(401).end("bad code");
  }

  const org = await prisma.organization.findFirst({
    where: { id: authCode.organizationId },
  });
  let clientSecret = org?.clientSecret;

  if (!clientSecret) {
    clientSecret = randomBytes(32).toString("hex");
    await prisma.organization.update({
      where: { id: authCode.organizationId },
      data: { clientSecret },
    });
  }

  // Create the auth code
  const nextCode = randomBytes(32).toString("hex");
  const codeSalt = await genSalt(10);
  const hashedCode = await hash(nextCode, codeSalt);
  await prisma.oauthAuthorizationCode.create({
    data: {
      code: hashedCode,
      userId: userId,
      organizationId: organizationId,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  res.status(201).json({
    clientId: authCode.organizationId,
    clientSecret,
    code: hashedCode,
  });
};

export default handler;
