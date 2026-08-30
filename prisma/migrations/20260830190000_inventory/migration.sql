CREATE TYPE "InventoryAction" AS ENUM ('ADD', 'REMOVE', 'SET', 'THRESHOLD');
ALTER TABLE "Product" ADD COLUMN "lowStockThreshold" INTEGER NOT NULL DEFAULT 2;
CREATE TABLE "StockMovement" (
  "id" TEXT NOT NULL,
  "action" "InventoryAction" NOT NULL,
  "quantity" INTEGER NOT NULL,
  "previousValue" INTEGER NOT NULL,
  "resultingValue" INTEGER NOT NULL,
  "reason" TEXT,
  "notes" TEXT,
  "productId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "StockMovement_productId_createdAt_idx" ON "StockMovement"("productId", "createdAt");
CREATE INDEX "StockMovement_action_idx" ON "StockMovement"("action");
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
