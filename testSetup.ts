import "@testing-library/jest-dom";

process.env.MM_ENV = "test";

afterEach(() => {
  jest.resetAllMocks();
});

const testSetup = {};
export default testSetup;
