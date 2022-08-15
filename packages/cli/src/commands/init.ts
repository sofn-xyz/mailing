import { existsSync } from "fs-extra";
import prompts from "prompts";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { getExistingEmailsDir, getPackageJSON } from "../paths";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler } from "./preview";
import { writeDefaultConfigFile, DEFAULTS } from "../config";

export type CliArguments = ArgumentsCamelCase<{
  port?: number;
  "emails-dir"?: "./emails" | "./src/emails";
}>;

export const command = ["$0", "init"];

export const describe = "initialize mailing in your app";

export const builder = {
  typescript: {
    default: DEFAULTS.typescript,
    description: "use Typescript",
    boolean: true,
  },
  "emails-dir": {
    default: DEFAULTS.emailsDir,
    description: "the directory to put your emails",
  },
};

export const handler = async (args: CliArguments) => {
  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  writeDefaultConfigFile();

  if (!getExistingEmailsDir()) {
    // options: assign isTypescript
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
      });
      isTypescript = ts.value;
    }

    const options = {
      isTypescript: isTypescript,
      emailsDir: args["emails-dir"],
    };
    await generateEmailsDirectory(options);
  }

  previewHandler(args);
};
