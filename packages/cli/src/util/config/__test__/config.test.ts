import { log } from "../../serverLogger";
import fsExtra from "fs-extra";
import {
  defaults,
  looksLikeTypescriptProject,
  writeDefaultConfigFile,
  setConfig,
  getConfig,
  getQuiet,
} from "..";

jest.mock("../../serverLogger");

describe("writeDefaultConfigFile", () => {
  beforeAll(() => {
    // IMPORTANT: config.defaults uses memoization, so you should expect that
    // for all the tests in this file, the defaults will be what are listed here
    const TEST_DEFAULTS = {
      emailsDir: "./emails",
      outDir: "./previews_html",
      port: 3883,
      quiet: false,
      scaffoldOnly: false,
      typescript: true,
    };

    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => {
      return path === "./tsconfig.json" ? true : false;
    });
    expect(looksLikeTypescriptProject()).toBe(true);
    expect(defaults()).toEqual(TEST_DEFAULTS);
  });

  it("writes mailing.config.json if it doesn't exist", () => {
    const defaultJsonString = `{
  "typescript": true,
  "emailsDir": "./emails",
  "outDir": "./previews_html"
}
`;

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    const mockExistsSync = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation(() => false);

    writeDefaultConfigFile();

    expect(mockExistsSync).toHaveBeenCalled();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./mailing.config.json",
      defaultJsonString
    );
    expect(log).toMatchSnapshot();
  });

  it("does not write mailing.config.json if it exists", () => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((_path) => true);

    const mockReadJSON = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
      }));

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    writeDefaultConfigFile();
    expect(mockReadJSON).not.toHaveBeenCalled();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  describe("getQuiet", () => {
    it("works if config is defined", () => {
      setConfig(undefined);
      expect(getConfig).toThrow();
      setConfig({ quiet: true, port: 3456, emailsDir: "emails" });
      expect(getConfig).not.toThrow();
      expect(getQuiet()).toBe(true);
      setConfig({ quiet: false, port: 3456, emailsDir: "emails" });
      expect(getQuiet()).toBe(false);
    });
    it("works even if config is undefined", () => {
      setConfig(undefined);
      expect(getConfig).toThrow();
      expect(getQuiet()).toBe(false);
    });
  });
});
