import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

export const apiKeyFromReq = (
  req: NextApiRequest
): string | string[] | undefined =>
  (req.headers && req.headers["x-api-key"]) || req.query.apiKey;

export async function validateApiKey(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  const apiKey = apiKeyFromReq(req);
  if (typeof apiKey !== "string") {
    res.status(422).end("expected x-api-key in header or apiKey in query");
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
