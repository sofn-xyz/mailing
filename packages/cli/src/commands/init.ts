import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { log } from "../util/serverLogger";
import { generateEmailsDirectory } from "../util/generators";
import { handler as previewHandler, PreviewArgs } from "./preview/preview";
import { defaults } from "../util/config";
import { resolve } from "path";
import { buildHandler } from "../util/buildHandler";

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
    default: defaults().typescript,
    description: "use Typescript",
    demandOption: true,
    boolean: true,
  },
  "emails-dir": {
    default: defaults().emailsDir,
    demandOption: true,
    description: "the directory to put your email templates in",
  },
  port: {
    default: defaults().port,
    demandOption: true,
    description: "what port to start the preview server on",
  },
  quiet: {
    default: defaults().quiet,
    demandOption: true,
    description: "quiet mode (don't prompt or open browser after starting)",
    boolean: true,
  },
  "scaffold-only": {
    default: defaults().scaffoldOnly,
    demandOption: true,
    description: "don't start the preview server",
    boolean: true,
  },
};

export const handler = buildHandler(async (argv: InitArguments) => {
  if (typeof argv.port !== "number") throw new Error("port option is not set");
  if (typeof argv.typescript !== "boolean")
    throw new Error("typescript option not set");
  if (undefined === argv.emailsDir) throw new Error("emailsDir option not set");

  if (existsSync(resolve(argv.emailsDir, "previews"))) {
    log("Using emails directory", argv.emailsDir);
  } else {
    const options = {
      isTypescript: argv.typescript,
      emailsDir: argv.emailsDir,
    };
    await generateEmailsDirectory(options);

    if (argv.scaffoldOnly) {
      return;
    }
  }

  const previewHandlerArgv: PreviewArgs = {
    port: argv.port,
    quiet: argv.quiet,
    emailsDir: argv.emailsDir,
    $0: argv.$0,
    _: argv._,
  };

  await previewHandler(previewHandlerArgv);
});
