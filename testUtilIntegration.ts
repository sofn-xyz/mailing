import chalk from "chalk";
import cliPrisma from "./packages/cli/prisma";
import webPrisma from "./packages/web/prisma";

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

export async function truncateCliDatabase() {
  debug("Running TRUNCATE on ", process.env.MAILING_DATABASE_URL_TEST);

  await cliPrisma.apiKey.deleteMany({});
  await cliPrisma.user.deleteMany({});
  await cliPrisma.organization.deleteMany({});
}

export async function truncateWebDatabase() {
  debug("Running TRUNCATE on ", process.env.WEB_DATABASE_URL_TEST);

  await webPrisma.newsletterSubscriber.deleteMany({});
}

export async function truncateDatabases() {
  return Promise.all([truncateCliDatabase(), truncateWebDatabase()]);
}

export async function disconnectDatabases() {
  await Promise.all([cliPrisma.$disconnect(), webPrisma.$disconnect()]);
  delete global.prisma;
  delete global.prismaWeb;
}
