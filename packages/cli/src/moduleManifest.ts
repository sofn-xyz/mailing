import TextEmail from "./emails/TextEmail";
import Welcome from "./emails/Welcome";
import * as TextEmailPreview from "./emails/previews/TextEmail";
import * as WelcomePreview from "./emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview };
const templates = { TextEmail, Welcome };
const config = {};

export { config, templates, previews };
const moduleManifest = { config, templates, previews };
export default moduleManifest;
