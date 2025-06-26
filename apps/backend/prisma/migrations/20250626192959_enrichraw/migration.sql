-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
