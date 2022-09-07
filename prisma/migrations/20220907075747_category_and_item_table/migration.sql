-- CreateEnum
CREATE TYPE "category" AS ENUM ('CLOTHING', 'FOOD', 'TECH', 'STATIONARY', 'HYGIENE', 'FURNITURE', 'KITCHEN');

-- CreateTable
CREATE TABLE "item" (
    "Item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "category" NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("Item_id")
);
