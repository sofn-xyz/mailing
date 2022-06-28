import { ReactElement, JSXElementConstructor } from "react";
import nodemailer from "nodemailer";
import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { debug, error, log } from "./log";
import fetch from "node-fetch";

export namespace mailing {
  export type ComponentMail = nodemailer.SendMailOptions & {
    component: ReactElement<any, string | JSXElementConstructor<any>>;
  };
  export type SendMailOptions = {
    transport: nodemailer.Transporter;
    defaulFrom?: string;
    forceDeliver?: boolean;
    forcePreview?: boolean;
  };
}

// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMessageQueue.json";

export async function getTestMessageQueue() {
  if (!process.env.TEST || process.env.NODE_ENV === "test") {
    throw new Error("tried to get test message queue not in test mode");
  }

  try {
    const queue = await fs.readFileSync(TMP_TEST_FILE);
    return JSON.parse(queue.toString());
  } catch (e) {
    return [];
  }
}

export function buildSendMail(options: mailing.SendMailOptions) {
  const forcePreview =
    options.forcePreview ||
    (process.env.NODE_ENV !== "production" && !options.forceDeliver);

  const testMode = process.env.TEST || process.env.NODE_ENV === "test";

  return async function sendMail(mail: mailing.ComponentMail) {
    log("sendMail", mail);
    const { html, errors } = mail.html
      ? { html: mail.html, errors: [] }
      : render(mail.component);

    if (errors?.length) {
      error(errors);
      throw new Error(errors.join(";"));
    }

    // Create a mail for nodemailer with the component rendered to HTML.
    const htmlMail = {
      ...mail,
      html: html,
      component: undefined,
    };

    if (testMode) {
      const testMessageQueue = await getTestMessageQueue();
      testMessageQueue.push(htmlMail);
      fs.writeFileSync(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
      return;
    }

    if (forcePreview) {
      // open on preview server url
      // hit echo endpoint with html
      const PREVIEW_SERVER_URL = "http://localhost:3883/intercepts";
      try {
        const response = await fetch(PREVIEW_SERVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(htmlMail),
        });
        if (response.status === 201) {
          const { id } = (await response.json()) as { id: string };
          open(`${PREVIEW_SERVER_URL}/${id}`);
        } else {
          error(`Error hitting ${PREVIEW_SERVER_URL}`);
          error(response);
        }
      } catch (e) {
        error(`Caught error ${e}`);
        error("Is the mailing preview server running?");
      }

      return;
    }

    await options.transport.sendMail(htmlMail);
  };
}

export default { buildSendMail };
