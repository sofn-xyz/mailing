import Posthog from "../Posthog";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("Posthog", () => {
  let posthog: Posthog;
  beforeEach(() => {
    posthog = new Posthog("apiToken");
  });

  describe("#trackMany", () => {
    it("should call fetch with the correct arguments", async () => {
      await posthog.trackMany([
        { event: "test.event.one", properties: { foo: "bar.one" } },
        { event: "test.event.two", properties: { foo: "bar.two" } },
      ]);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://app.posthog.com/batch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "apiToken",
          batch: [
            {
              event: "test.event.one",
              properties: { foo: "bar.one" },
            },
            {
              event: "test.event.two",
              properties: { foo: "bar.two" },
            },
          ],
        }),
      });
    });
  });

  describe("#track", () => {
    it("should call fetch with the correct arguments", async () => {
      await posthog.track({ event: "test.event", properties: { foo: "bar" } });
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
