import { NextApiRequest, NextApiResponse } from "next";
import moduleManifest from "../../../moduleManifest";
import handler from "../sendMail";

// api authentication is tested in __integration__/sendMail.test.ts so don't also test it here
jest.mock("../../../util/validate/validateApiKey", () => ({
  validateApiKey: async () => true,
}));

jest.mock("../../../moduleManifest", () => {
  const originalModule = jest.requireActual("../../../__mocks__/moduleManifest");
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
  req.headers = { "Content-Type": "application/json" };
  return { req, res };
}

describe("sendMail with a valid api key and mockeded sendMail", () => {
  it("should 422 if no to, cc, or bcc is provided", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      templateName: "AccountCreated",
      props: { name: "Alex" },
    };

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "to, cc, or bcc must be specified",
    });
  });

  it("should 422 if no templateName is provided", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      to: "alex@mailing.run",
      props: { name: "Alex" },
    };

    delete req.body.templateName;
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "templateName or html must be specified",
    });
  });

  it("should 422 if template does not exist", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      to: "alex@mailing.run",
      templateName: "FAKE",
      props: { name: "Alex" },
    };

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Template FAKE not found in list of templates: AccountCreated, NewSignIn, Reservation, ResetPassword",
      mjmlErrors: undefined,
    });
  });

  it("should 200 with valid arguments -- subject is provided as a function on the template", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      to: "alex@mailing.run",
      templateName: "AccountCreated",
      props: { name: "Alex" },
    };

    expect(typeof moduleManifest.templates.AccountCreated.subject).toBe(
      "function"
    );

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(moduleManifest.sendMail).toHaveBeenCalled();
  });

  it("should 200 with valid arguments -- subject is provided", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      to: "alex@mailing.run",
      templateName: "AccountCreated",
      subject: "Welcome to Mailing Run",
      props: { name: "Alex" },
    };

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(moduleManifest.sendMail).toHaveBeenCalled();

    // it uses the subject provided
    expect(moduleManifest.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "Welcome to Mailing Run" })
    );
  });
});
