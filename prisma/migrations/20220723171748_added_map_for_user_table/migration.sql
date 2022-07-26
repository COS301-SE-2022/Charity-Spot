/*
  Warnings:

  - You are about to drop the column `passwordSalt` on the `user` table. All the data in the column will be lost.
  - Added the required column `password_salt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordSalt",
ADD COLUMN     "password_salt" TEXT NOT NULL;
