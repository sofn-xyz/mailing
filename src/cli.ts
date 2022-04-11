#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

const pkg = require("../package.json");

program.name(pkg.name).description(pkg.description).version(pkg.version);

// const argv = yargs(process.argv.slice(2))
//   .command(
//     ["$0", "init"],
//     "initialize reaction-mailer",
//     () => {},
//     (argv) => {
//       console.log("this command will be run by default");
//     }
//   )
//   .help().argv;

program.parse();
