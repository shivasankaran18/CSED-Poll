-- CreateTable
CREATE TABLE "Student" (
    "rollno" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "contactno" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollno")
);

-- CreateTable
CREATE TABLE "Admin" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "section" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "pollOptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reason" BOOLEAN NOT NULL DEFAULT false,
    "pollid" INTEGER NOT NULL,

    CONSTRAINT "pollOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notPolledReason" (
    "id" SERIAL NOT NULL,
    "pollid" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "notPolledReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,
    "stdate" TEXT NOT NULL,
    "enddate" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'General',
    "count" INTEGER NOT NULL,
    "createdby" TEXT NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polled" (
    "id" SERIAL NOT NULL,
    "pollid" INTEGER NOT NULL,
    "studrollno" TEXT NOT NULL,

    CONSTRAINT "Polled_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pollOptions" ADD CONSTRAINT "pollOptions_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notPolledReason" ADD CONSTRAINT "notPolledReason_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notPolledReason" ADD CONSTRAINT "notPolledReason_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "Admin"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_studrollno_fkey" FOREIGN KEY ("studrollno") REFERENCES "Student"("rollno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polled" ADD CONSTRAINT "Polled_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
