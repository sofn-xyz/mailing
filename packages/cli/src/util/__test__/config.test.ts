import fs from "fs";
import { log } from "../log";
import fsExtra from "fs-extra";
import {
  defaults,
  looksLikeTypescriptProject,
  writeDefaultConfigFile,
} from "../config";

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
  \"outDir\": \"./previews_html\"
}
`;

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((configFile, jsonString) => false);

    writeDefaultConfigFile();

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./mailing.config.json",
      defaultJsonString
    );
    expect(log)
      .toHaveBeenCalledWith(`added mailing.config.json to your project with the following contents:
{
  \"typescript\": true,
  \"emailsDir\": \"./emails\",
  \"outDir\": \"./previews_html\"
}
`);
  });

  it("does not writes mailing.config.json if it exists", () => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => true);

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((configFile, jsonString) => false);

    writeDefaultConfigFile();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
});
