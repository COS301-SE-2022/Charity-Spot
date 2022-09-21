/*
  Warnings:

  - You are about to drop the column `ngo_number` on the `organisation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "organisation_ngo_number_key";

-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "ngo_number";
