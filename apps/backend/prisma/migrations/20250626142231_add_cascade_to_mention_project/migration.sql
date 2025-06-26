-- DropForeignKey
ALTER TABLE "Mention" DROP CONSTRAINT "Mention_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
