import type { NextApiRequest, NextApiResponse } from "next";
import { bundleId } from "../../moduleManifest";

type Data = {
  bundleId: number;
};

const handler = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ bundleId });
};

export default handler;
