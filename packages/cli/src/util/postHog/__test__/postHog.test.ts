import { capture } from "..";
import * as postHogClient from "../client";
import * as moduleManifestUtil from "../../moduleManifestUtil";
import * as anonymousId from "../../config/anonymousId";
import { PostHog } from "posthog-node";

describe("postHog", () => {
  const MM_DEV_OG = process.env.MM_DEV;
  const MM_DEV_E2E_OG = process.env.MM_E2E;
  let mockPostHogClient: PostHog;
  beforeEach(() => {
    mockPostHogClient = { capture: jest.fn() } as unknown as PostHog;
    jest.restoreAllMocks();
    delete process.env.MM_DEV;
    delete process.env.MM_E2E;
  });

  afterEach(() => {
    process.env.MM_DEV = MM_DEV_OG;
    process.env.MM_E2E = MM_DEV_E2E_OG;
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
    const spy = jest
      .spyOn(moduleManifestUtil, "getConfig")
      .mockImplementation(() => {
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
