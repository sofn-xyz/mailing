import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
