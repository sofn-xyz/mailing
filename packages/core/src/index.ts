import type { SendMailOptions, Transporter } from "nodemailer";
import open from "open";
import fs from "fs-extra";
import { render } from "./mjml";
import { error, log } from "./util/serverLogger";
import fetch from "node-fetch";
import { capture } from "./util/postHog";
import instrumentHtml from "./util/instrumentHtml";

class MalformedInputError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = "MalformedInputError";
    this.status = 422;
  }
}

// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMailQueue.json";

export const EMAIL_PREFERENCES_URL = "MM_EMAIL_PREFERENCES_URL";

export type BuildSendMailOptions<T> = {
  transport: Transporter<T>;
  defaultFrom: string;
  configPath: string;
  processHtml?: (html: string) => string;
};

export type ComponentMail = SendMailOptions & {
  component?: JSX.Element;
  dangerouslyForceDeliver?: boolean;
  forcePreview?: boolean;
  previewServerUrl?: string;
  templateName?: string;
  previewName?: string;
  listName?: string;
};

export type Template<P> = React.FC<P> & {
  subject?: string | ((args: Partial<P>) => string);
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
    process.env.MAILING_INTEGRATION_TEST;

  const integrationTestMode = !!process.env.MAILING_INTEGRATION_TEST;

  if (!options?.transport) {
    throw new Error("buildSendMail options are missing transport");
  }
  if (!options?.defaultFrom) {
    throw new Error("buildSendMail options are missing defaultFrom");
  }

  return async function sendMail(mail: ComponentMail) {
    if (!mail.html && typeof mail.component === "undefined")
      throw new MalformedInputError(
        "sendMail requires either html or a component"
      );

    let anonymousId = "unknown";

    if ((sendMail as any).config) {
      anonymousId = (sendMail as any).config.anonymousId;
    }

    const { NODE_ENV, MAILING_API_URL, MAILING_API_KEY } = process.env;
    const {
      component,
      dangerouslyForceDeliver,
      templateName,
      previewName,
      previewServerUrl,
      forcePreview,
      listName,
      ...mailOptions
    } = mail;
    mailOptions as SendMailOptions;
    mailOptions.from ||= options.defaultFrom;

    const previewMode =
      forcePreview || (NODE_ENV !== "production" && !dangerouslyForceDeliver);

    const analyticsEnabled = !!(MAILING_API_URL && MAILING_API_KEY);

    // Get html from the rendered component if not provided
    let derivedTemplateName;
    if (component && !mailOptions.html) {
      const { html: renderedHtml, errors } = render(component, {
        processHtml: options.processHtml,
      });
      if (errors?.length) {
        error(errors);
        throw new MalformedInputError(
          `sendMail found errors while rendering your component: ${errors.join(
            ";"
          )}`
        );
      }
      derivedTemplateName = component.type.name;
      mailOptions.html = renderedHtml;
    }

    if (!mailOptions.html)
      throw new MalformedInputError("sendMail couldn't find your html");

    // Get subject from the component if not provided
    if (component && !mailOptions.subject) {
      if (typeof component.type.subject === "string") {
        mailOptions.subject = component.type.subject;
      } else if (typeof component.type.subject === "function") {
        mailOptions.subject = component.type.subject(component.props);
      }
    }

    if (!mailOptions.subject) {
      throw new MalformedInputError(
        "sendMail couldn't find a subject for your email"
      );
    }

    if (testMode && !dangerouslyForceDeliver) {
      const testMessageQueue = await getTestMailQueue();
      testMessageQueue.push(mailOptions);
      await fs.writeFile(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
      return;
    } else if (previewMode) {
      await openPreview(mail, mailOptions, previewServerUrl);
      return;
    }

    if (analyticsEnabled) {
      // unsubscribe link
      const emailPrefsRegex = new RegExp(EMAIL_PREFERENCES_URL, "g");
      let stringHtml = mailOptions.html?.toString();

      const htmlIncludesUnsubscribeLink = emailPrefsRegex.test(stringHtml);
      if (listName && !htmlIncludesUnsubscribeLink) {
        // return an error that you must include an unsubscribe link
        throw new MalformedInputError(
          "Templates sent to a list must include an unsubscribe link. Add an unsubscribe link or remove the list parameter from your sendMail call."
        );
      }

      const skipUnsubscribeChecks = !htmlIncludesUnsubscribeLink && !listName;

      const url = new URL("/api/messages", MAILING_API_URL).toString();

      const hookResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MAILING_API_KEY,
        },
        body: JSON.stringify({
          skipUnsubscribeChecks,
          anonymousId,
          templateName: templateName || derivedTemplateName,
          previewName,
          ...mailOptions,
          listName,
        }),
      });

      if (hookResponse.status === 200) {
        const { message, memberId, error } = await hookResponse.json();

        // Don't send to members that are not subscribed to the list
        if (error) {
          log("hookResponse returned error", error);
          return;
        }

        const messageId = message.id;

        if (stringHtml && memberId) {
          const emailPrefsUrl = new URL(
            `unsubscribe/${memberId}`,
            MAILING_API_URL
          ).toString();

          stringHtml = stringHtml.replace(emailPrefsRegex, emailPrefsUrl);

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
        return;
      }
    }

    // Send mail via nodemailer unless you are in integration tests.
    // sendMail is not mocked in integration tests, so don't call it at all, it will just fail
    // because of the invalid transport setting.
    const response = integrationTestMode
      ? "delivered!"
      : await options.transport.sendMail(mailOptions);
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

export async function openPreview(
  mail: ComponentMail,
  mailOptions: SendMailOptions,
  previewServerUrl?: string
) {
  const debugMail = {
    ...mail,
    html: "omitted",
  };

  log("💌 opening sendMail preview", debugMail);

  // create an intercept on the preview server
  // then open it in the browser
  const PREVIEW_SERVER_URL =
    ("string" === typeof previewServerUrl
      ? previewServerUrl.trim().replace(/\/+$/, "")
      : "http://localhost:3883") + "/intercepts";

  try {
    const response = await fetch(PREVIEW_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailOptions),
    });

    if (response.status === 201) {
      const { id } = (await response.json()) as { id: string };
      await open(`${PREVIEW_SERVER_URL}/${id}`);
    } else {
      error(`Error hitting ${PREVIEW_SERVER_URL}`);
      error(response);
    }
  } catch (e) {
    error(`Caught error 1 ${e}`);
    error("Is the mailing preview server running?");
  }
}

export { buildSendMail as default, render };
