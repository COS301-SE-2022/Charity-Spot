-- AlterTable
ALTER TABLE "rating" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "comment" DROP DEFAULT;
