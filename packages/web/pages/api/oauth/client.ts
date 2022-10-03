import type { NextApiRequest, NextApiResponse } from "next";
import { genSalt, hash, compare } from "bcrypt";
import { randomBytes } from "crypto";

import prisma from "../../../prisma";

type DataError = {
  error: string;
};

type DataSuccess = {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  userId: string;
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
  const { code } = req.query;

  if (typeof code !== "string") return res.status(403).end("code required");

  const authCode = await prisma.oauthAuthorizationCode.findFirstOrThrow({
    where: { code },
    orderBy: { createdAt: "desc" },
  });
  await prisma.oauthAuthorizationCode.deleteMany({
    where: { organizationId: authCode.organizationId, userId: authCode.userId },
  });
  if (authCode.expiresAt.getTime() < Date.now()) {
    return res.status(401).end("authCode expired");
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

  // Create the access token
  const token = randomBytes(32).toString("hex");
  const tokenSalt = await genSalt(10);
  const hashedToken = await hash(token, tokenSalt);
  await prisma.oauthAccessToken.create({
    data: {
      token: hashedToken,
      userId: authCode.userId,
    },
  });

  res.status(201).json({
    clientId: authCode.organizationId,
    clientSecret,
    accessToken: token,
    userId: authCode.userId,
  });
};

export default handler;
