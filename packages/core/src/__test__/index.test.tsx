import nodemailer from "nodemailer";
import React from "react";
import {
  buildSendMail,
  getTestMailQueue,
  clearTestMailQueue,
  ComponentMail,
  BuildSendMailOptions,
} from "..";
import { Mjml, MjmlBody, MjmlRaw } from "mjml-react";
import fetch from "node-fetch";
import * as postHog from "../util/postHog";
import * as log from "../util/log";
import fsExtra from "fs-extra";

jest.mock("../util/postHog");
jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

describe("index", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      MAILING_API_URL: undefined,
      MAILING_API_KEY: undefined,
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

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
        buildSendMail({} as BuildSendMailOptions<any>);
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

    it("should throw an error when called with a list using a template that does not have an unsubscribe link", async () => {
      expect("implement me").toBe("done");
      // const email = "testListSpecifiedButNoUnsub@test.com";
      // const fn = async () => {
      //   await apiSendMail("testApiKey", {
      //     ...ApiSendMail.defaultFormData,
      //     to: email,
      //     listName: "mylista4290",
      //     dangerouslyForceDeliver: true,
      //     templateName: "Minimal",
      //   });
      // };
      // expect(fn).rejects.toThrow(
      //   "The template AccountCreated does not contain an unsubscribe link"
      // );
      // expect(sendMailResponse.status).toBe(200);
      // // “Templates sent to a list must include an unsubscribe link. Add an unsubscribe link or remove the list parameter from your sendMail call.”
      // expect(await sendMailResponse.json()).toEqual({
      //   result: "delivered!",
      // });
      // // it should have created a message object
      // const messages = await prisma.message.findMany({});
      // expect(messages.length).toEqual(1);
      // const message = messages[0];
      // expect(message.to).toEqual([email]);
      // // get the MessageContent
      // const messageContentRecords = await prisma.messageContent.findMany();
      // expect(messageContentRecords.length).toEqual(1);
      // // it should contain an unsubscribe link
      // const messageContent = messageContentRecords[0];
      // expect(messageContent.html).toContain(
      //   `<a href="${EMAIL_PREFERENCES_URL}" target="_blank" rel="noreferrer">Unsubscribe</a>`
      // );
      // // it should have subscribed the member to the default list
      // const member = await prisma.member.findUnique({
      //   where: { listId_email: { listId: defaultListId, email } },
      // });
      // expect(member).toBeTruthy();
      // expect(member?.status).toBe("subscribed");
    });

    it("logs an error without a valid configPath but still sends", async () => {
      await clearTestMailQueue();
      const debugSpy = jest.spyOn(log, "debug").mockImplementation(jest.fn());

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

    describe("sendMail", () => {
      let mockSendMail = jest.fn();
      let mockCapture = jest.fn();

      beforeEach(() => {
        mockSendMail = jest.fn();
        mockCapture = jest.fn();
        jest.spyOn(transport, "sendMail").mockImplementation(mockSendMail);
        jest.spyOn(postHog, "capture").mockImplementation(mockCapture);
        jest.spyOn(fsExtra, "readFileSync").mockImplementation((path) => {
          if (/mailing\.config\.json/.test(path.toString())) {
            return JSON.stringify({
              typescript: true,
              emailsDir: "./emails",
              outDir: "./previews_html",
              anonymousId: "anonymousId",
            });
          } else {
            return "";
          }
        });
      });

      it("calls sendMail with correct arguments", async () => {
        const sendMail = buildSendMail({
          transport,
          defaultFrom: "from@mailing.dev",
          configPath: "./mailing.config.json",
        });
        await sendMail({
          to: ["ok@ok.com"],
          from: "ok@ok.com",
          subject: "hello",
          text: "ok",
          html: "ok",
          dangerouslyForceDeliver: true,
        });
        expect(mockSendMail).toHaveBeenCalled();
        expect(mockSendMail).toHaveBeenCalledWith({
          from: "ok@ok.com",
          html: "ok",
          subject: "hello",
          text: "ok",
          to: ["ok@ok.com"],
        });
      });

      it("calls calls capture with correct arguments", async () => {
        const sendMail = buildSendMail({
          transport,
          defaultFrom: "from@mailing.dev",
          configPath: "./mailing.config.json",
        });
        await sendMail({
          to: ["ok@ok.com"],
          from: "ok@ok.com",
          subject: "hello",
          text: "ok",
          html: "ok",
          dangerouslyForceDeliver: true,
        });
        expect(mockCapture).toHaveBeenCalled();
        expect(mockCapture).toHaveBeenCalledWith({
          distinctId: null,
          event: "mail sent",
          properties: {
            analyticsEnabled: false,
            recipientCount: 1,
          },
        });
      });

      describe("analyticsEnabled", () => {
        beforeEach(() => {
          process.env.MAILING_API_URL = "https://mailing.test";
          process.env.MAILING_API_KEY = "test_key";
        });

        it("hits message create api with correct arguments", async () => {
          const res = new Response(
            JSON.stringify({ message: { id: "message-1234" } }),
            {
              status: 200,
            }
          );

          (fetch as unknown as jest.Mock).mockResolvedValueOnce(
            Promise.resolve(res)
          );

          const sendMail = buildSendMail({
            transport,
            defaultFrom: "from@mailing.dev",
            configPath: "./mailing.config.json",
          });

          await sendMail({
            to: ["ok@ok.com"],
            from: "ok@ok.com",
            subject: "hello",
            text: "ok",
            html: "<body>ok</body>",
            dangerouslyForceDeliver: true,
          });
          expect(fetch).toHaveBeenCalled();
          expect(fetch).toHaveBeenCalledWith(
            "https://mailing.test/api/messages",
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": "test_key",
              },
              method: "POST",
              body: JSON.stringify({
                skipUnsubscribeChecks: true,
                anonymousId: null,
                to: ["ok@ok.com"],
                from: "ok@ok.com",
                subject: "hello",
                text: "ok",
                html: "<body>ok</body>",
              }),
            }
          );
          expect(mockSendMail).toHaveBeenCalled();
        });

        it("handles errors correctly", async () => {
          const res = new Response(
            JSON.stringify({ message: { id: "message-1234" } }),
            {
              status: 500,
            }
          );

          (fetch as unknown as jest.Mock).mockResolvedValueOnce(
            Promise.resolve(res)
          );

          const errorSpy = jest
            .spyOn(log, "error")
            .mockImplementation(jest.fn());

          const sendMail = buildSendMail({
            transport,
            defaultFrom: "from@mailing.dev",
            configPath: "./mailing.config.json",
          });

          await sendMail({
            to: ["ok@ok.com"],
            from: "ok@ok.com",
            subject: "hello",
            text: "ok",
            html: "<body>ok</body>",
            dangerouslyForceDeliver: true,
          });
          expect(fetch).toHaveBeenCalled();
          expect(fetch).toHaveBeenCalledWith(
            "https://mailing.test/api/messages",
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": "test_key",
              },
              method: "POST",
              body: JSON.stringify({
                skipUnsubscribeChecks: true,
                anonymousId: null,
                to: ["ok@ok.com"],
                from: "ok@ok.com",
                subject: "hello",
                text: "ok",
                html: "<body>ok</body>",
              }),
            }
          );
          expect(mockSendMail).toHaveBeenCalled();
          expect(errorSpy).toHaveBeenCalled();
        });
      });
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
