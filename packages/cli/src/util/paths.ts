import { readFileSync, existsSync, readJSONSync } from "fs-extra";
import { resolve } from "path";
import { error } from "./log";

// appends /previews to emailsDir string if that directory exists
// otherwise, return null
export function getPreviewsDirectory(emailsDir: string): string | null {
  const previewsDirectory = resolve(emailsDir, "previews");

  return existsSync(previewsDirectory) ? previewsDirectory : null;
}

export function readPackageJSON() {
  return readJSONverbose("./package.json");
}

export function readJSONverbose(filename: string) {
  try {
    return readJSONSync(filename);
  } catch (err) {
    error(`expected ${filename} to exist and be valid JSON`);
    throw err;
  }
}

export function getMailingAPIBaseURL() {
  if (process.env.MM_DEV) {
    return `http://localhost:3000`;
  } else {
    return "https://www.mailing.run";
  }
}
