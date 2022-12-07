import { capture, shutdown } from "..";
import * as postHogClient from "../client";
import * as moduleManifestUtil from "../../moduleManifestUtil";
import * as anonymousId from "../../config/anonymousId";
import { PostHog } from "posthog-node";

describe("postHog", () => {
  const MM_DEV_OG = process.env.MM_DEV;
  const MM_DEV_E2E_OG = process.env.MM_E2E;
  let mockPostHogClient: PostHog;
  let mockPostHogClient2: PostHog;

  beforeEach(() => {
    mockPostHogClient = { capture: jest.fn() } as unknown as PostHog;
    mockPostHogClient2 = {
      capture: jest.fn(),
      shutdownAsync: jest.fn().mockRejectedValue(new Error("timeout")),
    } as unknown as PostHog;
    jest.restoreAllMocks();
    delete process.env.MM_DEV;
    delete process.env.MM_E2E;
  });

  afterEach(() => {
    process.env.MM_DEV = MM_DEV_OG;
    process.env.MM_E2E = MM_DEV_E2E_OG;
  });

  it("should not raise an error if posthog shutdown raises an error (e.g. a timeout)", async () => {
    jest
      .spyOn(postHogClient, "getPostHogClient")
      .mockImplementation(() => mockPostHogClient2);

    await expect(async () => {
      await shutdown();
    }).not.toThrow();
  });

  it("should call capture on the postHog client", () => {
    jest
      .spyOn(postHogClient, "postHogClient")
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
    jest.spyOn(moduleManifestUtil, "getConfig").mockImplementation(() => {
      return {
        anonymousId: "config-xyz",
      };
    });

    jest
      .spyOn(postHogClient, "postHogClient")
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
    jest
      .spyOn(anonymousId, "getGeneratedAnonymousId")
      .mockImplementation(() => "generated-xyz");

    jest
      .spyOn(postHogClient, "postHogClient")
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
    jest
      .spyOn(postHogClient, "postHogClient")
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).not.toHaveBeenCalled();
  });

  it("should not call capture if MM_DEV", () => {
    process.env.MM_DEV = "1";

    jest
      .spyOn(postHogClient, "postHogClient")
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).not.toHaveBeenCalled();
  });

  it("should not call capture if MM_E2E", () => {
    process.env.MM_E2E = "1";

    jest
      .spyOn(postHogClient, "postHogClient")
      .mockImplementation(() => mockPostHogClient);

    capture({
      event: "ate pizza",
    });

    expect(mockPostHogClient.capture).not.toHaveBeenCalled();
  });
});
