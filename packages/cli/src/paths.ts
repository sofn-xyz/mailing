import { existsSync, readFileSync } from "fs-extra";
import { resolve } from "path";

function pathHasExistingEmailsDir(path: string) {
  // could do a better check of whether this exists
  return existsSync(path);
}

export function getExistingEmailsDir() {
  if (pathHasExistingEmailsDir("./src/emails")) {
    return resolve("./src/emails");
  }
  if (pathHasExistingEmailsDir("./emails")) {
    return resolve("./emails");
  }
  return null;
}

export function getPreviewsDirectory(emailsDir: string) {
  return resolve(emailsDir, "previews");
}

export function getPackageJSON() {
  return JSON.parse(readFileSync("./package.json").toString());
}
