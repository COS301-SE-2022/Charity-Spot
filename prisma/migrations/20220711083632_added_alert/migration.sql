/*
  Warnings:

  - You are about to drop the column `read` on the `chat_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat_history" DROP COLUMN "read",
ADD COLUMN     "alert_client" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "alert_org" BOOLEAN NOT NULL DEFAULT false;
