/*
  Warnings:

  - You are about to drop the column `address_link` on the `organisation` table. All the data in the column will be lost.
  - You are about to drop the `has_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "address_link",
ADD COLUMN     "address_ID" TEXT;

-- DropTable
DROP TABLE "has_item";

-- DropTable
DROP TABLE "item";

-- CreateTable
CREATE TABLE "address" (
    "address_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "donation_item" (
    "item_name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "descrition" TEXT NOT NULL,

    CONSTRAINT "donation_item_pkey" PRIMARY KEY ("item_name","org_id")
);
