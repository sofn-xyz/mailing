/*
  Warnings:

  - Added the required column `clientSecret` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "clientSecret" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OauthAccessToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OauthAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OauthAccessToken_token_key" ON "OauthAccessToken"("token");

-- CreateIndex
CREATE INDEX "OauthAccessToken_userId_idx" ON "OauthAccessToken"("userId");

-- AddForeignKey
ALTER TABLE "OauthAccessToken" ADD CONSTRAINT "OauthAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
