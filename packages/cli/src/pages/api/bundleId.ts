import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  bundleId: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { bundleId } = require("../../moduleManifest");
  res.status(200).json({ bundleId });
};

export default handler;
