import config from "../../mailing.config.json";
import sendMail from "../../emails";
import TextEmail from "../../emails/TextEmail";
import Welcome from "../../emails/Welcome";
import * as TextEmailPreview from "../../emails/previews/TextEmail";
import * as WelcomePreview from "../../emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview };
const templates = { TextEmail, Welcome };

export { sendMail, config, templates, previews };
const moduleManifest = { sendMail, templates, previews };
export default moduleManifest;

