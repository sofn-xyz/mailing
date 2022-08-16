import { copySync, existsSync } from "fs-extra";
import { resolve } from "path";
import tree from "tree-node-cli";
import { log } from "./log";

function getPotentialEmailsDirPath() {
  if (existsSync("./src")) {
    return resolve("./src/emails");
  } else {
    return resolve("./emails");
  }
}

export async function generateEmailsDirectory({
  isTypescript,
  emailsDir,
}: {
  isTypescript: boolean;
  emailsDir: string;
}): Promise<boolean> {
  if (existsSync(emailsDir)) {
    // if it does abort
    log(`Emails directory found at ${emailsDir}`);
    return false;
  }

  // copy the emails dir template in!
  const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
  await copySync(resolve(__dirname, path), emailsDir, {
    overwrite: false,
  });
  log(`Generated your emails dir at ${emailsDir}:\n${tree(emailsDir)}`);

  return true;
}
