import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { getExistingEmailsDir, getPackageJSON } from "../paths";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler } from "./preview";
import { writeDefaultConfigFile, DEFAULTS } from "../config";

export type CliArguments = ArgumentsCamelCase<{
  port: number;
  "emails-dir": string;
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
    description: "the directory to put your email templates",
  },
  port: {
    default: DEFAULTS.port,
    description: "what port to start the preview server on",
  },
  quiet: {
    default: DEFAULTS.quiet,
    descriptioin: "quiet mode (don't open browser after starting)",
    boolean: true,
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
    const options = {
      isTypescript: args.isTypescript,
      emailsDir: args["emails-dir"],
    };
    // @ts-ignore
    await generateEmailsDirectory(options);
  }

  // @ts-ignore
  previewHandler(args);
};
