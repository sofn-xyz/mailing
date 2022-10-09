import { PrismaClient } from "@prisma/client";

declare global {
  const prisma: PrismaClient;
}
