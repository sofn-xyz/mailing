import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaMailingWeb: PrismaClient | undefined;
}

const prisma = global.prismaMailingWeb || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prismaMailingWeb = prisma;

export default prisma;
