import sendMail from "../../../packages/cli/src/emails";
import TextEmail from "../../../packages/cli/src/emails/TextEmail";
import Welcome from "../../../packages/cli/src/emails/Welcome";
import * as TextEmailPreview from "../../../packages/cli/src/emails/previews/TextEmail";
import * as WelcomePreview from "../../../packages/cli/src/emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview }
const templates = { TextEmail, Welcome }

export { templates, previews, sendMail };
export default { templates, previews, sendMail };

