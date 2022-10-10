import Mailing from "../Mailing";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("Mailing", () => {
  describe("#track", () => {
    let mailing: Mailing;
    beforeEach(() => {
      mailing = new Mailing("apiToken");
    });

    it("should call fetch with the correct arguments", () => {
      mailing.track("test.event", { foo: "bar" });
      expect(fetch).toHaveBeenCalledTimes(1);
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
    });
  });
});
