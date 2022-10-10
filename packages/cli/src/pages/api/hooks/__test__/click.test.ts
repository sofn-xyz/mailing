import { createMocks } from "node-mocks-http";
import handleClick from "../click";

describe("/api/hooks/click", () => {
  describe("invalid method type", () => {
    test("returns 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        query: {
          animal: "dog",
        },
      });

      await handleClick(req, res);

      expect(res.statusCode).toBe(405);
    });
  });

  describe("valid method type", () => {
    test("redirects correctly", async () => {
      const url = "http://mailing.dev/fun?utm_source=test";
      const encoded = Buffer.from(url).toString("base64");
      const { req, res } = createMocks({
        method: "GET",
        query: {
          url: encoded,
        },
      });

      await handleClick(req, res);

      expect(res.statusCode).toBe(307);
      expect(res._getRedirectUrl()).toBe(url);
    });
  });
});
