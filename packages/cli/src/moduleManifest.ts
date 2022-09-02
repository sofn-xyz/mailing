import sendMail from "./emails";

import * as AccountCreatedPreview from "./emails/previews/AccountCreated";
import * as NewSignInPreview from "./emails/previews/NewSignIn";
import * as ReservationPreview from "./emails/previews/Reservation";
import * as ResetPasswordPreview from "./emails/previews/ResetPassword";

const previews = {
  AccountCreated: AccountCreatedPreview,
  NewSignIn: NewSignInPreview,
  Reservation: ReservationPreview,
  ResetPassword: ResetPasswordPreview,
};
const templates = {};
const config = {};

export { sendMail, config, templates, previews };
const moduleManifest = { sendMail, config, templates, previews };
export default moduleManifest;
