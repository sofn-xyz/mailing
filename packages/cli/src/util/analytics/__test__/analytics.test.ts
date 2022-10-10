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

  describe("#track", () => {
    let analytics: Analytics;
    beforeEach(() => {
      process.env.AXIOM_API_TOKEN = "axiomApiToken";
      process.env.AXIOM_DATASET_NAME = "axiomDatasetName";
      process.env.MAILING_API_TOKEN = "mailingApiToken";
      process.env.POSTHOG_API_TOKEN = "posthogApiToken";
      analytics = new Analytics();
    });

    it("should call fetch with the correct arguments", () => {
      analytics.track("test.event", { foo: "bar" });
      expect(fetch).toHaveBeenCalledTimes(3);

      // Mailing call
      expect(fetch).toHaveBeenCalledWith("https://mailing.run/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "test.event",
          properties: { foo: "bar" },
        }),
      });

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
