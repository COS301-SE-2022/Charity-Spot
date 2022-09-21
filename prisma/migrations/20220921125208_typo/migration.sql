/*
  Warnings:

  - You are about to drop the `invetory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invetory";

-- CreateTable
CREATE TABLE "inventory" (
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("item_id","user_id")
);
