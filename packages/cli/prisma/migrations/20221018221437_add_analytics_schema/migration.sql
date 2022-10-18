-- CreateTable
CREATE TABLE "EmailContent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "html" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sendId" TEXT NOT NULL,

    CONSTRAINT "EmailContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Send" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateName" TEXT NOT NULL,
    "previewName" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3),
    "openCount" INTEGER NOT NULL DEFAULT 0,
    "openLocation" TEXT,
    "emailContentId" TEXT NOT NULL,

    CONSTRAINT "Send_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "sendId" TEXT NOT NULL,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailContent_sendId_idx" ON "EmailContent"("sendId");

-- CreateIndex
CREATE INDEX "Send_to_idx" ON "Send"("to");

-- CreateIndex
CREATE INDEX "Send_templateName_previewName_idx" ON "Send"("templateName", "previewName");

-- CreateIndex
CREATE INDEX "Click_sendId_idx" ON "Click"("sendId");

-- AddForeignKey
ALTER TABLE "Send" ADD CONSTRAINT "Send_emailContentId_fkey" FOREIGN KEY ("emailContentId") REFERENCES "EmailContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_sendId_fkey" FOREIGN KEY ("sendId") REFERENCES "Send"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
