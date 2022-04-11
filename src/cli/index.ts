#!/usr/bin/env node

import yargs from "yargs/yargs";

yargs(process.argv.slice(2)).commandDir("commands").help().argv;
