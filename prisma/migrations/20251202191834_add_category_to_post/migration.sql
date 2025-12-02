-- AlterTable
ALTER TABLE "post" ADD COLUMN     "category" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
