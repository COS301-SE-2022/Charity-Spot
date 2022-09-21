-- CreateTable
CREATE TABLE "invetory" (
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "invetory_pkey" PRIMARY KEY ("item_id","user_id")
);
