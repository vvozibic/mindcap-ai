/*
  Warnings:

  - You are about to drop the column `followers` on the `Influencer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "followers",
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "tweetsCount" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
