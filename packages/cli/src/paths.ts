import { readFileSync } from "fs-extra";
import { resolve } from "path";

export function getPreviewsDirectory(emailsDir: string) {
  return resolve(emailsDir, "previews");
}

export function readPackageJSON() {
  return JSON.parse(readFileSync("./package.json").toString());
}
