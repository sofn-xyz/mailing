/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["scripts"],
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  watchPathIgnorePatterns: ["tmp-testMailQueue.json"],
  testTimeout: 20000,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [],
};
