/*
  Warnings:

  - You are about to drop the column `enddate` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `endtime` on the `Poll` table. All the data in the column will be lost.
  - The `sttime` column on the `Poll` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stdate` column on the `Poll` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `notPolledReason` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `option` to the `Polled` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `pollOptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notPolledReason" DROP CONSTRAINT "notPolledReason_pollid_fkey";

-- DropForeignKey
ALTER TABLE "notPolledReason" DROP CONSTRAINT "notPolledReason_studentId_fkey";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "enddate",
DROP COLUMN "endtime",
ADD COLUMN     "Instant" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "sttime",
ADD COLUMN     "sttime" TIMESTAMP(3),
DROP COLUMN "stdate",
ADD COLUMN     "stdate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Polled" ADD COLUMN     "option" INTEGER NOT NULL,
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'yashwanthviratkohli@gmail.com',
ALTER COLUMN "contactno" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pollOptions" ADD COLUMN     "count" INTEGER NOT NULL;

-- DropTable
DROP TABLE "notPolledReason";

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_option_fkey" FOREIGN KEY ("option") REFERENCES "pollOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
