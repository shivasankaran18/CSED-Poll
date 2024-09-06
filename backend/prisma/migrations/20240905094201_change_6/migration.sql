/*
  Warnings:

  - Made the column `sttime` on table `Poll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stdate` on table `Poll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "sttime" SET NOT NULL,
ALTER COLUMN "stdate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" DROP DEFAULT;
