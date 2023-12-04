/* eslint-disable @typescript-eslint/no-empty-function */
import { buildHandler } from "../buildHandler";
import { log } from "../serverLogger";
import fsExtra from "fs-extra";
import * as config from "../config";

jest.mock("../serverLogger");

describe("buildHandler", () => {
  beforeEach(() => {
    // package.json check in buildHandler should pass unless overriden
    jest.spyOn(fsExtra, "existsSync").mockImplementation(() => true);
  });

  describe("shared guards and setup", () => {
    it("returns early if ./package.json is not found", async () => {
      const handler = buildHandler(async () => {}, {});
      const argv = {
        emailsDir: "./emails",
      };

      jest.spyOn(fsExtra, "existsSync").mockImplementation(() => false);

      const mockWriteDefaultConfigFile = jest.spyOn(
        config,
        "writeDefaultConfigFile"
      );

      await handler(argv);

      expect(log).toHaveBeenCalledWith(
        "No package.json found. Please run from the project root."
      );

      // a function that is called a bit later on in the function should not be called :shrug
      expect(mockWriteDefaultConfigFile).not.toHaveBeenCalled();
    });

    it("throws an error if emailsDir is not specified in argv", async () => {
      const handler = buildHandler(async () => {}, {});
      const argv = {};

      await expect(async () => {
        await handler(argv);
      }).rejects.toThrowError("emailsDir option is not set");
    });

    it("calls setConfig and writeDefaultConfigFile", async () => {
      const handler = buildHandler(async () => {}, {});
      const argv = {
        emailsDir: "./emails",
        port: 3883,
        quiet: true,
      };

      const mockSetConfig = jest
        .spyOn(config, "setConfig")
        .mockImplementation(() => {});

      const mockWriteDefaultConfigFile = jest.spyOn(
        config,
        "writeDefaultConfigFile"
      );

      await handler(argv);

      expect(mockSetConfig).toHaveBeenCalled();
      expect(mockWriteDefaultConfigFile).toHaveBeenCalled();
    });
  });
});
