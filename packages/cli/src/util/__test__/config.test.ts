import fs from "fs";
import { log } from "../log";
import fsExtra from "fs-extra";
import crypto from "crypto";
import {
  defaults,
  looksLikeTypescriptProject,
  writeDefaultConfigFile,
} from "../config";
import exp from "constants";

jest.mock("../log");

describe("writeDefaultConfigFile", () => {
  beforeAll(() => {
    // IMPORTANT: config.defaults uses memoization, so you should expect that
    // for all the tests in this file, the defaults will be what are listed here
    const TEST_DEFAULTS = {
      emailsDir: "./emails",
      outDir: "./previews_html",
      port: 3883,
      quiet: false,
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
  \"typescript\": true,
  \"emailsDir\": \"./emails\",
  \"outDir\": \"./previews_html\",
  \"anonymousId\": \"TEST_VALUE\"
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

  it("does not writes mailing.config.json if it exists and has anonymousId", () => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => true);

    const mockReadJSON = jest
      .spyOn(fsExtra, "readJSONSync")
      .mockImplementation(() => ({
        typescript: true,
        emailsDir: "./emails",
        outDir: "./previews_html",
        anonymousId: "TEST_VALUE",
      }));

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => false);

    writeDefaultConfigFile();
    expect(mockReadJSON).toHaveBeenCalled();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it("does not writes mailing.config.json if it exists and has no anonymousId", () => {
    // config file exists
    const mockExistsSync = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => true);

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
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
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
});
