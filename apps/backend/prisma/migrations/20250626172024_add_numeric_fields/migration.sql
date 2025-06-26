/*
  Warnings:

  - Made the column `followings` on table `Influencer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followersCount` on table `Influencer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tweetsCount` on table `Influencer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "followersCountNumeric" INTEGER DEFAULT 0,
ADD COLUMN     "followingsNumeric" INTEGER DEFAULT 0,
ADD COLUMN     "tweetsCountNumeric" INTEGER DEFAULT 0,
ALTER COLUMN "followings" SET NOT NULL,
ALTER COLUMN "followersCount" SET NOT NULL,
ALTER COLUMN "tweetsCount" SET NOT NULL;
