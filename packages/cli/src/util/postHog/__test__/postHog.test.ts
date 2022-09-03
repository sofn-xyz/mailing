import { capture } from "..";
import * as postHogClient from "../client";
import { PostHog } from "posthog-node";

describe("postHog", () => {
  it("should call capture on the postHog client", () => {
    // tests:
    // argument preference: const distinctId = options.distinctId || config.anonymousId || getGeneratedAnonymousId();
    // early return if none given
    // distinctId is overwritten by config options
    // early return from MM_DEV
    // calls postHogClient()?.capture

    const mockPostHogClient = jest.fn();
    // @ts-ignore
    mockPostHogClient.capture = jest.fn();

    jest
      .spyOn(postHogClient, "postHogClient")
      // @ts-ignore
      .mockImplementation(() => mockPostHogClient); // @ts-ignore

    capture({
      distinctId: "abc",
      event: "ate pizza",
    });

    // @ts-ignore
    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "ate pizza",
    });
  });
});
