import { existsSync, readFileSync } from "fs-extra";
import { resolve } from "path";

export function getPreviewsDirectory(emailsDir: string) {
  return resolve(emailsDir, "previews");
}

export function getPackageJSON() {
  return JSON.parse(readFileSync("./package.json").toString());
}
