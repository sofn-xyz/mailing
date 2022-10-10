import fetch from "node-fetch";

class Mailing implements IAnalyticsProvider {
  static baseUrl = "https://mailing.run";
  apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  track(event: string, properties: Record<string, unknown>) {
    this.#track(event, properties);
  }

  #track(event: string, properties: Record<string, unknown>) {
    fetch(Mailing.baseUrl + "/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event,
        properties: properties,
      }),
    });
  }
}

export default Mailing;
