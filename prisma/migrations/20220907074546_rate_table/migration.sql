-- CreateTable
CREATE TABLE "rate" (
    "user_id" TEXT NOT NULL,
    "assist_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "rate_pkey" PRIMARY KEY ("user_id","assist_id")
);
