#!/usr/bin/env node

import yargs from "yargs/yargs";
import prompts from "prompts";

// const getEmailsPath() => {

// }

yargs(process.argv.slice(2))
  .command(
    ["$0", "init"],
    "initialize gigaben by generating the emails directory",
    () => {},
    (argv) => {
      // check if emails directory already exists
      // if it does abort
      // if not, generate it at src/emails or emails if there's no src dir
      // start preview mode
    }
  )
  .command(
    ["preview"],
    "start the email preview server",
    () => {},
    (argv) => {
      // find the emails directory
      // if it doesn't exist, ask if we should init
      // if it does exist, boot the preview server and open the previews in a browser
    }
  )
  .command(["generate"], "generate a new email template")
  .help().argv;

console.log("gigaben!");
