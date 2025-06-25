/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Influencer" ("avatarUrl", "badges", "bio", "businessAccount", "createdAt", "expertise", "followers", "followersCount", "followings", "id", "mindshare", "moneyScore", "name", "platform", "poe", "poi", "pow", "profileUrl", "smartFollowers", "updatedAt", "username") SELECT "avatarUrl", "badges", "bio", "businessAccount", "createdAt", "expertise", "followers", "followersCount", "followings", "id", "mindshare", "moneyScore", "name", "platform", "poe", "poi", "pow", "profileUrl", "smartFollowers", "updatedAt", "username" FROM "Influencer";
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
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("avatarUrl", "category", "createdAt", "description", "discord", "engagement", "id", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website") SELECT "avatarUrl", "category", "createdAt", "description", "discord", "engagement", "id", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "twitterHandle" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_twitterHandle_key" ON "User"("twitterHandle");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
