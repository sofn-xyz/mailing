import { capture } from "..";
import * as postHogClient from "../client";
import * as moduleManifestUtil from "../../moduleManifestUtil";
import * as config from "../../config";

describe("postHog", () => {
  beforeEach(() => {
    // jest.resetAllMocks();
  });

  afterEach(() => {
    delete process.env.MM_DEV;
  });

  it("should call capture on the postHog client", () => {
    const mockPostHogClient = { capture: jest.fn() };

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient);

    capture({
      distinctId: "abc",
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "ate pizza",
    });
  });

  it("should call capture on the postHog client - with config.anonymousId if options.distinctId is blank", () => {
    // jest.spyOn(moduleManifestUtil, "getConfig").mockImplementation(() => {
    //   return {
    //     anonymousId: "config-xyz",
    //   };
    // });
    const mockPostHogClient = { capture: jest.fn() };

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "config-xyz",
      event: "ate pizza",
    });
  });

  it("should call capture on the postHog client - with generatedAnonymousId if options.distinctId and config.anonymousId are blank", () => {
    const mockPostHogClient = { capture: jest.fn() };
    jest
      .spyOn(config, "getGeneratedAnonymousId")
      .mockImplementation(() => "generated-xyz");

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "generated-xyz",
      event: "ate pizza",
    });
  });

  it("should not call capture if there is no anonymousId", () => {
    const mockPostHogClient = { capture: jest.fn() };

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).not.toHaveBeenCalled();
  });

  it("should not call capture if MM_DEV", () => {
    process.env.MM_DEV = "1";
    const mockPostHogClient = { capture: jest.fn() };

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).not.toHaveBeenCalled();
  });
});
