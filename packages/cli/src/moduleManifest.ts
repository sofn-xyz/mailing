import config from "../mailing.config.json";
import sendMail from "./emails";

// template imports
import AccountCreated from "./emails/AccountCreated";
import NewSignIn from "./emails/NewSignIn";
import Reservation from "./emails/Reservation";
import ResetPassword from "./emails/ResetPassword";

// preview imports
import * as AccountCreatedPreview from "./emails/previews/AccountCreated";
import * as NewSignInPreview from "./emails/previews/NewSignIn";
import * as ReservationPreview from "./emails/previews/Reservation";
import * as ResetPasswordPreview from "./emails/previews/ResetPassword";

const previews = { AccountCreated: AccountCreatedPreview, NewSignIn: NewSignInPreview, Reservation: ReservationPreview, ResetPassword: ResetPasswordPreview };
const templates = { AccountCreated, NewSignIn, Reservation, ResetPassword };
const bundleId = 1668629897648;

export { sendMail, config, templates, previews, bundleId };
const moduleManifest = { sendMail, templates, previews, bundleId };
export default moduleManifest;
