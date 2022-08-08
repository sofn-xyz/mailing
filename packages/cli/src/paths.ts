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

export function getPreviewsDirectory() {
  const existingEmailsDir = getExistingEmailsDir();
  return existingEmailsDir ? resolve(existingEmailsDir, "previews") : null;
}

export function getPackageJSON() {
  return JSON.parse(readFileSync("./package.json").toString());
}

export function getMailingAPIBaseURL() {
  if (process.env.MM_DEV) {
    return `http://localhost:3000`;
  } else {
    return "https://www.mailing.run";
  }
}
