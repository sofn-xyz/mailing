import { defineConfig } from "cypress";
import cliPrisma from "./prisma";

export default defineConfig({
  e2e: {
    specPattern: "**/*.cy.integration.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3883",
    setupNodeEvents(on, _config) {
      on("task", {
        async "db:reset"() {
          const count = await cliPrisma.$queryRaw`SELECT COUNT(*) FROM "User";`;
          console.log("count is", count);
          return null;
        },
      });
    },
  },
});
