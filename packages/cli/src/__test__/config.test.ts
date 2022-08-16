import fs from "fs";
import { log } from "../log";
import fsExtra from "fs-extra";
import { writeDefaultConfigFile } from "../config";

jest.mock("../log");

describe("writeDefaultConfigFile", () => {
  it("writes mailing.config.json if it doesn't exist", () => {
    const defaultJsonString = `{
  \"typescript\": true,
  \"emailsDir\": \"./emails\",
  \"outDir\": \"./previews_html\"
}
`;

    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => false);

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((configFile, jsonString) => false);

    writeDefaultConfigFile();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./mailing.config.json",
      defaultJsonString
    );
    expect(log)
      .toHaveBeenCalledWith(`Added mailing.config.json to your project with the following contents:
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
