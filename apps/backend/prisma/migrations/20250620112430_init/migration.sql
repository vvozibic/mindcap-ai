-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Influencer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "platform" TEXT NOT NULL,
    "followers" TEXT,
    "expertise" TEXT,
    "bio" TEXT,
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
CREATE TABLE "new_Mention" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "mindshare" TEXT,
    "pow" TEXT,
    "poi" TEXT,
    "poe" TEXT,
    "smartFollowers" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mention_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mention" ("createdAt", "id", "influencerId", "mindshare", "poe", "poi", "pow", "projectId", "smartFollowers") SELECT "createdAt", "id", "influencerId", "mindshare", "poe", "poi", "pow", "projectId", "smartFollowers" FROM "Mention";
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
INSERT INTO "new_Project" ("category", "createdAt", "description", "discord", "engagement", "id", "imageUrl", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website") SELECT "category", "createdAt", "description", "discord", "engagement", "id", "imageUrl", "kolAttention", "launchDate", "marketCap", "mindshare", "name", "rewardPoolUsd", "rewardRank", "slug", "telegram", "trustScore", "twitter", "updatedAt", "website" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
