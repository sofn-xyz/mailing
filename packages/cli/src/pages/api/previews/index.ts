import type { NextApiRequest, NextApiResponse } from "next";
import moduleManifest from "../../../../moduleManifest";
import { log, error } from "../../../log";

type Data = {
  previews?: [string, string[]][];
};

export default function showPreviewsIndex(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const previewCollections = Object.keys(moduleManifest);
  const previews: [string, string[]][] = previewCollections.map((p) => {
    return [p, Object.keys(moduleManifest[p]).sort()];
  });

  res.json({ previews });
}
