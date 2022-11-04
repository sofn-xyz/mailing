import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/testSetup.integration.ts"],
  testMatch: ["<rootDir>/packages/**/__integration__/**/*.test.[jt]s?(x)"],
  preset: "ts-jest",
  testEnvironment: "node",
  maxConcurrency: 1,
  maxWorkers: 1,
  // TODO: keep testTimeout low and use jest.setTimeout for long ones
  testTimeout: 60000,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  testPathIgnorePatterns: [
    "scripts",
    "<rootDir>/emails/",
    "<rootDir>/.mailing/",
    "<rootDir>/packages/cli/.mailing",
    "<rootDir>/packages/cli/src/pages/.*/__test__",
    "<rootDir>/packages/cli/src/components",
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/emails/",
    "<rootDir>/packages/cli/src/emails/",
    "<rootDir>/packages/cli/src/generator_templates/ts/emails/",
    "<rootDir>/.mailing/",
    "tmp-testMailQueue.json",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/packages/.*/__mocks__/index.ts",
    "<rootDir>/packages/.*/.mailing/*",
    "<rootDir>/packages/cli/src/pages/api/__integration__/util/assertIntegrationTestEnv.ts",
  ],
};

// Point to the correct DB in dev
process.env.MAILING_DATABASE_URL = process.env.MAILING_DATABASE_URL_TEST;
process.env.WEB_DATABASE_URL = process.env.WEB_DATABASE_URL_TEST;

export default config;
