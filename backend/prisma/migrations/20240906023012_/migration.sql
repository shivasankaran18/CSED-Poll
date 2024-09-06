/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OTPRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTPRequest_email_key" ON "OTPRequest"("email");
