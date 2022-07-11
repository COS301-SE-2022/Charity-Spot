-- CreateTable
CREATE TABLE "chat_history" (
    "organisation_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "messages" TEXT NOT NULL,

    CONSTRAINT "chat_history_pkey" PRIMARY KEY ("organisation_id","client_id")
);
