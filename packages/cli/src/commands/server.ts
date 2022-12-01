import { ArgumentsCamelCase } from "yargs";
import { defaults } from "../util/config";
import { execSync } from "child_process";
import { log } from "../util/serverLogger";
import {
  bootstrapMailingDir,
  linkEmailsDirectory,
} from "./preview/server/setup";
import { buildHandler } from "../util/buildHandler";

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

    log("bootstrapping your Mailing server in .mailing...");
    await bootstrapMailingDir();
    await linkEmailsDirectory(argv.emailsDir);

    const shouldStart = argv.subcommand === "start" || !argv.subcommand;
    const shouldBuild = argv.subcommand === "build" || !argv.subcommand;

    // "build" subcommand + default
    if (shouldBuild) {
      log("building .mailing...");

      execSync("cd .mailing && npx prisma generate", {
        stdio: "inherit",
      });

      if (process.env.MAILING_DATABASE_URL)
        execSync("cd .mailing && npx prisma migrate deploy", {
          stdio: "inherit",
        });

      execSync("cd .mailing && npx next build", {
        stdio: "inherit",
      });
    }

    // "start" subcommand + default
    if (shouldStart) {
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
