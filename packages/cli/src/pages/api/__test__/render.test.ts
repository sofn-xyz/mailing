import { NextApiRequest, NextApiResponse } from "next";
import handler from "../render";

function mockRequestResponse(method: string) {
  const { req, res } = {
    req: { method } as NextApiRequest,
    res: {} as unknown as NextApiResponse,
  };
  res.json = jest.fn();
  res.end = jest.fn();
  res.status = jest.fn(() => res);
  req.body = {
    templateName: "AccountCreated",
    props: { name: "Alex" },
  };
  req.headers = { "Content-Type": "application/json" };
  return { req, res };
}

describe("render", () => {
  const MAILING_API_KEY_OG = process.env.MAILING_API_KEY;

  describe("without MAILING_API_KEY set - it should not require an ApiKey", () => {
    beforeEach(() => {
      delete process.env.MAILING_API_KEY;
    });

    afterEach(() => {
      process.env.MAILING_API_KEY = MAILING_API_KEY_OG;
    });

    it("should 200 without an api key", async () => {
      const { req, res } = mockRequestResponse("POST");
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("with MAILING_API_KEY set - it should require a valid ApiKey", () => {
    const VALID_PROCESS_ENV_API_KEY = "validProcessEnvApiKey";

    beforeEach(() => {
      process.env.MAILING_API_KEY = VALID_PROCESS_ENV_API_KEY;
    });

    afterEach(() => {
      process.env.MAILING_API_KEY = MAILING_API_KEY_OG;
    });

    it("should 401 if MAILING_API_KEY does not match", async () => {
      const { req, res } = mockRequestResponse("POST");
      req.query = { apiKey: "invalid" };
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should 200 if MAILING_API_KEY matches", async () => {
      const { req, res } = mockRequestResponse("POST");
      req.query = { apiKey: VALID_PROCESS_ENV_API_KEY };
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
