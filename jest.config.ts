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
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
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
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
    // TODO: keep testTimeout low and use jest.setTimeout for long ones
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
    reporters: ["default", "github-actions"],
    testTimeout: 60000,
    projects: [nodeConfig(), await jsdomConfig()],
  };
};

export default config;
