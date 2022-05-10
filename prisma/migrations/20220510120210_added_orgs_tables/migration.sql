/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordSalt` to the `user` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "name",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "passwordSalt" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "organisation" (
    "user_id" TEXT NOT NULL,
    "organisation_id" TEXT NOT NULL,
    "ngo_number" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "organisation_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("organisation_id","client_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organisation_ngo_number_key" ON "organisation"("ngo_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
