import nodemailer from "nodemailer";

import { buildSendMail, mailing } from "../";

describe("buildSendMail", () => {
  it("returns a function", () => {
    const transport = nodemailer.createTransport({
      pool: true,
      host: "smtp.example.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: "username",
        pass: "password",
      },
    });

    const sendMail = buildSendMail({
      transport,
      defaultFrom: "replace@me.with.your.com",
    });

    expect(typeof sendMail).toBe("function");
  });

  it("throws a helpful runtime error without a transport and default email", () => {
    expect(() => {
      buildSendMail({} as mailing.SendMailOptions);
    }).toThrow();
  });
});
