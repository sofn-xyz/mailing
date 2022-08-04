import { existsSync } from "fs-extra";
import prompts from "prompts";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { getExistingEmailsDir, getPackageJSON } from "../paths";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler } from "./preview";

export type CliArguments = ArgumentsCamelCase<{
  port?: number;
  typescript?: "true" | "false" | boolean;
}>;

function looksLikeTypescriptProject() {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

export const command = ["$0", "init"];

export const describe = "initialize mailing in your app";

export const handler = async (args: CliArguments) => {
  console.log(args);
  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  if (!getExistingEmailsDir()) {
    let isTypescript;

    if ("false" === args.typescript) {
      isTypescript = false;
    } else if (args.typescript) {
      isTypescript = true;
    } else {
      const ts = await prompts({
        type: "confirm",
        name: "value",
        message: "Are you using typescript?",
        initial: looksLikeTypescriptProject(),
      });
      isTypescript = ts.value;
    }

    const options = { isTypescript: isTypescript };
    await generateEmailsDirectory(options);
  }

  previewHandler(args);
};
