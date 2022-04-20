import { existsSync, copySync } from "fs-extra";
import prompts from "prompts";
import { resolve } from "path";
import log from "../log";
import { getExistingEmailsDir } from "../paths";

const getPotentialEmailsDirPath = () => {
  const appRoot = require("app-root-path");
  if (existsSync(appRoot.resolve("src"))) {
    return appRoot.resolve("src/emails");
  } else {
    return appRoot.resolve("emails");
  }
};

const looksLikeTypescriptProject = () => {
  const appRoot = require("app-root-path");

  if (existsSync(appRoot.resolve("tsconfig.json"))) {
    return true;
  }

  const pkgPath = appRoot.resolve("package.json");
  if (existsSync(pkgPath)) {
    const pkg = require(pkgPath);
    return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
  }

  return false;
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
    log("Directory 'emails' found at", existingEmailsPath);
  } else {
    log("Emails directory not found.");
    const emailsPath = getPotentialEmailsDirPath();
    const response = await prompts({
      type: "text",
      name: "path",
      message: "Where should we generate it?",
      initial: emailsPath,
    });
    if (response.path) {
      const ts = await prompts({
        type: "confirm",
        name: "value",
        message: "Are you using typescript?",
        initial: looksLikeTypescriptProject(),
      });
      // copy the emails dir template in!
      const path = `../generator_templates/${ts.value ? "ts" : "js"}/emails`;
      await copySync(resolve(__dirname, path), response.path, {
        overwrite: false,
      });
      log(`Generated your emails dir at ${response.path}`);
    } else {
      log("OK, bye!");
      return;
    }
  }

  const shouldStartPreviewMode = await confirm(
    `Looks good. Start preview mode?`
  );

  if (shouldStartPreviewMode) {
    log("mailing preview");
    require("./preview").handler();
  } else {
    log("Bye!");
  }
};
