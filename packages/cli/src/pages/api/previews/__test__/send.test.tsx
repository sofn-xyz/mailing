import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import send from "../send";
import * as moduleManifestUtil from "../../../../util/moduleManifestUtil";
import * as moduleManifest from "../../../../moduleManifest";

jest.mock("../../../../util/log");

jest.mock("../../../../moduleManifest", () => ({
  sendMail: jest.fn(),
}));

jest.mock("../../../../util/moduleManifestUtil", () => ({
  getPreviewComponent: jest.fn(),
}));

describe("send", () => {
  it("should 405 on GET", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await send(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(405);
  });

  it("should 400 if previewClass and previewFunction are not specified in the body", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await send(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: "no html provided, no component found",
    });
  });

  it("should 200 if everything is good", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        previewClass: "Fake",
        previewFunction: "fake",
      },
    });

    jest
      .spyOn(moduleManifestUtil, "getPreviewComponent")
      .mockImplementation(jest.fn(async () => <div>fake</div>));

    await send(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(200);
  });

  it("should 500 if sendMail throws an error", async () => {
    const errorMessage = "a very bad sendMail error happened";

    jest
      .spyOn(moduleManifestUtil, "getPreviewComponent")
      .mockImplementation(jest.fn(async () => <div>fake</div>));

    jest.spyOn(moduleManifest, "sendMail").mockImplementation(
      jest.fn(async () => {
        throw new Error(errorMessage);
      })
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        previewClass: "Fake",
        previewFunction: "fake",
      },
    });

    await send(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(500);
    const json = res._getJSONData();
    expect("error" in json).toBe(true);

    expect(json.error).toMatch(/^sendMail threw an error/);

    // errorMessage is forwarded on to the user
    expect(json.error).toMatch(errorMessage);
  });
});
