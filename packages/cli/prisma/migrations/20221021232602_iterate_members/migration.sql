/*
  Warnings:

  - A unique constraint covering the columns `[listId,email]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('subscribed', 'unsubscribed');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_listId_email_key" ON "Member"("listId", "email");
