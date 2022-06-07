/*
  Warnings:

  - The required column `item_id` was added to the `donation_item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "donation_item" ADD COLUMN     "item_id" TEXT NOT NULL;
