/*
  Warnings:

  - The `smartFollowers` column on the `Influencer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "avgLikes" INTEGER,
ADD COLUMN     "avgViews" INTEGER,
ADD COLUMN     "engagementRate" DOUBLE PRECISION,
ADD COLUMN     "kolScore" INTEGER,
ADD COLUMN     "protokolsJsonRaw" JSONB,
ADD COLUMN     "totalPosts" INTEGER,
DROP COLUMN "smartFollowers",
ADD COLUMN     "smartFollowers" INTEGER;
