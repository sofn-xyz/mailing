import { copySync, existsSync } from "fs-extra";
import { relative, resolve } from "path";
import tree from "tree-node-cli";
import { getExistingEmailsDir } from "./paths";
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
  const existingEmailsPath = getExistingEmailsDir();
  if (existingEmailsPath) {
    // if it does abort
    log(`Emails directory found at ${existingEmailsPath}`);
    return false;
  }

  const targetEmailsDir = emailsDir;

  // copy the emails dir template in!
  const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
  await copySync(resolve(__dirname, path), targetEmailsDir, {
    overwrite: false,
  });
  log(
    `Generated your emails dir at ${targetEmailsDir}:\n${tree(targetEmailsDir)}`
  );

  return true;
}
