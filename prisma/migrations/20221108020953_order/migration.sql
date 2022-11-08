-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "product" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "provider" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false
);
