beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(jest.fn());
});
afterEach(() => {
  jest.resetAllMocks();
});
