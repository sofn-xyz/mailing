-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "clientSecret" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OauthAuthorizationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "OauthAuthorizationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OauthAuthorizationCode_userId_idx" ON "OauthAuthorizationCode"("userId");

-- AddForeignKey
ALTER TABLE "OauthAuthorizationCode" ADD CONSTRAINT "OauthAuthorizationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OauthAuthorizationCode" ADD CONSTRAINT "OauthAuthorizationCode_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
