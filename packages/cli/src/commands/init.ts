import { existsSync } from "fs-extra";
import prompts from "prompts";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { getExistingEmailsDir, getPackageJSON } from "../paths";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler } from "./preview";

function looksLikeTypescriptProject() {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

export const command = ["$0", "init"];

export const describe = "initialize mailing in your app";

export const handler = async (args: ArgumentsCamelCase<{ port?: number }>) => {
  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  if (!getExistingEmailsDir()) {
    const options = { isTypescript: true };
    await generateEmailsDirectory(options);
  }

  previewHandler(args);
};
