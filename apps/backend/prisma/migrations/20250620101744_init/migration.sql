/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Influencer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `engagement` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `handle` on the `Influencer` table. All the data in the column will be lost.
  - The primary key for the `Mention` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Mention` table. All the data in the column will be lost.
  - You are about to drop the column `tweetId` on the `Mention` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Mention` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `links` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Project` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Influencer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "platform" TEXT NOT NULL,
    "followers" INTEGER,
    "expertise" TEXT,
    "bio" TEXT,
    "profileUrl" TEXT,
    "mindshare" INTEGER,
    "pow" INTEGER,
    "poi" INTEGER,
    "poe" INTEGER,
    "smartFollowers" INTEGER,
    "followersCount" INTEGER,
    "moneyScore" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Influencer" ("followers", "id", "name") SELECT "followers", "id", "name" FROM "Influencer";
DROP TABLE "Influencer";
ALTER TABLE "new_Influencer" RENAME TO "Influencer";
CREATE UNIQUE INDEX "Influencer_username_key" ON "Influencer"("username");
CREATE TABLE "new_Mention" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "mindshare" INTEGER,
    "pow" INTEGER,
    "poi" INTEGER,
    "poe" INTEGER,
    "smartFollowers" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mention_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mention" ("id", "influencerId", "projectId") SELECT "id", "influencerId", "projectId" FROM "Mention";
DROP TABLE "Mention";
ALTER TABLE "new_Mention" RENAME TO "Mention";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "website" TEXT,
    "launchDate" DATETIME,
    "marketCap" TEXT,
    "imageUrl" TEXT,
    "mindshare" INTEGER,
    "kolAttention" INTEGER,
    "engagement" INTEGER,
    "trustScore" INTEGER,
    "discord" TEXT,
    "twitter" TEXT,
    "telegram" TEXT,
    "rewardPoolUsd" INTEGER,
    "rewardRank" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("category", "id", "name") SELECT "category", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
