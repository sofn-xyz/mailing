import { existsSync } from "fs-extra";
import "dotenv/config";
import yargs from "yargs/yargs";
import * as preview from "./commands/preview";
import * as init from "./commands/init";
import { looksLikeTypescriptProject, MAILING_CONFIG_FILE } from "./config";
import { readFileSync } from "fs";

const config = existsSync(MAILING_CONFIG_FILE)
  ? JSON.parse(readFileSync(MAILING_CONFIG_FILE).toString())
  : {};

// prettier-ignore
yargs(process.argv.slice(2))
  .boolean(['quiet', 'typescript'])
  .config(config)
  .default('port', 3883)
  .default('emails-dir', "./emails")
  .default('typescript', looksLikeTypescriptProject())
  .command(preview)
  .command(init)
  .help()
  .argv;
