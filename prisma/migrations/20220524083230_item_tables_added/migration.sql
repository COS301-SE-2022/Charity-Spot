/*
  Warnings:

  - You are about to drop the column `address_id` on the `organisation` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "address_id",
ADD COLUMN     "address_link" TEXT;

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "item" (
    "item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "descrition" TEXT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "has_item" (
    "item_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "has_item_pkey" PRIMARY KEY ("item_id","org_id")
);
