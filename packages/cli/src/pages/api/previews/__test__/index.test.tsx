import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import index from "..";

describe("index", () => {
  it("should return previews", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await index(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json).toMatchSnapshot();
  });

  it("should return template subject if it exists", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await index(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();
    expect(json["previewText"]["/previews/AccountCreated/accountCreated"]).toBe(
      "Welcome to BookBook, Amelita!"
    );
  });
});
