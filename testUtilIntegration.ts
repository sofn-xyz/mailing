import { execSync } from "child_process";
import chalk from "chalk";
import cliPrisma from "./packages/cli/prisma";
import cliWeb from "./packages/web/prisma";

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

export async function truncateCliDatabase() {
  const truncateSql = CLI_TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  debug("Running TRUNCATE on ", process.env.DATABASE_URL_TEST);
  execSync(`echo '${truncateSql}' | psql ${process.env.DATABASE_URL_TEST}`, {
    stdio: "ignore",
  });

  await waitForEmptyCliDatabase();
}

/* waitForEmptyCliDatabase

Although TRUNCATE has been run, the database often has 
not finished the process of truncating the data when 
the tests run, which leads to flaky tests.

*/
async function waitForEmptyCliDatabase() {
  let recordsCount = 1;
  let iterations = 0;

  while (recordsCount > 0) {
    recordsCount = ((await cliPrisma.user.count()) +
      (await cliPrisma.apiKey.count()) +
      (await cliPrisma.organization.count())) as number;

    if (9 === iterations % 10)
      console.log(`Waiting for cli database tables to empty`);

    iterations += 1;
  }
}

export async function truncateWebDatabase() {
  const webTruncateSql = WEB_TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  debug("Running TRUNCATE on ", process.env.WEB_DATABASE_URL_TEST);
  execSync(
    `echo '${webTruncateSql}' | psql ${process.env.WEB_DATABASE_URL_TEST}`,
    { stdio: "ignore" }
  );

  await waitForEmptyWebDatabase();
}

/* waitForEmptyWebDatabase

Although TRUNCATE has been run, the database often has 
not finished the process of truncating the data when 
the tests run, which leads to flaky tests.

*/

async function waitForEmptyWebDatabase() {
  let recordsCount = 1;
  let iterations = 0;

  while (recordsCount > 0) {
    recordsCount = await cliWeb.newsletterSubscriber.count();

    if (9 === iterations % 10)
      console.log(`Waiting for cli database tables to empty`);

    iterations += 1;
  }
}
