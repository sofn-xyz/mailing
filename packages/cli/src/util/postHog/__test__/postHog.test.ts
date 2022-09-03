import { capture } from "..";
import * as postHogClient from "../client";
import moduleManifest from "../../../moduleManifest";
import * as config from "../../config";

describe("postHog", () => {
  // tests:
  // argument preference: const distinctId = options.distinctId || config.anonymousId || getGeneratedAnonymousId();
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

    expect(mockPostHogClient.capture).toHaveBeenCalledWith({
      distinctId: "abc",
      event: "ate pizza",
    });
  });

  // it("should call capture on the postHog client - with config.anonymousId if options.distinctId is blank", () => {
  //   // @ts-ignore
  //   // const mockModuleManifest = jest.createMockFromModule(
  //   //   "../../../moduleManifest"
  //   // ).default;

  //   moduleManifest.config = { anonymousId: "config-xyz" };

  //   // jest.spyOn(moduleManifest, "config").mockImplementation(() => {
  //   //   return {
  //   //     config: {
  //   //       anonymousId: "config-xyz",
  //   //     },
  //   //   };
  //   // });
  //   const mockPostHogClient = { capture: jest.fn() };

  //   jest
  //     .spyOn(postHogClient, "postHogClient")
  //     // @ts-ignore
  //     .mockImplementation(() => mockPostHogClient);

  //   capture({
  //     event: "ate pizza",
  //   });

  //   expect(mockPostHogClient.capture).toHaveBeenCalledWith({
  //     distinctId: "config-xyz",
  //     event: "ate pizza",
  //   });
  // });

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
});
