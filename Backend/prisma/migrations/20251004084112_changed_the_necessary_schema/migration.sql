/*
  Warnings:

  - You are about to drop the column `score` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `option` on the `questionOptions` table. All the data in the column will be lost.
  - Added the required column `quesScore` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionDesc` to the `questionOptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Questions" DROP COLUMN "score",
ADD COLUMN     "quesScore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."questionOptions" DROP COLUMN "option",
ADD COLUMN     "optionDesc" TEXT NOT NULL;
