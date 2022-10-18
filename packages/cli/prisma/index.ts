import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaMailingCli: PrismaClient<any> | undefined;
}

const prisma = global.prismaMailingCli || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prismaMailingCli = prisma;

export default prisma;
