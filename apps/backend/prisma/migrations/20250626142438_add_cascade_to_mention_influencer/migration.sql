-- DropForeignKey
ALTER TABLE "Mention" DROP CONSTRAINT "Mention_influencerId_fkey";

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
