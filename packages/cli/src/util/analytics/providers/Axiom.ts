import fetch from "node-fetch";

class Axiom implements IAnalyticsProvider {
  static baseUrl = "https://cloud.axiom.co";
  apiToken: string;
  datasetName: string;

  constructor(apiToken: string, datasetName: string) {
    this.apiToken = apiToken;
    this.datasetName = datasetName;
  }

  track(event: AnalyticsEvent) {
    return this.#ingest(event);
  }

  trackMany(events: AnalyticsEvent[]) {
    return this.#ingestMany(events);
  }

  #ingest(event: AnalyticsEvent) {
    return fetch(
      Axiom.baseUrl + "/api/v1/datasets/" + this.datasetName + "/ingest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify(event),
      }
    );
  }

  #ingestMany(events: AnalyticsEvent[]) {
    return fetch(
      Axiom.baseUrl + "/api/v1/datasets/" + this.datasetName + "/ingest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify(events),
      }
    );
  }
}

export default Axiom;
