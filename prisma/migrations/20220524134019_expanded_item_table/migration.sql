/*
  Warnings:

  - Added the required column `quality` to the `donation_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `donation_item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "quality" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "catagory" AS ENUM ('CLOTHING', 'FOOD');

-- AlterTable
ALTER TABLE "donation_item" ADD COLUMN     "picture" TEXT,
ADD COLUMN     "quality" "quality" NOT NULL,
ADD COLUMN     "type" "catagory" NOT NULL,
ALTER COLUMN "descrition" DROP NOT NULL;

-- AlterTable
ALTER TABLE "organisation" ADD COLUMN     "profile_picture" TEXT;
