import React from "react";
import nodemailer from "nodemailer";

import {
  buildSendMail,
  mailing,
  getTestMailQueue,
  clearTestMailQueue,
} from "..";
import { Mjml, MjmlBody, MjmlRaw, MjmlText } from "mjml-react";

describe("index", () => {
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

  describe("getTestMailQueue", () => {
    let sendMail: (mail: mailing.ComponentMail) => Promise<any>;
    beforeEach(async () => {
      await clearTestMailQueue();
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

      sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
      });
    });

    it("add mail to queue in test mode", async () => {
      await sendMail({
        component: <div></div>,
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        subject: "hello",
        text: "ok",
        html: "ok",
      });
      expect((await getTestMailQueue()).length).toBe(1);

      await sendMail({
        component: (
          <Mjml>
            <MjmlBody>
              <MjmlRaw>Hello</MjmlRaw>
            </MjmlBody>
          </Mjml>
        ),
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        subject: "hello",
        text: "ok",
      });
      const queue = await getTestMailQueue();
      expect(queue.length).toBe(2);
      expect(queue[1].html).toMatch("Hello");
    });
  });
});
