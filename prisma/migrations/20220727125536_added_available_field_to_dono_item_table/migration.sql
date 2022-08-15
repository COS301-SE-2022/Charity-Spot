/*
  Warnings:

  - Added the required column `item_avail` to the `donation_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donation_item" ADD COLUMN     "item_avail" BOOLEAN NOT NULL;
