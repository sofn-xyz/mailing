import { withSessionAPIRoute } from "../../../util/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

type ApiKey = {
  id: string;
};

type Data = {
  error?: string;
  apiKey?: ApiKey;
  apiKeys?: ApiKey[];
};

const ApiKeys = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = req.session.user;

  // require login
  if (!user) {
    return res.status(404).end();
  }

  if ("POST" === req.method) {
    // create a new API key and return it as JSON

    const apiKey = await prisma.apiKey.create({
      data: {
        organizationId: user.organizationId,
      },
    });

    res.status(201).json({
      apiKey,
    });
  } else if ("GET" === req.method) {
    // list APIKeys

    const apiKeys = await prisma.apiKey.findMany({
      where: { organizationId: user.organizationId, active: true },
      select: { id: true },
    });

    res.status(200).json({
      apiKeys,
    });
  } else {
    return res.status(404).end();
  }
});

export default ApiKeys;
