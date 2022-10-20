import { ReactElement, JSXElementConstructor } from "react";
import type { SendMailOptions, Transporter } from "nodemailer";
import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { error, log, debug } from "./util/log";
import fetch from "node-fetch";
import { capture } from "./util/postHog";

export type ComponentMail = SendMailOptions & {
  component?: ReactElement<any, string | JSXElementConstructor<any>>;
  dangerouslyForceDeliver?: boolean;
  forcePreview?: boolean;
};
export type BuildSendMailOptions<T> = {
  transport: Transporter<T>;
  defaultFrom: string;
  configPath: string;
};

// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMailQueue.json";

export async function getTestMailQueue() {
  try {
    const queue = await fs.readFile(TMP_TEST_FILE);
    return JSON.parse(queue.toString());
  } catch (e) {
    return [];
  }
}

export async function clearTestMailQueue() {
  if (!(process.env.TEST || process.env.NODE_ENV === "test")) {
    throw new Error("tried to clear test mail queue not in test mode");
  }

  try {
    fs.unlinkSync(TMP_TEST_FILE);
  } catch (e: any) {
    if (e.code === "ENOENT") return; // file does not exist
    throw e;
  }
}

export function buildSendMail<T>(options: BuildSendMailOptions<T>) {
  const testMode =
    process.env.TEST ||
    process.env.NODE_ENV === "test" ||
    process.env.MAILING_CI;

  if (!options?.transport) {
    throw new Error("buildSendMail options are missing transport");
  }
  if (!options?.defaultFrom) {
    throw new Error("buildSendMail options are missing defaultFrom");
  }

  let anonymousId = "unknown";
  try {
    const configRaw = fs.readFileSync(options.configPath).toString();
    const config = JSON.parse(configRaw);
    anonymousId =
      process.env.NODE_ENV === "production" ? config.anonymousId : null;
  } catch (e) {
    if (!options.configPath) {
      debug("buildSendMail requires configPath");
    } else {
      debug(`error loading config at ${options.configPath}`);
    }
  }

  return async function sendMail(mail: ComponentMail) {
    const forcePreview =
      mail.forcePreview ||
      (process.env.NODE_ENV !== "production" && !mail.dangerouslyForceDeliver);

    if (!mail.html && typeof mail.component === "undefined")
      throw new Error("sendMail requires either html or a component");

    const { html, errors } =
      mail.html || !mail.component
        ? { html: mail.html, errors: [] }
        : render(mail.component);

    if (errors?.length) {
      error(errors);
      throw new Error(errors.join(";"));
    }

    // Create a mail for nodemailer with the component rendered to HTML.
    const htmlMail = {
      from: options.defaultFrom,
      ...mail,
      html: html,
      component: undefined,
      dangerouslyForceDeliver: undefined,
      forcePreview: undefined,
    };
    delete htmlMail.component;
    delete htmlMail.dangerouslyForceDeliver;
    delete htmlMail.forcePreview;

    if (testMode) {
      const testMessageQueue = await getTestMailQueue();
      testMessageQueue.push(htmlMail);
      await fs.writeFile(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
      return;
    }

    if (forcePreview) {
      const debugMail = {
        ...mail,
        html: "omitted",
      };
      log("💌 opening sendMail preview", debugMail);
      // create an intercept on the preview server
      // then open it in the browser
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

    const response = await options.transport.sendMail(htmlMail);
    await capture({
      distinctId: anonymousId,
      event: "mail sent",
    });

    return response;
  };
}

export { buildSendMail as default, render };
