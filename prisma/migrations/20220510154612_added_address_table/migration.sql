/*
  Warnings:

  - You are about to drop the column `location` on the `organisation` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "location",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AddressID" (
    "address_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "AddressID_pkey" PRIMARY KEY ("address_id")
);
