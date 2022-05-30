-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "catagory" ADD VALUE 'TECH';
ALTER TYPE "catagory" ADD VALUE 'STATIONARY';
ALTER TYPE "catagory" ADD VALUE 'HYGIENE';
ALTER TYPE "catagory" ADD VALUE 'FURNITURE';
ALTER TYPE "catagory" ADD VALUE 'KITCHEN';
