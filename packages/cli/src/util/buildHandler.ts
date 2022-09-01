import { capture, shutdown as shutdownAnalytics } from "./postHog";
import { log } from "./log";
import { existsSync } from "fs-extra";
import { setConfig, writeDefaultConfigFile } from "./config";

type BuildHandlerOptions = {
  name: string;
  captureProperties?: (argv: any) => { subcommand?: string };
};

export function buildHandler(handler, options: BuildHandlerOptions) {
  return async (argv: any) => {
    try {
      // check if emails directory already exists
      if (!existsSync("./package.json")) {
        log("No package.json found. Please run from the project root.");
        return;
      }

      // TODO: add options for ever command
      setConfig({
        emailsDir: argv.emailsDir,
        quiet: argv.quiet,
        port: argv.port,
      });

      writeDefaultConfigFile();

      console.log("buildHandler argv is", argv);

      const captureOpts = {
        distinctId: argv.anonymousId,
        event: `${options.name} invoked`,
        properties: options.captureProperties
          ? options.captureProperties(argv)
          : undefined,
      };
      capture(captureOpts);
      await handler(argv);
    } finally {
      shutdownAnalytics();
    }
  };
}
