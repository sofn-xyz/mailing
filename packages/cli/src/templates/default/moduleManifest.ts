import sendMail from "./emails";

import Welcome from "./emails/Welcome";

import * as WelcomePreview from "./emails/previews/Welcome";

const previews = {
  Welcome: WelcomePreview,
};
const templates = {
  Welcome,
};
const config = {};
const moduleManifest = { sendMail, config, templates, previews };

export { sendMail, config, templates, previews };
export default moduleManifest;
