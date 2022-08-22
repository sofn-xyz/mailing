import { existsSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { error, log } from "../log";
import { defaults, setConfig } from "../config";
import { exec } from "child_process";
import startPreviewServer from "./util/previewServer/start";
import { resolve } from "path";

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
  if (undefined === argv.typescript)
    throw new Error("typescript option is not set");
  if (!argv.port) throw new Error("port option is not set");

  setConfig({ emailsDir: argv.emailsDir });

  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  const { port, emailsDir } = argv;
  const server = await startPreviewServer({ emailsDir, port, quiet: true });

  const path = resolve(
    process.env.MM_DEV ? `${__dirname}/../` : `${__dirname}/next-src/`
  );

  log("Building next app at", path);

  const command = `NEXT_PUBLIC_STATIC=1 npx next build ${path} &&\
  rm -rf ${process.cwd()}/.mailing/.next &&\
  mkdir -p ${process.cwd()}/.mailing &&\
  mv ${path}/.next ${process.cwd()}/.mailing/.next`;

  const child = exec(command);
  // child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);

  child.on("close", (code, _signal) => {
    if (code === 0) {
      log("Success");
    } else {
      log("Build exited with error code", code);
    }
    log("command finished with code", code);
    server?.close();
    process.exit(0);
  });
};
