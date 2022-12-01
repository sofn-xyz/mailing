import { defineConfig } from "cypress";
import cliPrisma from "./prisma";

interface PrismaTableName {
  table_name: string;
}

const resetDb = async () => {
  await truncateDatabases();
  return null;
};

export default defineConfig({
  e2e: {
    specPattern: "**/*.cy.integration.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3883",
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, _config) {
      on("task", {
        "db:reset": resetDb,
      });
    },
  },
});

// copied from testUtilIntegration.ts

export async function truncateCliDatabase() {
  await truncateTables(cliPrisma);
}

export async function truncateDatabases() {
  await truncateCliDatabase();
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
