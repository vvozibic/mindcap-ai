/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Influencer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "badges" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "platform" TEXT,
    "businessAccount" BOOLEAN NOT NULL DEFAULT false,
    "followers" TEXT,
    "followings" TEXT,
    "expertise" TEXT,
    "profileUrl" TEXT,
    "mindshare" TEXT,
    "pow" TEXT,
    "poi" TEXT,
    "poe" TEXT,
    "smartFollowers" TEXT,
    "followersCount" TEXT,
    "moneyScore" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Influencer" ("avatarUrl", "bio", "createdAt", "expertise", "followers", "followersCount", "id", "mindshare", "moneyScore", "name", "platform", "poe", "poi", "pow", "profileUrl", "smartFollowers", "updatedAt", "username") SELECT "avatarUrl", "bio", "createdAt", "expertise", "followers", "followersCount", "id", "mindshare", "moneyScore", "name", "platform", "poe", "poi", "pow", "profileUrl", "smartFollowers", "updatedAt", "username" FROM "Influencer";
DROP TABLE "Influencer";
ALTER TABLE "new_Influencer" RENAME TO "Influencer";
CREATE UNIQUE INDEX "Influencer_username_key" ON "Influencer"("username");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "website" TEXT,
    "launchDate" DATETIME,
    "marketCap" TEXT,
    "avatarUrl" TEXT,
    "mindshare" TEXT,
    "kolAttention" TEXT,
    "engagement" TEXT,
    "trustScore" TEXT,
    "discord" TEXT,
    "twitter" TEXT,
    "telegram" TEXT,
    "rewardPoolUsd" TEXT,
    "rewardRank" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("category", "createdAt", "description", "discord", "engagement", "id", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website") SELECT "category", "createdAt", "description", "discord", "engagement", "id", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
