/* eslint-disable @typescript-eslint/no-empty-function */
import { buildHandler } from "../buildHandler";
import { log } from "../serverLogger";
import * as postHog from "../postHog";
import fsExtra from "fs-extra";
import * as config from "../config";

jest.mock("../log");

describe("buildHandler", () => {
  beforeEach(() => {
    // package.json check in buildHandler should pass unless overriden
    jest.spyOn(fsExtra, "existsSync").mockImplementation(() => true);
  });

  describe("shared guards and setup", () => {
    it("returns early if ./package.json is not found", async () => {
      const handler = buildHandler(async () => {}, {});
      const argv = {
        anonymousId: "abc",
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
      const argv = {
        anonymousId: "abc",
      };

      await expect(async () => {
        await handler(argv);
      }).rejects.toThrowError("emailsDir option is not set");
    });

    it("calls setConfig and writeDefaultConfigFile", async () => {
      const handler = buildHandler(async () => {}, {});
      const argv = {
        anonymousId: "abc",
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

  describe("calling postHog commands", () => {
    it("without properties", async () => {
      const mockCapture = jest
        .spyOn(postHog, "capture")
        .mockImplementation(() => {});

      const mockShutdown = jest
        .spyOn(postHog, "shutdown")
        .mockImplementation(async () => {});

      const handler = buildHandler(async () => {}, {
        captureOptions: () => {
          return { event: "handler invoked" };
        },
      });

      const argv = {
        anonymousId: "abc",
        emailsDir: "./emails",
      };

      await handler(argv);

      expect(mockCapture).toHaveBeenCalledWith({
        distinctId: "abc",
        event: "handler invoked",
        properties: {
          nodeEnv: "test",
        },
      });

      expect(mockShutdown).toHaveBeenCalledTimes(1);
    });

    it("with properties", async () => {
      const mockCapture = jest
        .spyOn(postHog, "capture")
        .mockImplementation(() => {});

      const mockShutdown = jest
        .spyOn(postHog, "shutdown")
        .mockImplementation(async () => {});

      const handler = buildHandler(async () => {}, {
        captureOptions: () => {
          return {
            event: "handler invoked",
            properties: { subcommand: "start" },
          };
        },
      });

      const argv = {
        anonymousId: "abc",
        emailsDir: "./emails",
      };

      await handler(argv);

      expect(mockCapture).toHaveBeenCalledWith({
        distinctId: "abc",
        event: "handler invoked",
        properties: {
          nodeEnv: "test",
          subcommand: "start",
        },
      });

      expect(mockShutdown).toHaveBeenCalledTimes(1);
    });
  });
});
