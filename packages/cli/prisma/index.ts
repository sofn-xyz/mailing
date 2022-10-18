import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaCli: PrismaClient<any> | undefined;
}

const prisma = global.prismaCli || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prismaCli = prisma;

export default prisma;
