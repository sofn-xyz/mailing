import sendMail from "./emails";

import AccountCreated from "./emails/AccountCreated";
import NewSignIn from "./emails/NewSignIn";
import Reservation from "./emails/Reservation";
import ResetPassword from "./emails/ResetPassword";
import Minimal from "./emails/Minimal";

import * as AccountCreatedPreview from "./emails/previews/AccountCreated";
import * as NewSignInPreview from "./emails/previews/NewSignIn";
import * as ReservationPreview from "./emails/previews/Reservation";
import * as ResetPasswordPreview from "./emails/previews/ResetPassword";
import * as MinimalPreview from "./emails/previews/Minimal";

const previews = {
  AccountCreated: AccountCreatedPreview,
  NewSignIn: NewSignInPreview,
  Reservation: ReservationPreview,
  ResetPassword: ResetPasswordPreview,
  Minimal: MinimalPreview,
};
const templates = {
  AccountCreated,
  Minimal,
  NewSignIn,
  Reservation,
  ResetPassword,
};
const config = { anonymousId: null };

export { sendMail, config, templates, previews };
const moduleManifest = { sendMail, config, templates, previews };
export default moduleManifest;
