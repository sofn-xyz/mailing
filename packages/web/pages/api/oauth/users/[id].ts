import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../prisma";

type ResponseData = {
  user: any;
};

async function validateUserOauth(
  userId: string,
  authHeader: string
): Promise<boolean> {
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

  return authenticated;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const userId = req.query.id as string;
  const authHeader = req.headers["Authorization"];

  if (typeof authHeader !== "string")
    throw new Error("expected Authorization header to be a string");

  const authenticated = await validateUserOauth(userId, authHeader);

  let user;

  if (authenticated) {
    user = prisma.user.findFirst({ where: { id: userId } });
  } else {
    return res.status(401).end();
  }

  res.status(200).json(user);
};

export default handler;
