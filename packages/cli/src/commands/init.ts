import { existsSync } from "fs-extra";
import prompts from "prompts";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { getExistingEmailsDir, getPackageJSON } from "../paths";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler } from "./preview";

export type CliArguments = ArgumentsCamelCase<{
  port?: number;
  "emails-dir"?: "./emails" | "./src/emails";
}>;

function looksLikeTypescriptProject(): boolean {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

export const command = ["$0", "init"];

export const describe = "initialize mailing in your app";

export const builder = {
  typescript: {
    description: "use Typescript",
  },
  "emails-dir": {
    description:
      "where to put your emails - ./emails or ./src/emails are currently the only valid options",
  },
};

function writeConfigFile() {
  const MAILING_CONFIG_FILE = "./mailing.config.json";
  const prettier = require("prettier");

  if (!existsSync(MAILING_CONFIG_FILE)) {
    const fs = require("fs");

    const configJsonString = prettier.format(
      JSON.stringify({
        typescript: looksLikeTypescriptProject(),
        emailsDir: "./emails",
      }),
      { parser: "json", printWidth: 0 }
    );

    try {
      fs.writeFileSync(MAILING_CONFIG_FILE, configJsonString);
    } catch (err) {
      console.error(err);
    }
  }
}

export const handler = async (args: CliArguments) => {
  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  writeConfigFile();

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
        initial: looksLikeTypescriptProject(),
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
