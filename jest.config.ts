import type { Config } from "jest";
import nextJest from "next/jest";

/*
 * Jest config necessary for Next.js
 * Next.js tests require jsdom to run
 * https://nextjs.org/docs/testing
 */
const jsdomConfig = async (): Promise<any> => {
  const createJestConfig = nextJest({
    dir: "./packages/cli",
  });

  const customJestConfig = {
    displayName: {
      name: "jest.jsdom",
      color: "magenta",
    },
    setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
      "<rootDir>/packages/cli/src/pages/**/__test__/**/*.test.[jt]s?(x)",
      "<rootDir>/packages/cli/src/components/**/__test__/**/*.test.[jt]s?(x)",
    ],
    modulePathIgnorePatterns: [
      "<rootDir>/packages/.*/__mocks__/index.ts",
      "<rootDir>/packages/.*/.mailing/*",
    ],
  };

  return createJestConfig(customJestConfig)() as Promise<Config>;
};

/*
 * Jest config necessary for everything else
 * These can be run with node, which is faster than jsdom
 */
const nodeConfig = (): Config => {
  return {
    displayName: {
      name: "jest.node",
      color: "cyan",
    },
    setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
    preset: "ts-jest",
    testEnvironment: "node",
    // TODO: keep testTimeout low and use jest.setTimeout for long ones
    testTimeout: 60000,
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.(js)$": "babel-jest",
    },
    testPathIgnorePatterns: [
      "e2e",
      "<rootDir>/emails/",
      "<rootDir>/.mailing/",
      "<rootDir>/packages/cli/.mailing/",
      "<rootDir>/packages/cli/src/pages",
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
    ],
    testMatch: ["<rootDir>/packages/**/__test__/**/*.test.[jt]s?(x)"],
  };
};

const config = async (): Promise<Config> => {
  return {
    setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
    projects: [nodeConfig(), await jsdomConfig()],
  };
};

export default config;
