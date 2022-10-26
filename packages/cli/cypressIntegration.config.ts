import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "**/*.cy.integration.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:3883",
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
