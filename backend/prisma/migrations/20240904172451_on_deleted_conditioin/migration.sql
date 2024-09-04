-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_createdby_fkey";

-- DropForeignKey
ALTER TABLE "Polled" DROP CONSTRAINT "Polled_option_fkey";

-- DropForeignKey
ALTER TABLE "Polled" DROP CONSTRAINT "Polled_pollid_fkey";

-- DropForeignKey
ALTER TABLE "Polled" DROP CONSTRAINT "Polled_studrollno_fkey";

-- DropForeignKey
ALTER TABLE "pollOptions" DROP CONSTRAINT "pollOptions_pollid_fkey";

-- AddForeignKey
ALTER TABLE "pollOptions" ADD CONSTRAINT "pollOptions_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "Admin"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_option_fkey" FOREIGN KEY ("option") REFERENCES "pollOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_studrollno_fkey" FOREIGN KEY ("studrollno") REFERENCES "Student"("rollno") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
