import chalk from "chalk";

const { DEBUG } = process.env;

let quiet = false;

export function setQuiet(v: boolean) {
  quiet = true;
}

export function log(message?: any, ...optionalParams: any[]) {
  if (quiet) return;
  console.log(chalk.blue("[mailing]"), message, ...optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
  console.error(chalk.red("[mailing]"), message, ...optionalParams);
}

export function debug(message?: any, ...optionalParams: any[]) {
  if (DEBUG) console.info(chalk.red("[mailing]"), message, ...optionalParams);
}

export default { log, debug, error };
