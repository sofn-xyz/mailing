import { prismaMock } from "../../../prisma/__mocks__";
global.prisma = prismaMock as unknown as PrismaClient;

import { NextApiRequest, NextApiResponse } from "next";
import handler from "../users";
import { PrismaClient } from "@prisma/client";

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

describe("users api", () => {
  describe("create", () => {
    it("404s on GET", async () => {
      const { req, res } = mockRequestResponse("GET");
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("creates a user", async () => {
      const { req, res } = mockRequestResponse("POST");
      req.body = { email: "hello@example.com" };
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("handles existing users", async () => {
      prismaMock.user.findFirst.mockReturnValue({} as any);
      const { req, res } = mockRequestResponse("POST");
      req.body = { email: "hello@example.com" };
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
