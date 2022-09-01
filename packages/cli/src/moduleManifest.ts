import sendMail from "./emails";
import TextEmail from "./emails/TextEmail";

import Welcome from "./emails/Welcome";
import * as TextEmailPreview from "./emails/previews/TextEmail";
import * as WelcomePreview from "./emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview };
const templates = { TextEmail, Welcome };
const config = { anonymousId: null };

export { sendMail, config, templates, previews };
const moduleManifest = { sendMail, config, templates, previews };
export default moduleManifest;
