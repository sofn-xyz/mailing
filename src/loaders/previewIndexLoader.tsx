import { resolve } from "path";
import { getPreviewsDirectory } from "../paths";
import { readdirSync } from "fs-extra";
import { PreviewIndexProps } from "../components/PreviewIndex";

export async function previewIndexLoader(): Promise<PreviewIndexProps> {
  const previewsDir = getPreviewsDirectory();

  if (!previewsDir) {
    return { previews: [] };
  }

  require.context("../../../../../emails", true, /\.tsx$/);
  // console.log(previewModules);

  // const previews = previewModules.map((m) => {
  //   return [m.]
  // })

  const previewCollections = readdirSync(previewsDir).filter(
    (path) => !/^\./.test(path)
  );

  const previews = previewCollections.map((p) => {
    const previewModule = require("/Users/petersugihara/test-app-ts/emails/previews/MyFirstEmail");
    return [p, Object.keys(previewModule)] as [string, string[]];
  });

  return { previews };
}
