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

  await truncateTables(cliPrisma);
}

export async function truncateWebDatabase() {
  debug("Running TRUNCATE on ", process.env.WEB_DATABASE_URL_TEST);

  await truncateTables(webPrisma);
}

export async function truncateDatabases() {
  return Promise.all([truncateCliDatabase(), truncateWebDatabase()]);
}

export async function disconnectDatabases() {
  await Promise.all([cliPrisma.$disconnect(), webPrisma.$disconnect()]);
  delete global.prismaMailingCli;
  delete global.prismaMailingWeb;
}

export interface PrismaTableName {
  table_name: string;
}

async function truncateTables(client: typeof cliPrisma | typeof webPrisma) {
  const tables =
    (await client.$queryRaw`SELECT table_name FROM information_schema.tables where table_schema = 'public' AND table_name NOT like '_prisma%';`) as PrismaTableName[];

  const joinedTableNames = tables
    .map((t: PrismaTableName) => `"${t.table_name}"`)
    .join(", ");

  const query = `TRUNCATE ${joinedTableNames} CASCADE;`;
  await client.$executeRawUnsafe(query);
}
