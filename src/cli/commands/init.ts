import { cp } from "fs/promises";
import { existsSync } from "fs";
import prompts from "prompts";
import { execSync } from "child_process";
import { resolve } from "path";

const pathHasExistingEmailsDir = (path: string) => {
  // could do a better check of whether this exists
  return existsSync(path);
};

const getExistingEmailsDir = async () => {
  const appRoot = require("app-root-path");
  if (pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
    return appRoot.resolve("src/emails");
  }
  if (pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
    return appRoot.resolve("emails");
  }
  return null;
};

const getPotentialEmailsDirPath = async () => {
  const appRoot = require("app-root-path");
  if (existsSync(appRoot.resolve("src"))) {
    return appRoot.resolve("src/emails");
  } else {
    return appRoot.resolve("emails");
  }
};

const confirm = async (question: string) => {
  const response = await prompts({
    type: "confirm",
    name: "value",
    message: question,
    initial: true,
  });

  return response.value;
};

exports.command = ["$0", "init"];

exports.describe = "initialize by generating the emails directory";

exports.handler = async () => {
  // check if emails directory already exists
  const existingEmailsPath = await getExistingEmailsDir();
  if (existingEmailsPath) {
    // if it does abort
    console.log("Directory 'emails' found at", existingEmailsPath);
    return;
  } else {
    console.log("Emails directory not found.");
    const emailsPath = await getPotentialEmailsDirPath();
    const response = await prompts({
      type: "text",
      name: "path",
      message: `Where should we generate it?`,
      initial: emailsPath,
    });
    if (response.path) {
      // copy the init_template in!
      cp(resolve(__dirname, "../init_template"), response.path, {
        recursive: true,
      });
      console.log(`Generated your emails dir at ${response.path}`);
    } else {
      console.log("OK, bye!");
      return;
    }
  }

  const shouldStartPreviewMode = await confirm(
    `OK, you're all set. Start preview mode?`
  );

  if (shouldStartPreviewMode) {
    console.log("gb preview");
    execSync(`gb preview`);
  } else {
    console.log("Bye!");
  }
};
