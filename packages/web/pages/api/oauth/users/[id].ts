import { User } from "../../../../prisma/generated/client";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../prisma";

type ResponseData = {
  user: any;
};

async function validOauthUser(
  userId: string,
  authHeader: string
): Promise<false | User> {
  const parsedAuthHeader = authHeader.match(/^bearer: (.*)/i);
  if (null === parsedAuthHeader) return false;
  const token = parsedAuthHeader[1];

  const oauthAccessTokens = await prisma.oauthAccessToken.findMany({
    where: {
      userId,
    },
  });

  const authenticated = oauthAccessTokens.some(
    async (oauthAccessToken) => await compare(token, oauthAccessToken.token)
  );

  if (authenticated) {
    return await prisma.user.findFirst({ where: { id: userId } });
  } else {
    return false;
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const userId = req.query.id as string;
  const authHeader = req.headers["Authorization"];

  if (typeof authHeader !== "string")
    throw new Error("expected Authorization header to be a string");

  const user = await validOauthUser(userId, authHeader);

  if (user) {
    res.status(200).json({ user });
  } else {
    return res.status(401).end();
  }
};

export default handler;
