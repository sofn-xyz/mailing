import sendMail from "../../../packages/cli/src/emails";
import * as TextEmail from "../../../packages/cli/src/emails/previews/TextEmail";
import * as Welcome from "../../../packages/cli/src/emails/previews/Welcome";
import * as TextEmailPreview from "../../../packages/cli/src/emails/previews/TextEmail";
import * as WelcomePreview from "../../../packages/cli/src/emails/previews/Welcome";

const previews = { TextEmail: TextEmailPreview, Welcome: WelcomePreview }
const templates = { TextEmail, Welcome }

export default { templates, previews, sendMail };

