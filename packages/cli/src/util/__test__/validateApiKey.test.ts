import type { NextApiRequest, NextApiResponse } from "next";
import { validateApiKey } from "../validateApiKey";
import prisma from "../../../prisma";

function mockRequestResponse() {
  const { req, res } = {
    req: {} as NextApiRequest,
    res: {} as unknown as NextApiResponse,
  };
  res.json = jest.fn();
  res.end = jest.fn();
  res.status = jest.fn(() => res);
  req.headers = { "Content-Type": "application/json" };
  req.query = {};
  return { req, res };
}

describe("validateApiKey", () => {
  const OG_NODE_ENV = process.env.NODE_ENV;
  afterEach(() => {
    (process.env as any).NODE_ENV = OG_NODE_ENV;
  });

  it("returns true if NODE_ENV is development", async () => {
    (process.env as any).NODE_ENV = "development";
    const { req, res } = mockRequestResponse();
    const result = await validateApiKey(req, res);
    expect(result).toBe(true);
  });

  it("returns false if NODE_ENV is not development and apiKey is not a string", async () => {
    const { req, res } = mockRequestResponse();
    const result = await validateApiKey(req, res);
    expect(result).toBe(false);
  });

  it("returns false if NODE_ENV is not development and apiKey is not valid", async () => {
    const { req, res } = mockRequestResponse();
    jest
      .spyOn(prisma.apiKey, "findFirstOrThrow")
      .mockRejectedValueOnce(new Error("NOT FOUND"));
    req.query = { apiKey: "321" };
    const result = await validateApiKey(req, res);
    expect(result).toBe(false);
  });

  it("returns true if NODE_ENV is not development and apiKey is valid", async () => {
    const { req, res } = mockRequestResponse();
    jest
      .spyOn(prisma.apiKey, "findFirstOrThrow")
      .mockReturnValueOnce(Promise.resolve({ id: "123" }) as any);
    req.query = { apiKey: "123" };
    const result = await validateApiKey(req, res);
    expect(result).toBe(true);
  });
});
