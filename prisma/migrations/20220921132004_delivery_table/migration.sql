-- CreateTable
CREATE TABLE "delivery" (
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "assist_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("item_id","user_id","assist_id")
);
