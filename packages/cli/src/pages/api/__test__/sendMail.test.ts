import { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "../../../moduleManifest";
import handler from "../sendMail";

// api authentication is tested in __integration__/sendMail.test.ts so don't also test it here
jest.mock("../../../util/validateApiKey", () => ({
  validateApiKey: async () => true,
}));

jest.mock("../../../moduleManifest", () => {
  const originalModule = jest.requireActual("../../../moduleManifest");
  return {
    ...originalModule,
    sendMail: jest.fn(),
  };
});

function mockRequestResponse(method: string) {
  const { req, res } = {
    req: { method } as NextApiRequest,
    res: {} as unknown as NextApiResponse,
  };
  res.json = jest.fn();
  res.end = jest.fn();
  req.query = {};
  res.status = jest.fn(() => res);
  req.body = {
    to: "alex@mailing.run",
    templateName: "AccountCreated",
    subject: "Welcome to Mailing!",
    props: { name: "Alex" },
  };
  req.headers = { "Content-Type": "application/json" };
  return { req, res };
}

describe("sendMail with a valid api key", () => {
  beforeAll(() => {});

  it("should 422 if no to, cc, or bcc is provided", async () => {
    const { req, res } = mockRequestResponse("POST");
    delete req.body.to;
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "to, cc, or bcc must be specified",
    });
  });

  it("should 422 if no templateName is provided", async () => {
    const { req, res } = mockRequestResponse("POST");
    delete req.body.templateName;
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "templateName or html must be specified",
    });
  });

  it("should 200 with everything correctly given", async () => {
    const { req, res } = mockRequestResponse("POST");
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMail).toHaveBeenCalled();
  });
});
