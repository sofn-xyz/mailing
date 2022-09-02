import { capture, shutdown as shutdownAnalytics } from "./postHog";
import { log } from "./log";
import { existsSync } from "fs-extra";
import { setConfig, writeDefaultConfigFile } from "./config";

type CaptureProperties = {
  subcommand?: string;
  nodeEnv?: string;
};

type BuildHandlerOptions = {
  captureOptions?: (argv: any) => {
    event: string;
    properties?: CaptureProperties;
  };
};

export function buildHandler(
  handler: (argv: any) => void,
  options: BuildHandlerOptions
) {
  return async (argv: any) => {
    try {
      if (!existsSync("./package.json")) {
        log("No package.json found. Please run from the project root.");
        return;
      }

      // check for presence of options that apply to every command
      if (!argv.emailsDir) throw new Error("emailsDir option is not set");

      setConfig({
        emailsDir: argv.emailsDir!,
        port: argv.port,
        quiet: argv.quiet,
      });

      writeDefaultConfigFile();

      if (options.captureOptions) {
        const captureOpts = {
          distinctId: argv.anonymousId,
          ...options.captureOptions(argv),
        };

        if (!captureOpts.properties) captureOpts.properties = {};
        captureOpts.properties.nodeEnv = process.env.NODE_ENV;

        capture(captureOpts);
      }

      await handler(argv);
    } finally {
      shutdownAnalytics();
    }
  };
}
