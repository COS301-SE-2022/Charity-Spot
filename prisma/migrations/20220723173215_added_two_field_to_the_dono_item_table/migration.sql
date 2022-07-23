/*
  Warnings:

  - Added the required column `dono_date` to the `donation_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dono_loc` to the `donation_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donation_item" ADD COLUMN     "dono_date" TEXT NOT NULL,
ADD COLUMN     "dono_loc" TEXT NOT NULL;
