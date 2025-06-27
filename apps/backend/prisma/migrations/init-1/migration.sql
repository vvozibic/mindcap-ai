-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "twitterHandle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "website" TEXT,
    "launchDate" TIMESTAMP(3),
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawData" JSONB,
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Influencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "badges" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "platform" TEXT,
    "businessAccount" BOOLEAN NOT NULL DEFAULT false,
    "followings" TEXT NOT NULL,
    "expertise" TEXT,
    "profileUrl" TEXT,
    "mindshare" TEXT,
    "pow" TEXT,
    "poi" TEXT,
    "poe" TEXT,
    "followersCount" TEXT NOT NULL,
    "moneyScore" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bannerUrl" TEXT,
    "tweetsCount" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "twitterScoutJsonRaw" JSONB,
    "followersCountNumeric" INTEGER DEFAULT 0,
    "followingsNumeric" INTEGER DEFAULT 0,
    "tweetsCountNumeric" INTEGER DEFAULT 0,
    "avgLikes" INTEGER,
    "avgViews" INTEGER,
    "engagementRate" DOUBLE PRECISION,
    "kolScore" INTEGER,
    "protokolsJsonRaw" JSONB,
    "totalPosts" INTEGER,
    "smartFollowers" INTEGER,
    "totalComments" INTEGER,
    "totalLikes" INTEGER,
    "totalReplies" INTEGER,
    "totalRetweets" INTEGER,
    "totalViews" INTEGER,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mention" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "mindshare" TEXT,
    "pow" TEXT,
    "poi" TEXT,
    "poe" TEXT,
    "smartFollowers" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterHandle_key" ON "User"("twitterHandle");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_marketCap_idx" ON "Project"("marketCap");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");

-- CreateIndex
CREATE INDEX "Project_category_idx" ON "Project"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_username_key" ON "Influencer"("username");

-- CreateIndex
CREATE INDEX "Influencer_followersCountNumeric_idx" ON "Influencer"("followersCountNumeric");

-- CreateIndex
CREATE INDEX "Influencer_tweetsCountNumeric_idx" ON "Influencer"("tweetsCountNumeric");

-- CreateIndex
CREATE INDEX "Influencer_username_idx" ON "Influencer"("username");

-- CreateIndex
CREATE INDEX "Influencer_createdAt_idx" ON "Influencer"("createdAt");

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

