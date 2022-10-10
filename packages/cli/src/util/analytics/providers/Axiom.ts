import fetch from "node-fetch";

class Axiom implements IAnalyticsProvider {
  static baseUrl = "https://cloud.axiom.co";
  apiToken: string;
  datasetName: string;

  constructor(apiToken: string, datasetName: string) {
    this.apiToken = apiToken;
    this.datasetName = datasetName;
  }

  track(event: string, properties: Record<string, unknown>) {
    this.#ingest(event, properties);
  }

  #ingest(event: string, properties: Record<string, unknown>) {
    fetch(Axiom.baseUrl + "/api/v1/datasets/" + this.datasetName + "/ingest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        event: event,
        properties: properties,
      }),
    });
  }
}

export default Axiom;
