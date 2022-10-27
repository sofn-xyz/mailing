import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "**/*.cy.integration.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3883",
    setupNodeEvents(on, _config) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
    },
  },
});
