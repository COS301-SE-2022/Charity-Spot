-- CreateTable
CREATE TABLE "messages" (
    "user_id" TEXT NOT NULL,
    "assist_id" TEXT NOT NULL,
    "past_messages" TEXT NOT NULL,
    "notify_assist" BOOLEAN NOT NULL,
    "notify_need" BOOLEAN NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("user_id","assist_id")
);
