import { existsSync } from "fs-extra";
import "dotenv/config";
import yargs from "yargs/yargs";
import * as init from "./commands/init";
import * as preview from "./commands/preview/preview";
import * as exportPreviews from "./commands/exportPreviews";
import * as server from "./commands/server";
import * as deploy from "./commands/deploy";
import { MAILING_CONFIG_FILE } from "./util/config";
import { readJSONverbose } from "./util/paths";

const config = existsSync(MAILING_CONFIG_FILE)
  ? readJSONverbose(MAILING_CONFIG_FILE)
  : {};

// prettier-ignore
yargs(process.argv.slice(2))
  .config(config)
  .command(init)
  .command(preview)
  .command(exportPreviews)
  .command(server)
  .command(deploy)
  .help()
  .argv;
