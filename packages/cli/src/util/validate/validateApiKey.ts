import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export const apiKeyFromReq = (
  req: NextApiRequest
): string | string[] | undefined =>
  (req.headers && req.headers["x-api-key"]) || req.query.apiKey;

export async function validateApiKey(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  if (process.env.NEXT_PUBLIC_MAILING_SKIP_AUTH === "true") return true;

  const apiKey = apiKeyFromReq(req);
  if (process.env.MAILING_INTEGRATION_TEST && "testApiKey" === apiKey)
    return true;

  if (typeof apiKey !== "string") {
    res
      .status(422)
      .json({ error: "expected x-api-key in header or apiKey in query" });
    return false;
  }

  // try to validate api key using process.env.MAILING_API_KEY
  if (process.env.MAILING_API_KEY && apiKey === process.env.MAILING_API_KEY)
    return true;

  // try to validate api key using the database
  try {
    await prisma.apiKey.findFirstOrThrow({
      where: {
        id: apiKey as string,
        active: true,
      },
    });

    return true;
  } catch {
    res.status(401).json({ error: "API key is not valid" });
    return false;
  }
}
