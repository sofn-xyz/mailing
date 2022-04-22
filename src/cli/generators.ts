import { copySync, existsSync } from "fs-extra";
import { resolve } from "path";
import prompts from "prompts";
import { getExistingEmailsDir } from "../paths";
import log from "./log";

export function getPagesDirPath() {
  if (existsSync("./pages")) {
    return resolve("./pages");
  } else if (existsSync("./src/pages")) {
    return resolve("./src/pages");
  }
  return null;
}

function getPotentialEmailsDirPath() {
  if (existsSync("./src")) {
    return resolve("./src/emails");
  } else {
    return resolve("./emails");
  }
}

export async function generateNextPages({
  isTypescript,
}: {
  isTypescript: boolean;
}): Promise<boolean> {
  const pagesPath = getPagesDirPath();

  if (!pagesPath) {
    log("Could not find pages directory. Aborting");
    return false;
  }

  if (existsSync(resolve(pagesPath, "mailing"))) {
    log(`Pages for mailing found at ${resolve(pagesPath, "mailing")}`);
    return false;
  }

  const response = await prompts({
    type: "text",
    name: "path",
    message: "Where should we generate your pages?",
    initial: pagesPath,
  });
  if (response.path) {
    // copy the emails dir template in!
    const path = `generator_templates/${isTypescript ? "ts" : "js"}/pages`;
    await copySync(resolve(__dirname, path), response.path, {
      overwrite: false,
    });
    log(`Generated your pages at ${response.path}`);
    return true;
  } else {
    log("OK, bye!");
    return false;
  }
}

export async function generateEmailsDirectory({
  isTypescript,
}: {
  isTypescript: boolean;
}): Promise<boolean> {
  const existingEmailsPath = getExistingEmailsDir();
  if (existingEmailsPath) {
    // if it does abort
    log(`Emails directory found at ${existingEmailsPath}`);
    return false;
  }

  log("Emails directory not found.");
  const emailsPath = getPotentialEmailsDirPath();
  const response = await prompts({
    type: "text",
    name: "path",
    message: "Where should we generate it?",
    initial: emailsPath,
  });
  if (response.path) {
    // copy the emails dir template in!
    const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
    await copySync(resolve(__dirname, path), response.path, {
      overwrite: false,
    });
    log(`Generated your emails dir at ${response.path}`);
    return true;
  } else {
    log("OK, bye!");
    return false;
  }
}
