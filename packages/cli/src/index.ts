import { existsSync } from "fs-extra";
import "dotenv/config";
import yargs from "yargs/yargs";
import * as init from "./commands/init";
import * as preview from "./commands/preview/preview";
import * as exportPreviews from "./commands/exportPreviews";
import * as server from "./commands/server";
import { MAILING_CONFIG_FILE } from "./util/config";
import { readJSONverbose } from "./util/paths";

const config = existsSync(MAILING_CONFIG_FILE)
  ? readJSONverbose(MAILING_CONFIG_FILE)
  : {};

export const MAILING_VERSION = process.env.MAILING_VERSION;
export const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

// prettier-ignore
void yargs(process.argv.slice(2))
  .config(config)
  .command(init)
  .command(preview)
  .command(exportPreviews)
  .command(server)
  .help()
  .argv;
