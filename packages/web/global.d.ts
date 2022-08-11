import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}
