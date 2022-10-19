import { Analytics } from "..";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("analytics", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("#trackMany", () => {
    // TODO
  });

  describe("#track", () => {
    let analytics: Analytics;
    beforeEach(() => {
      process.env.AXIOM_API_TOKEN = "axiomApiToken";
      process.env.AXIOM_DATASET_NAME = "axiomDatasetName";
      process.env.POSTHOG_API_TOKEN = "posthogApiToken";
      analytics = new Analytics();
    });

    it("should call fetch with the correct arguments", () => {
      analytics.track({ event: "test.event", properties: { foo: "bar" } });
      expect(fetch).toHaveBeenCalledTimes(2);

      // Axiom call
      expect(fetch).toHaveBeenCalledWith(
        "https://cloud.axiom.co/api/v1/datasets/axiomDatasetName/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer axiomApiToken",
          },
          body: JSON.stringify({
            event: "test.event",
            properties: { foo: "bar" },
          }),
        }
      );

      // Posthog call
      expect(fetch).toHaveBeenCalledWith("https://app.posthog.com/capture/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "posthogApiToken",
          event: "test.event",
          properties: { foo: "bar" },
        }),
      });
    });
  });
});
