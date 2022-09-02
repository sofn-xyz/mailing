import { buildHandler } from "../buildHandler";
import * as postHog from "../postHog";

describe("buildHandler", () => {
  it("should call telemetry functions - without properties", () => {
    const mockCapture = jest
      .spyOn(postHog, "capture")
      .mockImplementation(() => true);

    const handler = buildHandler(async () => {}, {
      captureOptions: () => {
        return { event: "handler invoked" };
      },
    });

    const argv = {
      anonymousId: "abc",
      emailsDir: "./emails",
    };

    handler(argv);

    expect(mockCapture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "handler invoked",
      properties: {
        nodeEnv: "test",
      },
    });
  });

  it("should call telemetry functions - with properties", () => {
    const mockCapture = jest
      .spyOn(postHog, "capture")
      .mockImplementation(() => true);

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

    handler(argv);

    expect(mockCapture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "handler invoked",
      properties: {
        nodeEnv: "test",
        subcommand: "start",
      },
    });
  });
});
