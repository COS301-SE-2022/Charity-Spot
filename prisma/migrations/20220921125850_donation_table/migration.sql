-- CreateTable
CREATE TABLE "donation" (
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "donation_pkey" PRIMARY KEY ("item_id","user_id")
);
