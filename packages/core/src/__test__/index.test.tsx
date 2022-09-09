import nodemailer from "nodemailer";

import {
  buildSendMail,
  getTestMailQueue,
  clearTestMailQueue,
  ComponentMail,
  BuildSendMailOptions,
} from "..";
import { Mjml, MjmlBody, MjmlRaw, MjmlText } from "mjml-react";
import * as log from "../util/log";

describe("index", () => {
  describe("buildSendMail", () => {
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

    it("returns a function", () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      expect(typeof sendMail).toBe("function");
    });

    it("throws a helpful runtime error without a transport and default email", () => {
      expect(() => {
        buildSendMail({} as BuildSendMailOptions);
      }).toThrow();
    });

    it("throws a runtime error without a component or html", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      await expect(async () => {
        await sendMail({});
      }).rejects.toThrow();
    });

    it("logs an error without a valid configPath but still sends", async () => {
      await clearTestMailQueue();
<<<<<<< Updated upstream
      const errorSpy = jest.spyOn(log, "error").mockImplementation(() => {});
=======
      const debugSpy = jest.spyOn(log, "debug").mockImplementation(() => {});
>>>>>>> Stashed changes

      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./garbage_path.json",
      });

      expect(debugSpy).toHaveBeenCalledWith(
        "error loading config at ./garbage_path.json"
      );

      await sendMail({
        component: <div></div>,
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        subject: "hello",
        text: "ok",
        html: "ok",
      });

      // still hits the queue even with the error
      const queue = await getTestMailQueue();
      expect(queue.length).toBe(1);
      debugSpy.mockRestore();
    });
  });

  describe("getTestMailQueue", () => {
    let sendMail: (mail: ComponentMail) => Promise<any>;
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
        configPath: "./mailing.config.json",
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
