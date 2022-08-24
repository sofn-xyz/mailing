import type { NextApiRequest, NextApiResponse } from "next";
import { previewTree } from "../../../util/moduleManifestUtil";

type Data = {
  previews?: [string, string[]][];
};

export default function showPreviewsIndex(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json({ previews: previewTree() });
}
