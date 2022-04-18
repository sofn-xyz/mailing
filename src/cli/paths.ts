import fs from "fs";
import { resolve } from "path";

function pathHasExistingEmailsDir(path: string) {
  // could do a better check of whether this exists
  return fs.existsSync(path);
}

export function getExistingEmailsDir() {
  const appRoot = require("app-root-path");
  if (pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
    return appRoot.resolve("src/emails");
  }
  if (pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
    return appRoot.resolve("emails");
  }
  return null;
}

export function getPreviewsDirectory() {
  const existingEmailsDir = getExistingEmailsDir();
  return existingEmailsDir ? resolve(existingEmailsDir, "previews") : null;
}
