import chalk from "chalk";

const { DEBUG } = process.env;

export function log(message?: any, ...optionalParams: any[]) {
  console.log(chalk.blue("[mailing]"), message, ...optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
  console.error(chalk.red("[mailing]"), message, ...optionalParams);
}

export function debug(message?: any, ...optionalParams: any[]) {
  if (DEBUG) console.info(chalk.red("[mailing]"), message, ...optionalParams);
}

export default { log, debug, error };
