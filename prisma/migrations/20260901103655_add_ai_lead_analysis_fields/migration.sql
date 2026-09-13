-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "aiIntent" TEXT,
ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "lastAnalyzedAt" TIMESTAMP(3),
ADD COLUMN     "temperature" TEXT;
