import { execSync } from "child_process";
import chalk from "chalk";

// logging
const { DEBUG } = process.env;

const PREFIX = "mailing tests";

export function error(message?: any, ...optionalParams: any[]) {
  console.error(chalk.red(PREFIX), message, ...optionalParams);
}

export function debug(message?: any, ...optionalParams: any[]) {
  if (DEBUG)
    console.info(chalk.yellowBright(PREFIX), message, ...optionalParams);
}

// database cleaning
const WEB_TABLE_NAMES = ["NewsletterSubscriber"];

const CLI_TABLE_NAMES = ["ApiKey", "Organization", "User"];

export function truncateCliDatabase() {
  const truncateSql = CLI_TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  debug("Running TRUNCATE on ", process.env.DATABASE_URL_TEST);
  execSync(`echo '${truncateSql}' | psql ${process.env.DATABASE_URL_TEST}`, {
    stdio: "ignore",
  });
}

export function truncateWebDatabase() {
  const webTruncateSql = WEB_TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  debug("Running TRUNCATE on ", process.env.WEB_DATABASE_URL_TEST);
  execSync(
    `echo '${webTruncateSql}' | psql ${process.env.WEB_DATABASE_URL_TEST}`,
    { stdio: "ignore" }
  );
}
