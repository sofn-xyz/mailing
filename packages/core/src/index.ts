import type { SendMailOptions, Transporter } from "nodemailer";
import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { error, log, debug } from "./util/log";
import fetch from "node-fetch";
import { capture } from "./util/postHog";
import instrumentHtml from "./util/instrumentHtml";

// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMailQueue.json";

export type BuildSendMailOptions<T> = {
  transport: Transporter<T>;
  defaultFrom: string;
  configPath: string;
};

export type ComponentMail = SendMailOptions & {
  component?: JSX.Element;
  dangerouslyForceDeliver?: boolean;
  forcePreview?: boolean;
  templateName?: string;
  previewName?: string;
  listId?: string;
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

  return async function sendMail(mail: ComponentMail) {
    if (!mail.html && typeof mail.component === "undefined")
      throw new Error("sendMail requires either html or a component");

    const { NODE_ENV, MAILING_API_URL, MAILING_API_KEY } = process.env;
    const {
      component,
      dangerouslyForceDeliver,
      templateName,
      previewName,
      forcePreview,
      listId,
      ...mailOptions
    } = mail;
    mailOptions as SendMailOptions;
    mailOptions.from ||= options.defaultFrom;

    const previewMode =
      forcePreview || (NODE_ENV !== "production" && !dangerouslyForceDeliver);

    const analyticsEnabled = MAILING_API_URL && MAILING_API_KEY;

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

    if (testMode && !dangerouslyForceDeliver) {
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
        error(`Caught error 1 ${e}`);
        error("Is the mailing preview server running?");
      }
      return;
    }

    if (analyticsEnabled) {
      const url = new URL("/api/messages", MAILING_API_URL).toString();

      const hookResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MAILING_API_KEY,
        },
        body: JSON.stringify({
          anonymousId,
          templateName: templateName || derivedTemplateName,
          previewName,
          ...mailOptions,
          listId,
        }),
      });

      if (hookResponse.status === 200) {
        const {
          message: { id: messageId },
          memberId,
          error,
        } = await hookResponse.json();

        if (error) {
          log("hookResponse returned error", error);
          return;
        }

        let stringHtml = mailOptions.html?.toString();

        if (stringHtml) {
          const emailPrefsUrl = new URL(
            `unsubscribe/${memberId}`,
            MAILING_API_URL
          ).toString();

          stringHtml = stringHtml.replace(
            /MM_EMAIL_PREFERENCES_URL/g,
            emailPrefsUrl
          );

          console.log("stringHtml is now", stringHtml);

          mailOptions.html = instrumentHtml({
            html: stringHtml,
            messageId: messageId,
            apiUrl: MAILING_API_URL,
          });
        }
      } else {
        const json = await hookResponse.json();
        error("Error calling mailing api hook", {
          status: hookResponse.status,
          statuSText: hookResponse.statusText,
          json,
        });
      }
    }

    // Send mail via nodemailer
    const response = await options.transport.sendMail(mailOptions);
    await capture({
      event: "mail sent",
      distinctId: anonymousId,
      properties: {
        recipientCount:
          Array(mailOptions.to).filter(Boolean).length +
          Array(mailOptions.cc).filter(Boolean).length +
          Array(mailOptions.bcc).filter(Boolean).length,
        analyticsEnabled,
      },
    });

    return response;
  };
}

export { buildSendMail as default, render };
