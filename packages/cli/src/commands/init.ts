import prompts from "prompts";
import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { error, log } from "../util/log";
import { getMailingAPIBaseURL } from "../util/paths";
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
  anonymousId?: string | null;
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
};

export const handler = buildHandler(
  async (argv: InitArguments) => {
    if (typeof argv.port !== "number")
      throw new Error("port option is not set");
    if (typeof argv.typescript !== "boolean")
      throw new Error("typescript option not set");

    if (!existsSync(resolve(argv.emailsDir!, "previews"))) {
      const options = {
        isTypescript: argv.typescript,
        emailsDir: argv.emailsDir!,
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
      anonymousId: argv.anonymousId,
      $0: argv.$0,
      _: argv._,
    };

    previewHandler(previewHandlerArgv);
  },
  {
    captureOptions: () => {
      return { event: "init invoked" };
    },
  }
);
