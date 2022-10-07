import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, sendId } = req.query;

  res.status(200).json({ email, sendId });
}
