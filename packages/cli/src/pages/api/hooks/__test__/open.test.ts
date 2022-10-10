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
      const email = "useremail@mailing.dev";
      const sendId = "abcd-1234";
      const { req, res } = createMocks({
        method: "GET",
        query: {
          email: email,
          sendId: sendId,
        },
      });

      await handleOpen(req, res);
      expect(res.statusCode).toBe(200);
      // Ensure analytics are called
      expect(Analytics.track).toHaveBeenCalledTimes(1);
      expect(Analytics.track).toHaveBeenCalledWith("email.open", {
        email: email,
        sendId: sendId,
      });
    });
  });
});
