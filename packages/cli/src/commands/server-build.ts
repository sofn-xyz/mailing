import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { defaults, setConfig } from "../config";
import { exec } from "child_process";
import { log } from "../util/log";
import {
  bootstrapMailingDir,
  linkEmailsDirectory,
} from "./util/previewServer/setup";

export type ServerBuildArguments = ArgumentsCamelCase<{
  emailsDir?: string;
  port?: number;
  quiet?: boolean;
}>;

export const command = ["server build"];

export const describe = "build the mailing server";

export const builder = {
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

export const handler = async (argv: ServerBuildArguments) => {
  if (!argv.emailsDir) throw new Error("emailsDir option is not set");
  if (!argv.port) throw new Error("port option is not set");

  setConfig({ emailsDir: argv.emailsDir });

  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  await bootstrapMailingDir();
  await linkEmailsDirectory(argv.emailsDir);

  log("building .mailing...");

  const child = exec("npx next build .mailing");
  child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);

  child.on("close", (code, _signal) => {
    if (code === 0) {
      log("success");
    } else {
      log("build exited with error code", code);
    }
    process.exit(0);
  });
};
