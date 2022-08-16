import { existsSync } from "fs";
import { readFileSync } from "fs-extra";
import { resolve } from "path";

// appends /previews to emailsDir string if that directory exists
// otherwise, return null
export function getPreviewsDirectory(emailsDir: string): string | null {
  const previewsDirectory = resolve(emailsDir, "previews");

  return existsSync(previewsDirectory) ? previewsDirectory : null;
}

export function readPackageJSON() {
  return JSON.parse(readFileSync("./package.json").toString());
}

export function getMailingAPIBaseURL() {
  if (process.env.MM_DEV) {
    return `http://localhost:3000`;
  } else {
    return "https://www.mailing.run";
  }
}
