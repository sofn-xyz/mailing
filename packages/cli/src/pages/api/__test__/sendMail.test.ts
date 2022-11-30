import { NextApiRequest, NextApiResponse } from "next";
import moduleManifest from "../../../moduleManifest";
import handler from "../sendMail";

// api authentication is tested in __integration__/sendMail.test.ts so don't also test it here
jest.mock("../../../util/validateApiKey", () => ({
  validateApiKey: async () => true,
}));

function mockRequestResponse(method: string) {
  const { req, res } = {
    req: { method } as NextApiRequest,
    res: {} as unknown as NextApiResponse,
  };
  res.json = jest.fn();
  res.end = jest.fn();
  req.query = {};
  res.status = jest.fn(() => res);
  req.headers = { "Content-Type": "application/json" };
  return { req, res };
}

describe("sendMail with a valid api key and real sendMail -- be careful as this could send email if transport is configured", () => {
  // this tests both that sendMail throws an error with a "status" attribute and
  // that api/sendMail takes "status" and relays it to the user as an http status code
  it("should 422 if no subject is provided and template has no subject function", async () => {
    const templateName = "ResetPassword";
    const template = moduleManifest.templates[templateName];

    expect(template).toBeDefined();
    expect(template.subject).toBeUndefined();

    const { req, res } = mockRequestResponse("POST");
    req.body = {
      to: "alex@mailing.run",
      templateName: templateName,
    };

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "sendMail couldn't find a subject for your email",
    });
  });
});
