import sendMail from "./emails";

import * as TextEmailPreview from "./emails/previews/TextEmail";
import * as WelcomePreview from "./emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview };
const templates = {  };

export { templates, previews, sendMail };
const moduleManifest = { templates, previews, sendMail };
export default moduleManifest;

