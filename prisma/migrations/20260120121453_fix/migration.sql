/*
  Warnings:

  - Added the required column `profitSYP` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profitUSD` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "profitSYP" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profitUSD" DOUBLE PRECISION NOT NULL;
