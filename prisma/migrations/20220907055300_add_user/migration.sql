-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "identity" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
