import { readdir } from "fs/promises";
import prompts from "prompts";

const LIBRARY_REGEX = /emails\.(tsx|jsx)/;

const pathHasExistingEmailsDir = async (path: string) => {
  try {
    const contents = await readdir(path);
    if (contents.some((i) => LIBRARY_REGEX.test(i))) {
      return true;
    }
  } catch {}
  return false;
};

const getExistingEmailsDir = async () => {
  const appRoot = require("app-root-path");
  if (await pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
    return appRoot.resolve("src/emails");
  }
  if (await pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
    return appRoot.resolve("emails");
  }
  return null;
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
    console.log("Emails directory found at", existingEmailsPath);
    return;
  }

  const shouldGenerate = await confirm(
    `Emails directory not found. Generate emails directory at emailsPath?`
  );

  if (shouldGenerate) {
    console.log("cool, copying");
  }

  const shouldStartPreviewMode = await confirm(
    `OK, you're all set. Start preview mode?`
  );

  if (shouldStartPreviewMode) {
    console.log("TODO: starting...");
  } else {
    console.log("Bye!");
  }
};
