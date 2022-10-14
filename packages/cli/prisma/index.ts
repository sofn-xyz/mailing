import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<any>;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
