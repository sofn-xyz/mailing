import { defineConfig } from "cypress";
import cliPrisma from "./prisma";

const resetDb = async () => {
  const count = await cliPrisma.$queryRaw`SELECT COUNT(*) FROM "User";`;
  console.log("count is", count);
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
