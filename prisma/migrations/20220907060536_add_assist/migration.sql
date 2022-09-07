-- CreateTable
CREATE TABLE "assist" (
    "user_id" TEXT NOT NULL,
    "ngo_number" TEXT,
    "organisation_id" TEXT NOT NULL,
    "description" TEXT,
    "address_id" TEXT,
    "profile_picture" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assist_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assist_ngo_number_key" ON "assist"("ngo_number");
