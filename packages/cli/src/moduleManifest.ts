import sendMail from "./emails";

import AccountCreated from "./emails/AccountCreated";
import NewSignIn from "./emails/NewSignIn";
import Reservation from "./emails/Reservation";
import ResetPassword from "./emails/ResetPassword";

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
const templates = { AccountCreated, NewSignIn, Reservation, ResetPassword };
const config = { anonymousId: null };
const bundleId = 0;

export { sendMail, config, templates, previews, bundleId };
const moduleManifest = { sendMail, config, templates, previews, bundleId };
export default moduleManifest;
