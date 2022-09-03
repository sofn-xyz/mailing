import { capture } from "..";
import * as postHogClient from "../client";

describe("postHog", () => {
  // tests:
  // argument preference: const distinctId = options.distinctId || config.anonymousId || getGeneratedAnonymousId();
  // early return if none given
  // distinctId is overwritten by config options
  // early return from MM_DEV

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

    // @ts-ignore
    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "ate pizza",
    });
  });
});
