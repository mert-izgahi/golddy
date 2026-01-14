/*
  Warnings:

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

*/
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
DROP COLUMN "priceGold24USD";
