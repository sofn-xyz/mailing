/*
 * This file is only directly used in development and tests.
 * In production is it overwritten by the build process.
 */

import sendMailFromEmails from "./emails";
import Welcome from "./emails/Welcome";
import * as WelcomePreview from "./emails/previews/Welcome";

const sendMail = sendMailFromEmails;
const previews = {
  Welcome: WelcomePreview,
};
const templates = {
  Welcome,
};
const config = {};

const manifest = { sendMail, config, templates, previews };
export { sendMail, config, templates, previews };
export default manifest;
