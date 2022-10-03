import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  id: string;
  email: string;
  authorizations: { analytics: boolean };
};

async function authenticateOauthUser(req: NextApiRequest) {
  const token = req.headers["Authorization"];

  // TODO: parse it out of string with "Bearer: " prefix

  const userId = req.query.id as string;

  const oauthAccessTokens = await prisma.oauthAccessToken.findMany({
    where: {
      userId,
    },
  });

  if (some(oauthAccessTokens, (dbToken) => {
    // bcrypt validate dbToken
  }))
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const user = authenticateOauthUser(req);

  if (!user) req;

  return {
    id: "userid",
    email: "alex.farrill@gmail.com",
    authorizations: {
      analytics: true,
    },
  };
};

export default handler;
