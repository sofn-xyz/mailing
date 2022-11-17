import chalk from "chalk";

const { DEBUG, NODE_ENV } = process.env;

const PREFIX = "mailing";

export function log(message?: any, ...optionalParams: any[]) {
  console.log(chalk.white(PREFIX), message, ...optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
  // e.g. when there is a jest test like instrumentHtml.test.ts
  // that intentionally throws an error, don't log from a
  // try-catch that logs and re-raises the error
  if ("test" === NODE_ENV) return;
  console.error(chalk.red(PREFIX), message, ...optionalParams);
}

export function debug(message?: any, ...optionalParams: any[]) {
  if (DEBUG)
    console.info(chalk.yellowBright(PREFIX), message, ...optionalParams);
}

export function logPlain(message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams);
}
