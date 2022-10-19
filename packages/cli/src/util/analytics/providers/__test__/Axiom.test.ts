import Axiom from "../Axiom";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("Axiom", () => {
  describe("#trackMany", () => {
    // TODO
  });

  describe("#track", () => {
    let axiom: Axiom;
    beforeEach(() => {
      axiom = new Axiom("apiToken", "datasetName");
    });

    it("should call fetch with the correct arguments", () => {
      axiom.track({ event: "test.event", properties: { foo: "bar" } });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://cloud.axiom.co/api/v1/datasets/datasetName/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer apiToken",
          },
          body: JSON.stringify({
            event: "test.event",
            properties: { foo: "bar" },
          }),
        }
      );
    });
  });
});
