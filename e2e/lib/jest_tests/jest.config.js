const jestConfig = {
  clearMocks: true,
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
  testTimeout: 60000,
};

export default jestConfig;
