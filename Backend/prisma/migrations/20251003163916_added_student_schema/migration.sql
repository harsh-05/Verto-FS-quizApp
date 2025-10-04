/*
  Warnings:

  - You are about to drop the column `quizname` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `score` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizDesc` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Questions" ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Quiz" DROP COLUMN "quizname",
ADD COLUMN     "quizDesc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."studentResult" (
    "studentId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "corrects" INTEGER NOT NULL,
    "incorrects" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."studentSelections" (
    "studentId" INTEGER NOT NULL,
    "quesId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "studentResult_studentId_quizId_key" ON "public"."studentResult"("studentId", "quizId");

-- CreateIndex
CREATE UNIQUE INDEX "studentSelections_studentId_quesId_optionId_key" ON "public"."studentSelections"("studentId", "quesId", "optionId");

-- AddForeignKey
ALTER TABLE "public"."studentResult" ADD CONSTRAINT "studentResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."studentResult" ADD CONSTRAINT "studentResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "public"."Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."studentSelections" ADD CONSTRAINT "studentSelections_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."studentSelections" ADD CONSTRAINT "studentSelections_quesId_fkey" FOREIGN KEY ("quesId") REFERENCES "public"."Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."studentSelections" ADD CONSTRAINT "studentSelections_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."questionOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
