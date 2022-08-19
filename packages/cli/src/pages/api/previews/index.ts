import type { NextApiRequest, NextApiResponse } from "next";
import moduleManifest from "../../../moduleManifest";

type Data = {
  previews?: [string, string[]][];
};

export default function showPreviewsIndex(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const previewModules = moduleManifest.previews;
  const previewCollections = Object.keys(previewModules);
  const previews: [string, string[]][] = previewCollections.map((p) => {
    return [
      p,
      Object.keys(previewModules[p as keyof typeof previewModules]).sort(),
    ];
  });

  res.json({ previews });
}
