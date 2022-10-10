import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.query.apiKey;

  if (typeof apiKey !== "string") {
    res.status(422).end("expected apiKey to be a string");
  }

  try {
    await prisma.apiKey.findFirstOrThrow({
      where: {
        id: apiKey as string,
        active: true,
      },
    });

    res.setHeader("Cache-Control", "s-maxage=30").status(200).end();
  } catch {
    res.status(401).end("API key is not valid");
  }
};

export default handler;
