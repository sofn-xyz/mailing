import { log } from "./serverLogger";
import { existsSync } from "fs-extra";
import { setConfig, writeDefaultConfigFile } from "./config";

export function buildHandler(handler: (argv: any) => Promise<void>) {
  return async (argv: any) => {
    if (!existsSync("./package.json")) {
      log("No package.json found. Please run from the project root.");
      return;
    }

    // check for presence of options that apply to every command
    if (!argv.emailsDir) throw new Error("emailsDir option is not set");

    setConfig({
      emailsDir: argv.emailsDir,
      port: argv.port,
      quiet: argv.quiet,
    });

    writeDefaultConfigFile();

    await handler(argv);
  };
}
