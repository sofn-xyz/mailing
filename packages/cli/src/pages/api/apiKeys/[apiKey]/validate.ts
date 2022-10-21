import { NextApiRequest, NextApiResponse } from "next";
import { validateApiKey } from "../../../../util/validateApiKey";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (await validateApiKey(req, res)) {
    res.setHeader("Cache-Control", "s-maxage=30").status(200).end();
  }
};

export default handler;
