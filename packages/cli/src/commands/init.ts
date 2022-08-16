import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { generateEmailsDirectory } from "../generators";
import { handler as previewHandler, PreviewArgs } from "./preview";
import { writeDefaultConfigFile, DEFAULTS, setConfig } from "../config";
import { pick } from "../utils";

export type InitArguments = ArgumentsCamelCase<{
  emailsDir?: string;
  typescript?: boolean;
  port?: number;
  quiet?: boolean;
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

export const handler = async (argv: InitArguments) => {
  if (!argv.emailsDir) throw new Error("emailsDir option is not set");
  if (undefined === argv.typescript)
    throw new Error("typescript option is not set");

  setConfig({ emailsDir: argv.emailsDir });

  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  writeDefaultConfigFile();

  if (!existsSync(argv.emailsDir)) {
    const options = {
      isTypescript: argv.typescript,
      emailsDir: argv.emailsDir,
    };
    await generateEmailsDirectory(options);
  }

  const previewHandlerArgv: PreviewArgs = {
    port: argv.port,
    quiet: argv.quiet,
    emailsDir: argv.emailsDir,
    $0: argv.$0,
    _: argv._,
  };

  previewHandler(previewHandlerArgv);
};
