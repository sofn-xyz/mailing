/*
 * This file is only directly used in development and tests.
 * In production is it overwritten by the build process.
 */

import { existsSync } from "fs-extra";
import sendMailFromEmails from "./emails";
import Welcome from "./emails/Welcome";
import * as WelcomePreview from "./emails/previews/Welcome";

let sendMail = sendMailFromEmails;
let previews = {
  Welcome: WelcomePreview,
};
let templates = {
  Welcome,
};
let config = {};

// If we're running in a Jest worker, we want to use the mocked module manifest
if (process.env.JEST_WORKER_ID && existsSync("./__mocks__/moduleManifest")) {
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  const testManifest = require("./__mocks__/moduleManifest");
  sendMail = testManifest.sendMail;
  previews = testManifest.previews;
  templates = testManifest.templates;
  config = testManifest.config;
}

const manifest = { sendMail, config, templates, previews };
export { sendMail, config, templates, previews };
export default manifest;
