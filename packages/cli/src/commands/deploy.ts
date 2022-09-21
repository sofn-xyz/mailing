import { existsSync, writeFileSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { error, log, logPlain, debug } from "../util/log";
import { defaults } from "../util/config";
import { buildHandler } from "../util/buildHandler";
import { execSync } from "child_process";
import { resolve } from "path";
import assert from "node:assert";

export type DeployArgs = ArgumentsCamelCase<{
  emailsDir?: string;
  anonymousId?: string | null;
}>;

export const command = "deploy";

export const builder = {
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory of your email templates",
  },
};

export const describe = "deploy your preview server using the vercel cli";

const VERCEL_CONFIG_PATH = resolve("./mailing.vercel.json");
const VERCEL_CONFIG = {
  framework: "nextjs",
  buildCommand: "mailing server build",
  outputDirectory: ".mailing/.next",
};

export const handler = buildHandler(
  async (argv: DeployArgs) => {
    let exitCode = 0;
    log("Deploying your mailing preview server to vercel...");

    // write vercel config if it's not there
    // don't overwrite so users can customize
    if (!existsSync("./mailing.vercel.json")) {
      log(
        `writing maililng.vercel.json config file to ${VERCEL_CONFIG_PATH}...`
      );
      writeFileSync(resolve(VERCEL_CONFIG_PATH), JSON.stringify(VERCEL_CONFIG));
      logPlain("done");
    }

    try {
      const version = execSync("npx --yes vercel --version", {
        stdio: "pipe",
      }).toString();
      const majorVersion = parseFloat(version.split(".")[0]);
      assert(majorVersion >= 28);
    } catch (e) {
      debug("error: ", e);
      exitCode = 1;
    }

    if (exitCode) {
      error(
        "Please upgrade your vercel CLI to version 28+ https://vercel.com/docs/cli#updating-vercel-cli"
      );
      process.exit(exitCode);
    }

    // deploy with defaults
    try {
      execSync(`npx vercel --yes --local-config=${VERCEL_CONFIG_PATH}`, {
        stdio: "inherit",
      });
    } catch (e) {
      debug("error: ", e);
      exitCode = 1;
    }

    if (exitCode) {
      error("vercel deploy failed");
      process.exit(exitCode);
    }
  },
  {
    captureOptions: () => {
      return { event: "deploy invoked" };
    },
  }
);
