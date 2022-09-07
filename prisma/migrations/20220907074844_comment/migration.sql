-- CreateTable
CREATE TABLE "comment" (
    "user_id" TEXT NOT NULL,
    "assist_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("user_id","assist_id")
);
