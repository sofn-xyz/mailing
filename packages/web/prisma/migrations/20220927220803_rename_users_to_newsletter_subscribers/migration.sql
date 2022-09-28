-- This is an empty migration.
ALTER TABLE "User" RENAME TO "NewsletterSubscriber";
ALTER INDEX "User_pkey" RENAME TO "NewsletterSubscriber_pkey";
ALTER INDEX "User_email_key" RENAME TO "NewsletterSubscriber_email_key";
