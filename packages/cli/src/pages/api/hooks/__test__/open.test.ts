import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import Analytics from "../../../../util/analytics";
import handleOpen from "../open";

jest.mock("../../../../util/analytics");

describe("/api/hooks/open", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("POST", () => {
    test("returns 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        query: {
          animal: "dog",
        },
      });

      await handleOpen(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );

      expect(res.statusCode).toBe(405);
    });
  });

  describe("GET", () => {
    test("redirects correctly", async () => {
      const messageId = "abcd-1234";
      const { req, res } = createMocks({
        method: "GET",
        query: {
          messageId: messageId,
        },
      });

      await handleOpen(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse
      );
      expect(res.statusCode).toBe(200);
      // Ensure analytics are called
      expect(Analytics.track).toHaveBeenCalledTimes(1);
      expect(Analytics.track).toHaveBeenCalledWith({
        event: "email.open",
        properties: {
          messageId: messageId,
        },
      });
    });
  });
});
