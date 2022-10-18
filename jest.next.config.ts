/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "jest";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./packages/cli",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "<rootDir>/packages/cli/src/pages/**/__test__/**/*.[jt]s?(x)",
    "<rootDir>/packages/cli/src/components/**/__test__/**/*.[jt]s?(x)",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/packages/.*/__mocks__/index.ts",
    "<rootDir>/packages/.*/.mailing/*",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const config: Config = createJestConfig(customJestConfig);

export default config;
