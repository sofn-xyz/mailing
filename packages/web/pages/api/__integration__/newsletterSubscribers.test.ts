import { NextApiRequest, NextApiResponse } from "next";
import handler from "../newsletterSubscribers";

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
  });
});
