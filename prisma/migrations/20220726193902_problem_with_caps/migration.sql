/*
  Warnings:

  - You are about to drop the column `address_ID` on the `organisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "address_ID",
ADD COLUMN     "address_id" TEXT;
