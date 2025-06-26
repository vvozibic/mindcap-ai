-- Индексы для таблицы Influencer
CREATE INDEX IF NOT EXISTS "idx_influencer_followersCountNumeric" ON "Influencer"("followersCountNumeric");
CREATE INDEX IF NOT EXISTS "idx_influencer_tweetsCountNumeric" ON "Influencer"("tweetsCountNumeric");
CREATE INDEX IF NOT EXISTS "idx_influencer_username" ON "Influencer"("username");
CREATE INDEX IF NOT EXISTS "idx_influencer_createdAt" ON "Influencer"("createdAt");

-- Индексы для таблицы Project
CREATE INDEX IF NOT EXISTS "idx_project_marketCap" ON "Project"("marketCap");
CREATE INDEX IF NOT EXISTS "idx_project_slug" ON "Project"("slug");
CREATE INDEX IF NOT EXISTS "idx_project_createdAt" ON "Project"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_project_category" ON "Project"("category");
