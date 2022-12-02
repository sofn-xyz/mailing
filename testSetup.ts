import "@testing-library/jest-dom";

jest.mock("./packages/cli/src/moduleManifest");

afterEach(() => {
  jest.resetAllMocks();
});

const testSetup = {};
export default testSetup;
