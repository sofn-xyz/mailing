import "dotenv/config";
import yargs from "yargs/yargs";
import * as preview from "./commands/preview";
import * as init from "./commands/init";

yargs(process.argv.slice(2))
  .command(preview)
  .command(init)
  .help().argv;
