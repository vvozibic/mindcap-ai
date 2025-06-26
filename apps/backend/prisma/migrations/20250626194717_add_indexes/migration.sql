-- RenameIndex
ALTER INDEX "idx_influencer_createdAt" RENAME TO "Influencer_createdAt_idx";

-- RenameIndex
ALTER INDEX "idx_influencer_followersCountNumeric" RENAME TO "Influencer_followersCountNumeric_idx";

-- RenameIndex
ALTER INDEX "idx_influencer_tweetsCountNumeric" RENAME TO "Influencer_tweetsCountNumeric_idx";

-- RenameIndex
ALTER INDEX "idx_influencer_username" RENAME TO "Influencer_username_idx";

-- RenameIndex
ALTER INDEX "idx_project_category" RENAME TO "Project_category_idx";

-- RenameIndex
ALTER INDEX "idx_project_createdAt" RENAME TO "Project_createdAt_idx";

-- RenameIndex
ALTER INDEX "idx_project_marketCap" RENAME TO "Project_marketCap_idx";

-- RenameIndex
ALTER INDEX "idx_project_slug" RENAME TO "Project_slug_idx";
