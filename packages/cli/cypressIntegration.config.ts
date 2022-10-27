import { defineConfig } from "cypress";
import cliPrisma from "./prisma";

const resetDb = async () => {
  await truncateDatabases();
  return null;
};

export default defineConfig({
  e2e: {
    specPattern: "**/*.cy.integration.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3883",
    setupNodeEvents(on, _config) {
      on("task", {
        "db:reset": resetDb,
      });
    },
  },
});

// copied from testUtilIntegration.ts

interface PrismaTableName {
  table_name: string;
}

export async function truncateCliDatabase() {
  await truncateTables(cliPrisma);
}

export async function truncateWebDatabase() {
  // await truncateTables(webPrisma);
}

export async function truncateDatabases() {
  return Promise.all([truncateCliDatabase(), truncateWebDatabase()]);
}

async function truncateTables(client: any) {
  const tables =
    (await client.$queryRaw`SELECT table_name FROM information_schema.tables where table_schema = 'public' AND table_name NOT like '_prisma%';`) as PrismaTableName[];

  const joinedTableNames = tables
    .map((t: PrismaTableName) => `"${t.table_name}"`)
    .join(", ");

  const query = `TRUNCATE ${joinedTableNames} CASCADE;`;
  await client.$executeRawUnsafe(query);
}
