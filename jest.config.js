/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["scripts"],
  setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  watchPathIgnorePatterns: ["tmp-testMailQueue.json"],
};
