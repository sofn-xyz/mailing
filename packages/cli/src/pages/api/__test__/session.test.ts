import { NextApiRequest, NextApiResponse } from "next";
import handler from "../session";

function mockRequestResponse(method: string) {
  const { req, res } = {
    req: { method } as NextApiRequest,
    res: {} as unknown as NextApiResponse,
  };
  res.json = jest.fn();
  res.end = jest.fn();
  res.status = jest.fn(() => res);
  req.headers = { "Content-Type": "application/json" };
  return { req, res };
}

describe("login", () => {
  const MAILING_SESSION_PASSWORD_OG = process.env.MAILING_SESSION_PASSWORD;

  beforeEach(() => {
    delete process.env.MAILING_SESSION_PASSWORD;
  });

  afterEach(() => {
    process.env.MAILING_SESSION_PASSWORD = MAILING_SESSION_PASSWORD_OG;
  });

  it("should 404 if MAILING_SESSION_PASSWORD is not set", async () => {
    const { req, res } = mockRequestResponse("GET");
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });
});
