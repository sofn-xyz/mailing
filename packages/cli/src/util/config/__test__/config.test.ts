import { log } from "../../serverLogger";
import fsExtra from "fs-extra";
import crypto from "crypto";
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
  "outDir": "./previews_html",
  "anonymousId": "TEST_VALUE"
}
`;

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    const mockExistsSync = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation(() => false);

    const mockUUID = jest
      .spyOn(crypto, "randomUUID")
      .mockImplementation(() => "TEST_VALUE");

    writeDefaultConfigFile();

    expect(mockUUID).toHaveBeenCalled();
    expect(mockExistsSync).toHaveBeenCalled();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./mailing.config.json",
      defaultJsonString
    );
    expect(log).toMatchSnapshot();
  });

  it("does not write mailing.config.json if it exists and has anonymousId", () => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((_path) => true);

    const mockReadJSON = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
        anonymousId: "TEST_VALUE",
      }));

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    writeDefaultConfigFile();
    expect(mockReadJSON).toHaveBeenCalled();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it("adds an anonymousId to mailing.config.json if if it exists and has no anonymousId", () => {
    // config file exists
    const mockExistsSync = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((_path) => true);

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    const mockReadJSON = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
      }));

    writeDefaultConfigFile();
    expect(mockExistsSync).toHaveBeenCalled();
    expect(mockReadJSON).toHaveBeenCalled();
    expect(mockWriteFileSync).toHaveBeenCalled();
    expect(log).toHaveBeenCalled();
  });

  it("does not add an anonymousId to mailing.config.json if if it exists and anonymousId is set to null or blank string", () => {
    // config file exists
    const mockExistsSync = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((_path) => true);

    const mockWriteFileSync = jest
      .spyOn(fsExtra, "writeFileSync")
      .mockImplementation(() => false);

    // anonymousId is null
    const mockReadJSONWithNull = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
        anonymousId: null,
      }));

    writeDefaultConfigFile();
    expect(mockExistsSync).toHaveBeenCalled();
    expect(mockReadJSONWithNull).toHaveBeenCalled();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();

    // anonymousId is ""
    const mockReadJSONWithBlankString = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
        anonymousId: "",
      }));

    writeDefaultConfigFile();
    expect(mockExistsSync).toHaveBeenCalled();
    expect(mockReadJSONWithBlankString).toHaveBeenCalled();
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
