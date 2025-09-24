/*
  Warnings:

  - Added the required column `photoId` to the `Highscore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Highscore" ADD COLUMN     "photoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Highscore" ADD CONSTRAINT "Highscore_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "public"."Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
