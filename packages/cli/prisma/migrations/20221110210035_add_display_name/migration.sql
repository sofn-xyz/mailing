/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "displayName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");
