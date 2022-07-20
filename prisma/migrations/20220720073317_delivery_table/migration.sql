-- CreateTable
CREATE TABLE "delivery" (
    "DeliveryID" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "location" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("DeliveryID")
);
