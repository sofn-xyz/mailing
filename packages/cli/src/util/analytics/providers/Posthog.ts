import fetch from "node-fetch";

class Posthog implements IAnalyticsProvider {
  static baseUrl = "https://app.posthog.com";
  apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  track(event: string, properties: Record<string, unknown>) {
    this.#capture(event, properties);
  }

  #capture(event: string, properties: Record<string, unknown>) {
    // Do something
    fetch(Posthog.baseUrl + "/capture/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: this.apiToken,
        event: event,
        properties: properties,
      }),
    });
  }
}

export default Posthog;
