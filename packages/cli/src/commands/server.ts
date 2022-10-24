import { ArgumentsCamelCase } from "yargs";
import { defaults } from "../util/config";
import { execSync } from "child_process";
import { log } from "../util/log";
import {
  bootstrapMailingDir,
  linkEmailsDirectory,
} from "./preview/server/setup";
import { buildHandler } from "../util/buildHandler";
import { lintEmailsDirectory } from "./util/lintEmailsDir";

export type ServerArguments = ArgumentsCamelCase<{
  emailsDir?: string;
  port?: number;
  quiet?: boolean;
  subcommand?: string;
  anonymousId?: string | null;
}>;

export const command = ["server [subcommand]"];

export const describe = "build and start the mailing server";

export const builder = {
  subcommand: {
    describe: "'build' or 'start', blank does both",
  },
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory to look for your email templates in",
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

export const handler = buildHandler(
  async (argv: ServerArguments) => {
    if (undefined === argv.port) throw new Error("port option is not set");
    if (undefined === argv.quiet) throw new Error("quiet option is not set");
    if (undefined === argv.emailsDir)
      throw new Error("emailsDir option is not set");

    // link files
    await bootstrapMailingDir();
    await lintEmailsDirectory(argv.emailsDir);
    await linkEmailsDirectory(argv.emailsDir);

    // "build" subcommand + default
    if (argv.subcommand !== "start") {
      log("building .mailing...");

      execSync("cd .mailing && npx prisma generate", {
        stdio: "inherit",
      });

      if (process.env.MAILING_DATABASE_URL)
        execSync("cd .mailing && npx prisma migrate deploy", {
          stdio: "inherit",
        });

      execSync("npx next build .mailing", {
        stdio: "inherit",
      });
    }

    // "start" subcommand + default
    if (argv.subcommand !== "build") {
      log("starting .mailing...");
      execSync("npx next start .mailing", { stdio: "inherit" });
    }
  },
  {
    captureOptions: (argv) => {
      return {
        event: "server invoked",
        properties: { subcommand: argv.subcommand },
      };
    },
  }
);
