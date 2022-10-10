import { NextApiRequest, NextApiResponse } from "next";
import Analytics from "../../../util/analytics";
import { error } from "../../../util/log";

type ResponseData = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, email, sendId } = req.query;

    let decodedUrl;
    if (typeof url == "string") {
      decodedUrl = Buffer.from(url, "base64").toString("ascii");
    }

    if (decodedUrl) {
      Analytics.track("email.click", { url: decodedUrl, email, sendId });
      res.redirect(307, decodedUrl);
    } else {
      res.status(406).json({ error: "Missing required parameters: url" });
    }
  } catch (err) {
    error(err);
    res.status(500).send({ error: "Failed to fetch data" });
  }
}
