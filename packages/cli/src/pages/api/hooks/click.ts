import { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../../util/analytics";
import { error } from "../../../util/log";
import prisma from "../../../../prisma";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, messageId } = req.query;

    let decodedUrl;
    if (typeof url == "string") {
      decodedUrl = Buffer.from(url, "base64").toString("ascii");
    }

    if (decodedUrl) {
      if (typeof messageId === "string") {
        Analytics.track({
          event: "email.click",
          properties: { url: decodedUrl, messageId },
        });

        await prisma.click.upsert({
          where: {
            messageId_url: {
              messageId: messageId,
              url: decodedUrl,
            },
          },
          create: {
            messageId: messageId,
            url: decodedUrl,
          },
          update: {
            count: { increment: 1 },
          },
        });
      }

      res.redirect(307, decodedUrl);
    } else {
      res.status(406).json({ error: "Missing required parameters: url" });
    }
  } catch (err) {
    error(err);
    res.status(500).send({ error: "Failed to fetch data" });
  }
}
