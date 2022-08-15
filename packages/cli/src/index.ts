// @ts-nocheck

import { existsSync } from "fs-extra";
import "dotenv/config";
import yargs from "yargs/yargs";
import * as init from "./commands/init";
import * as preview from "./commands/preview";
import * as exportPreviews from "./commands/exportPreviews";
import { MAILING_CONFIG_FILE } from "./config";
import { readFileSync } from "fs";

const config = existsSync(MAILING_CONFIG_FILE)
  ? JSON.parse(readFileSync(MAILING_CONFIG_FILE).toString())
  : {};

// prettier-ignore
yargs(process.argv.slice(2))
  .config(config)
  .command(init)
  .command(preview)
  .command(exportPreviews)
  .help()
  .argv;
