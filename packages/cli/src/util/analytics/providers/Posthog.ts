import fetch from "node-fetch";

class Posthog implements IAnalyticsProvider {
  static baseUrl = "https://app.posthog.com";
  apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  track(event: AnalyticsEvent) {
    return this.#capture(event);
  }

  trackMany(events: AnalyticsEvent[]) {
    return this.#batch(events);
  }

  #capture(event: AnalyticsEvent) {
    return fetch(Posthog.baseUrl + "/capture/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: this.apiToken,
        ...event,
      }),
    });
  }

  #batch(events: AnalyticsEvent[]) {
    return fetch(Posthog.baseUrl + "/batch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: this.apiToken,
        batch: events,
      }),
    });
  }
}

export default Posthog;
