import { buildHandler } from "../buildHandler";
import * as postHog from "../postHog";

describe("buildHandler", () => {
  describe("shared guards and setup", () => {
    it("throws an error if ./package.json is not found", () => {
      expect(false);
    });
    it("throws an error if emailsDir is not specified in argv", () => {
      expect(false);
    });
    it("calls setConfig", () => {
      expect(false);
    });
    it("calls writeDefaultConfigFile", () => {
      expect(false);
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
