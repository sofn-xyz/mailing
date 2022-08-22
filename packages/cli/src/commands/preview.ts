import { ArgumentsCamelCase } from "yargs";
import { defaults, setConfig } from "../config";
import startPreviewServer from "./util/startPreviewServer";

export type PreviewArgs = ArgumentsCamelCase<{
  port?: number;
  quiet?: boolean;
  emailsDir?: string;
}>;

export const command = "preview";

export const describe = "start the email preview server";

export const builder = {
  port: {
    default: defaults().port,
    description: "what port to start the preview server on",
  },
  quiet: {
    default: defaults().quiet,
    descriptioin: "quiet mode (don't open browser after starting)",
    boolean: true,
  },
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory of your email templates",
  },
};

export const handler = async (argv: PreviewArgs) => {
  if (!argv.emailsDir) throw new Error("emailsDir option is not set");
  if (undefined === argv.port) throw new Error("port option is not set");
  if (undefined === argv.quiet) throw new Error("quiet option is not set");

  setConfig({ emailsDir: argv.emailsDir });

  const { port, emailsDir, quiet } = argv;

  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  await startPreviewServer({ emailsDir, port, quiet });
};
