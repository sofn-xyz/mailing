import Posthog from "../Posthog";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("Posthog", () => {
  describe("#track", () => {
    let posthog: Posthog;
    beforeEach(() => {
      posthog = new Posthog("apiToken");
    });

    it("should call fetch with the correct arguments", () => {
      posthog.track("test.event", { foo: "bar" });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://app.posthog.com/capture/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "apiToken",
          event: "test.event",
          properties: { foo: "bar" },
        }),
      });
    });
  });
});
