/*
  Warnings:

  - Made the column `comment` on table `rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rating" ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "comment" SET DEFAULT E'';
