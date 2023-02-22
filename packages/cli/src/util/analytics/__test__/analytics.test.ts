import { Analytics } from "..";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({}) })
) as jest.Mock;

describe("analytics", () => {
  const OLD_ENV = process.env;
  let analytics: Analytics;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    process.env.AXIOM_API_TOKEN = "axiomApiToken";
    process.env.AXIOM_DATASET_NAME = "axiomDatasetName";
    process.env.POSTHOG_API_TOKEN = "posthogApiToken";
    analytics = new Analytics();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("#trackMany", () => {
    it("should call fetch with the correct arguments", async () => {
      await analytics.trackMany([
        { event: "test.event.one", properties: { foo: "bar.one" } },
        { event: "test.event.two", properties: { foo: "bar.two" } },
      ]);
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
          body: JSON.stringify([
            {
              event: "test.event.one",
              properties: { foo: "bar.one" },
            },
            {
              event: "test.event.two",
              properties: { foo: "bar.two" },
            },
          ]),
        }
      );

      // Posthog call
      expect(fetch).toHaveBeenCalledWith("https://app.posthog.com/batch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "posthogApiToken",
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
      await analytics.track({
        event: "test.event",
        properties: { foo: "bar" },
      });
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
