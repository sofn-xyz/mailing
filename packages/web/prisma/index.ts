import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaWeb: PrismaClient | undefined;
}

const prisma = global.prismaWeb || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prismaWeb = prisma;

export default prisma;
