/*
  Warnings:

  - You are about to drop the column `date` on the `Exchange` table. All the data in the column will be lost.
  - You are about to drop the column `dollarRate` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `goldPrice14` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `goldPrice18` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `goldPrice21` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `goldPrice24` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeRateUSDtoSYP` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `lastPriceUpdate` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold14SYP` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold14USD` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold18SYP` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold18USD` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold21SYP` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold21USD` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold24SYP` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `priceGold24USD` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `profitMarginGold14` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `profitMarginGold18` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `profitMarginGold21` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `profitMarginGold24` on the `Store` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Exchange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exchange_storeId_date_idx";

-- DropIndex
DROP INDEX "Sale_storeId_date_idx";

-- DropIndex
DROP INDEX "Stock_storeId_date_idx";

-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "dollarRate",
DROP COLUMN "goldPrice14",
DROP COLUMN "goldPrice18",
DROP COLUMN "goldPrice21",
DROP COLUMN "goldPrice24",
ADD COLUMN     "exchangeRateUSDtoSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold14SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold14USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold18SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold18USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold21SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold21USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold24SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "priceGold24USD" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "exchangeRateUSDtoSYP",
DROP COLUMN "lastPriceUpdate",
DROP COLUMN "priceGold14SYP",
DROP COLUMN "priceGold14USD",
DROP COLUMN "priceGold18SYP",
DROP COLUMN "priceGold18USD",
DROP COLUMN "priceGold21SYP",
DROP COLUMN "priceGold21USD",
DROP COLUMN "priceGold24SYP",
DROP COLUMN "priceGold24USD",
DROP COLUMN "profitMarginGold14",
DROP COLUMN "profitMarginGold18",
DROP COLUMN "profitMarginGold21",
DROP COLUMN "profitMarginGold24";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priceGold14USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold18USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold21USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold24USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold14SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold18SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold21SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold24SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "exchangeRateUSDtoSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Exchange_storeId_createdAt_idx" ON "Exchange"("storeId", "createdAt");

-- CreateIndex
CREATE INDEX "Sale_storeId_createdAt_idx" ON "Sale"("storeId", "createdAt");

-- CreateIndex
CREATE INDEX "Stock_storeId_createdAt_idx" ON "Stock"("storeId", "createdAt");
