import { createMocks } from "node-mocks-http";
import handleOpen from "../open";

describe("/api/hooks/open", () => {
  describe("invalid method type", () => {
    test("returns 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        query: {
          animal: "dog",
        },
      });

      await handleOpen(req, res);

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

      await handleOpen(req, res);
      expect(res.statusCode).toBe(200);
    });
  });
});
