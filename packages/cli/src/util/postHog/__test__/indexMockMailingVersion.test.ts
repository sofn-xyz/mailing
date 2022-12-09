import { capture } from "..";
import * as postHogClient from "../client";
import { PostHog } from "posthog-node";

jest.mock("../../../const/mailingVersion", () => ({
  MAILING_VERSION: "mock-mailing-version",
}));

describe("posthog", () => {
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

  it("should include MAILING_VERSION because it is defined", () => {
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
      properties: {
        mailing_version: "mock-mailing-version",
      },
    });
  });
});
