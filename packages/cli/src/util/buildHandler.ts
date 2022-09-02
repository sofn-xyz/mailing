import { capture, shutdown as shutdownAnalytics } from "./postHog";
import { log, debug } from "./log";
import { existsSync } from "fs-extra";
import { setConfig, writeDefaultConfigFile } from "./config";

type BuildHandlerOptions = {
  captureOptions?: (argv: any) => {
    event: string;
    properties?: { subcommand?: string }; // later could give this the real type
  };
};

export function buildHandler(handler, options: BuildHandlerOptions) {
  return async (argv: any) => {
    try {
      // check if emails directory already exists
      if (!existsSync("./package.json")) {
        log("No package.json found. Please run from the project root.");
        return;
      }

      // check for presence of options that apply to every command
      if (!argv.emailsDir) throw new Error("emailsDir option is not set");
      if (undefined === argv.quiet) throw new Error("quiet option is not set");

      // TODO: add options for ever command
      setConfig({
        emailsDir: argv.emailsDir!,
        port: argv.port,
        quiet: argv.quiet,
      });

      writeDefaultConfigFile();

      debug("buildHandler argv is", argv);

      const captureOpts = {
        distinctId: argv.anonymousId,
        ...options.captureOptions(argv),
      };

      capture(captureOpts);
      await handler(argv);
    } finally {
      shutdownAnalytics();
    }
  };
}
