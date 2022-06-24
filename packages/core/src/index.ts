import { ReactElement, JSXElementConstructor } from "react";
import { Transporter } from "nodemailer";
import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { log } from "./log";
import fetch from "node-fetch";

namespace mailing {
  export type ComponentMail = {
    from: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    component: ReactElement<any, string | JSXElementConstructor<any>>;
    text?: string;
    headers?: { [key: string]: string };
  };
  export type SendMailOptions = {
    transport: Transporter;
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
    (process.env.NODE_ENV === "development" && !options.forceDeliver);

  const testMode = process.env.TEST || process.env.NODE_ENV === "test";

  return async function sendMail(mail: mailing.ComponentMail) {
    const { html, errors } = render(mail.component);

    // Create a mail for nodemailer with the component rendered to HTML.
    const htmlMail = Object.assign(mail, {
      html: html,
      component: undefined,
    });

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
      console.log("fetchin");
      const response = await fetch(PREVIEW_SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(htmlMail),
      });
      console.log("hi");
      if (response.status === 200) {
        const { id } = (await response.json()) as { id: string };
        open(`${PREVIEW_SERVER_URL}/${id}`);
      } else {
        log(`mailing preview server not found at ${PREVIEW_SERVER_URL}`);
      }
    }

    await options.transport.sendMail(htmlMail);
  };
}

export default { buildSendMail };
