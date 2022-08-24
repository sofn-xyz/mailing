import chalk from "chalk";
import { getConfig } from "./config";

const { DEBUG } = process.env;

const PREFIX = "mailing";

export function log(message?: any, ...optionalParams: any[]) {
  if (getConfig().quiet && !debug) return;
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
  if (getConfig().quiet && !debug) return;
  console.log(message, ...optionalParams);
}
