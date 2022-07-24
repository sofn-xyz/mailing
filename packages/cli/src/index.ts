import yargs from "yargs/yargs";
import * as preview from "./commands/preview";
import * as init from "./commands/init";
import * as freeze from "./commands/freeze";

yargs(process.argv.slice(2))
  .command(preview)
  .command(init)
  .command(freeze)
  .help().argv;
