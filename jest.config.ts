import type { Config } from "jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "scripts",
    "<rootDir>/emails/",
    "<rootDir>/.mailing/",
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/emails/",
    "<rootDir>/packages/cli/src/emails/",
    "<rootDir>/packages/cli/src/generator_templates/ts/emails/",
    "<rootDir>/.mailing/",
    "tmp-testMailQueue.json",
  ],
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  // TODO: keep testTimeout low and use jest.setTimeout for long ones
  testTimeout: 30000,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [],
} as Config;
