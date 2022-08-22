import chalk from "chalk";

const { DEBUG } = process.env;

const PREFIX = "mailing";

let quiet = false;

export function setQuiet(v: boolean) {
  quiet = true;
}

export function log(message?: any, ...optionalParams: any[]) {
  if (quiet && !debug) return;
  console.log(chalk.white(PREFIX), message, ...optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
  console.error(chalk.red(PREFIX), message, ...optionalParams);
}

export function debug(message?: any, ...optionalParams: any[]) {
  if (DEBUG)
    console.info(chalk.yellowBright(PREFIX), message, ...optionalParams);
}

export function logPlain(message?: any, ...optionalParams: any[]) {
  if (quiet && !debug) return;
  console.log(message, ...optionalParams);
}

export default { log, debug, error };
