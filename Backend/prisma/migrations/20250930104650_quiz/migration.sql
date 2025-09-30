/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'student');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."UserRole" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Quiz" (
    "id" SERIAL NOT NULL,
    "quizname" TEXT NOT NULL,
    "time_limit" INTEGER,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questions" (
    "id" SERIAL NOT NULL,
    "quesdesc" TEXT NOT NULL,
    "quizid" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questionOptions" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "quesid" INTEGER NOT NULL,

    CONSTRAINT "questionOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."correctOption" (
    "questionid" INTEGER NOT NULL,
    "correctOptionid" INTEGER NOT NULL,

    CONSTRAINT "correctOption_pkey" PRIMARY KEY ("questionid","correctOptionid")
);

-- AddForeignKey
ALTER TABLE "public"."Questions" ADD CONSTRAINT "Questions_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "public"."Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."questionOptions" ADD CONSTRAINT "questionOptions_quesid_fkey" FOREIGN KEY ("quesid") REFERENCES "public"."Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."correctOption" ADD CONSTRAINT "correctOption_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "public"."Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."correctOption" ADD CONSTRAINT "correctOption_correctOptionid_fkey" FOREIGN KEY ("correctOptionid") REFERENCES "public"."questionOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
