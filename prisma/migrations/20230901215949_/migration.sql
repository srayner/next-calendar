/*
  Warnings:

  - You are about to alter the column `colour` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(7)`.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "colour" SET DATA TYPE CHAR(7);
