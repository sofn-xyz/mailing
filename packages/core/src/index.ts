import type { SendMailOptions, Transporter } from "nodemailer";

import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { error, log, debug } from "./util/log";
import fetch from "node-fetch";
import { capture } from "./util/postHog";

// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMailQueue.json";

export type BuildSendMailOptions<T> = {
  transport: Transporter<T>;
  defaultFrom: string;
  configPath: string;
};

export type MailingOptions = SendMailOptions & {
  component?: JSX.Element;
  dangerouslyForceDeliver?: boolean;
  forcePreview?: boolean;
  templateName?: string;
  previewName?: string;
};

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

  return async function sendMail(mail: MailingOptions) {
    if (!mail.html && typeof mail.component === "undefined")
      throw new Error("sendMail requires either html or a component");

    const { NODE_ENV, MAILING_API_URL, MAILING_API_KEY, MAILING_DATABASE_URL } =
      process.env;
    const {
      component,
      dangerouslyForceDeliver,
      templateName,
      previewName,
      forcePreview,
      ...mailOptions
    } = mail;
    mailOptions as SendMailOptions;
    mailOptions.from ||= options.defaultFrom;

    const previewMode =
      forcePreview || (NODE_ENV !== "production" && !dangerouslyForceDeliver);

    const apiMode = MAILING_API_URL && MAILING_API_KEY && MAILING_DATABASE_URL;

    // Get html from the rendered component if not provided
    let derivedTemplateName;
    if (component && !mailOptions.html) {
      const { html: renderedHtml, errors } = render(component);
      if (errors?.length) {
        error(errors);
        throw new Error(errors.join(";"));
      }
      derivedTemplateName = component.type.name;
      mailOptions.html = renderedHtml;
    }

    if (testMode) {
      const testMessageQueue = await getTestMailQueue();
      testMessageQueue.push(mailOptions);
      await fs.writeFile(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
      return;
    } else if (previewMode) {
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
          body: JSON.stringify(mailOptions),
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
    } else if (apiMode) {
      /* TODO:
      /  - call mailing api to track sends
      /  - mutate email to add url proxies and tracking pixels
      */
      console.log({
        templateName: templateName || derivedTemplateName,
        previewName,
      });
    }

    // Send mail via nodemailer
    const response = await options.transport.sendMail(mailOptions);
    await capture({
      event: "mail sent",
      distinctId: anonymousId,
      properties: {
        hasDB: !!MAILING_DATABASE_URL,
      },
    });

    return response;
  };
}

export { buildSendMail as default, render };
