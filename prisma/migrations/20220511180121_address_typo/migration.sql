/*
  Warnings:

  - You are about to drop the `AddressID` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AddressID";

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);
