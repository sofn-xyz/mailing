import nodemailer from "nodemailer";
import React from "react";
import {
  buildSendMail,
  getTestMailQueue,
  clearTestMailQueue,
  ComponentMail,
  BuildSendMailOptions,
} from "..";
import { Mjml, MjmlBody, MjmlRaw } from "@faire/mjml-react";
import fetch from "node-fetch";
import open from "open";
import * as serverLogger from "../util/serverLogger";
import fsExtra from "fs-extra";

jest.mock("node-fetch");
jest.mock("open");

const { Response } = jest.requireActual("node-fetch");

describe("index", () => {
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

  beforeEach(async () => {
    await clearTestMailQueue();
    jest.spyOn(serverLogger, "log").mockImplementation(() => undefined);
  });

  describe("openPreview", () => {
    it("should open preview", async () => {
      const previewServerUrl = "http://localhost:12345";
      const interceptId = "abc-xyz-123";
      const previewServerUrlIntercepts = `${previewServerUrl}/intercepts`;

      const previewServerUrlInterceptId = `${previewServerUrlIntercepts}/${interceptId}`;

      const res = new Response(JSON.stringify({ id: interceptId }), {
        status: 201,
      });

      (fetch as unknown as jest.Mock).mockResolvedValueOnce(
        Promise.resolve(res)
      );

      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      // call sendMail and force it to use the openPreview function
      await sendMail({
        component: <div></div>,
        subject: "hello world",
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        text: "ok",
        html: "ok",
        dangerouslyForceDeliver: true,
        forcePreview: true,
        previewServerUrl,
      });

      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        previewServerUrlIntercepts,
        expect.anything()
      );

      expect(open).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith(previewServerUrlInterceptId);
    });
  });

  describe("subject", () => {
    it("throws an error if missing subject", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      const callSendMail = async () =>
        await sendMail({
          component: <div></div>,
          to: ["ok@ok.com"],
          from: "ok@ok.com",
          text: "ok",
          html: "ok",
        });

      await expect(callSendMail()).rejects.toThrowError(
        "sendMail couldn't find a subject for your email"
      );
    });

    it("should use subject from options", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

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
      const email = queue[0];
      expect(email.subject).toEqual("hello");
    });

    it("should use subject from the component - subject is function", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      const Component = ({ name }: { name: string }) => <div>{name}</div>;
      Component.subject = ({ name }: { name: string }) => `Hello ${name}`;

      await sendMail({
        component: <Component name="Gerald" />,
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        text: "ok",
        html: "ok",
      });

      // still hits the queue even with the error
      const queue = await getTestMailQueue();
      expect(queue.length).toBe(1);
      const email = queue[0];
      expect(email.subject).toEqual("Hello Gerald");
    });

    it("should use subject from the component - subject is string", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      const Component = ({ name }: { name: string }) => <div>{name}</div>;
      Component.subject = "Hello world";

      await sendMail({
        component: <Component name="Gerald" />,
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        text: "ok",
        html: "ok",
      });

      // still hits the queue even with the error
      const queue = await getTestMailQueue();
      expect(queue.length).toBe(1);
      const email = queue[0];
      expect(email.subject).toEqual("Hello world");
    });

    it("should prefer subject from options to subject from component", async () => {
      const sendMail = buildSendMail({
        transport,
        defaultFrom: "replace@me.with.your.com",
        configPath: "./mailing.config.json",
      });

      const Component = ({ name }: { name: string }) => <div>{name}</div>;
      Component.subject = "Hello world";

      await sendMail({
        component: <Component name="Gerald" />,
        to: ["ok@ok.com"],
        from: "ok@ok.com",
        text: "ok",
        html: "ok",
        subject: "precedence",
      });

      // still hits the queue even with the error
      const queue = await getTestMailQueue();
      expect(queue.length).toBe(1);
      const email = queue[0];
      expect(email.subject).toEqual("precedence");
    });
  });

  describe("analyticsEnabled: false", () => {
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

      it("still sends with an invalid configPath", async () => {
        const sendMail = buildSendMail({
          transport,
          defaultFrom: "replace@me.with.your.com",
          configPath: "./garbage_path.json",
        });

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
      });

      describe("sendMail", () => {
        let mockSendMail = jest.fn();

        beforeEach(() => {
          mockSendMail = jest.fn();
          jest.spyOn(transport, "sendMail").mockImplementation(mockSendMail);
          jest.spyOn(fsExtra, "readFileSync").mockImplementation((path) => {
            if (/mailing\.config\.json/.test(path.toString())) {
              return JSON.stringify({
                typescript: true,
                emailsDir: "./emails",
                outDir: "./previews_html",
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
      });
    });

    describe("getTestMailQueue", () => {
      let sendMail: (mail: ComponentMail) => Promise<any>;
      beforeEach(async () => {
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
});
