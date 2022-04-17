import { cp } from "fs/promises";
import { existsSync } from "fs";
import prompts from "prompts";
import { resolve } from "path";
import { getExistingEmailsDir } from "../paths";

const getPotentialEmailsDirPath = () => {
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

export const command = ["$0", "init"];

export const describe = "initialize by generating the emails directory";

export const handler = async () => {
  // check if emails directory already exists
  const existingEmailsPath = getExistingEmailsDir();
  if (existingEmailsPath) {
    // if it does abort
    console.log("Directory 'emails' found at", existingEmailsPath);
  } else {
    console.log("Emails directory not found.");
    const emailsPath = getPotentialEmailsDirPath();
    const response = await prompts({
      type: "text",
      name: "path",
      message: "Where should we generate it?",
      initial: emailsPath,
    });
    if (response.path) {
      // copy the init_template in!
      console.log(
        `resolve(__dirname, "../init_template/")`,
        resolve(__dirname, "../init_template/")
      );
      await cp(resolve(__dirname, "../init_template/emails"), response.path, {
        recursive: true,
      });
      console.log(`Generated your emails dir at ${response.path}`);
    } else {
      console.log("OK, bye!");
      return;
    }
  }

  const shouldStartPreviewMode = await confirm(
    `Looks good. Start preview mode?`
  );

  if (shouldStartPreviewMode) {
    console.log("gb preview");
    require("./preview").handler();
  } else {
    console.log("Bye!");
  }
};
