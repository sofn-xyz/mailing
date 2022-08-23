import prompts from "prompts";
import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { error, log } from "../util/log";
import { getMailingAPIBaseURL } from "../util/paths";
import { generateEmailsDirectory } from "../util/generators";
import { handler as previewHandler, PreviewArgs } from "./preview/preview";
import { writeDefaultConfigFile, defaults, setConfig } from "../util/config";

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
    boolean: true,
  },
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory to put your email templates in",
  },
  port: {
    default: defaults().port,
    description: "what port to start the preview server on",
  },
  quiet: {
    default: defaults().quiet,
    descriptioin: "quiet mode (don't prompt or open browser after starting)",
    boolean: true,
  },
};

export const handler = async (argv: InitArguments) => {
  if (!argv.emailsDir) throw new Error("emailsDir option not set");
  if (undefined === argv.typescript)
    throw new Error("typescript option not set");
  if (undefined === argv.quiet) throw new Error("quiet option not set");

  setConfig({
    emailsDir: argv.emailsDir!,
    quiet: argv.quiet!,
    port: argv.port!,
  });

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

    if (!argv.quiet) {
      const emailResponse = await prompts({
        type: "text",
        name: "email",
        message:
          "enter your email for occasional updates about mailing (optional)",
      });
      const { email } = emailResponse;
      if (email?.length > 0) {
        log("great, talk soon");
        try {
          fetch(`${getMailingAPIBaseURL()}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } catch (e) {
          error(e);
        }
      } else {
        log("ok, no problem");
      }
    }
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
