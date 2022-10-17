import { User } from "../prisma/generated/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
