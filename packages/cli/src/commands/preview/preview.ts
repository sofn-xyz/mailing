import { ArgumentsCamelCase } from "yargs";
import { buildHandler } from "../../util/buildHandler";
import { defaults } from "../../util/config";
import startPreviewServer from "./server/start";

export type PreviewArgs = ArgumentsCamelCase<{
  port?: number;
  quiet?: boolean;
  emailsDir?: string;
  anonymousId?: string | null;
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
    description: "quiet mode (don't open browser after starting)",
    boolean: true,
  },
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory of your email templates",
  },
};

export const handler = buildHandler(
  async (argv: PreviewArgs) => {
    if (undefined === argv.port) throw new Error("port option is not set");
    if (undefined === argv.quiet) throw new Error("quiet option is not set");

    await startPreviewServer();
  },
  {
    captureOptions: () => {
      return { event: "preview invoked" };
    },
  }
);
