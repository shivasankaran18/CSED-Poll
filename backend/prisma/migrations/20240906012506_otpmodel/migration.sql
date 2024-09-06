-- CreateTable
CREATE TABLE "OTPRequest" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTPRequest_pkey" PRIMARY KEY ("id")
);
