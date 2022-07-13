/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  watchPathIgnorePatterns: ["tmp-testMailQueue.json"],
};
