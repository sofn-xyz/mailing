import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

export async function validateApiKey(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  const apiKey = (req.headers && req.headers["x-api-key"]) || req.query.apiKey;
  if (typeof apiKey !== "string") {
    res.status(422).end("expected apiKey to be a string");
    return false;
  }

  try {
    await prisma.apiKey.findFirstOrThrow({
      where: {
        id: apiKey as string,
        active: true,
      },
    });

    return true;
  } catch {
    res.status(401).end("API key is not valid");
  }

  return false;
}
