module.exports = {
  preset: "babel-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
