import { ReactElement, JSXElementConstructor } from "react";
import { Transporter } from "nodemailer";
import open from "open";
import { file } from "tmp-promise";
import fs from "fs";
import { render } from "mjml-react";

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

export default function buildSendMail(options: mailing.SendMailOptions) {
  const forcePreview =
    options.forcePreview ||
    (process.env.NODE_ENV === "development" && !options.forceDeliver);

  const testMode = process.env.TEST || process.env.NODE_ENV === "test";

  return async function sendMail(mail: mailing.ComponentMail) {
    const renderedComponent = render(mail.component);

    // Create a mail for nodemailer with the component rendered to HTML.
    const htmlMail = Object.assign(mail, {
      html: renderedComponent.html,
      component: undefined,
    });

    if (testMode) {
      const testMessageQueue = await getTestMessageQueue();
      testMessageQueue.push(htmlMail);
      fs.writeFileSync(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
      return;
    }

    if (forcePreview) {
      const { path } = await file();
      console.log("writing to path", path);
      fs.writeFileSync(path, renderedComponent.html);
      open(path);
      return;
    }

    await options.transport.sendMail(htmlMail);
  };
}
