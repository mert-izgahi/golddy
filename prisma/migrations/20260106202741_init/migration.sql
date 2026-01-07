-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STORE');

-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('BAND', 'ACTIVE', 'SUSPEND');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'SYP');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('ADD', 'REMOVE');

-- CreateEnum
CREATE TYPE "GoldType" AS ENUM ('GOLD_14', 'GOLD_18', 'GOLD_21', 'GOLD_24');

-- CreateEnum
CREATE TYPE "DayStatus" AS ENUM ('Opening', 'Closed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STORE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "managerName" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "logoUrl" TEXT,
    "primaryPhoneNumber" TEXT,
    "secondaryPhoneNumber" TEXT,
    "status" "StoreStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION NOT NULL,
    "goldType" "GoldType" NOT NULL,
    "pricePerGram" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "currency" "CurrencyType" NOT NULL,
    "customerName" TEXT,
    "description" TEXT,
    "paymentType" "PaymentType" NOT NULL,
    "reportId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DOUBLE PRECISION NOT NULL,
    "goldType" "GoldType" NOT NULL,
    "type" "StockType" NOT NULL,
    "note" TEXT,
    "reportId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromCurrency" "CurrencyType" NOT NULL,
    "toCurrency" "CurrencyType" NOT NULL,
    "amountFrom" DOUBLE PRECISION NOT NULL,
    "amountTo" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "reportId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openingUSD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingUSD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openingSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openingGold14" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingGold14" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openingGold18" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingGold18" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openingGold21" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingGold21" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openingGold24" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "closingGold24" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "goldPrice14" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "goldPrice18" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "goldPrice21" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "goldPrice24" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dollarRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalGoldSold" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSalesUSD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSalesSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profitUSD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profitSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "status" "DayStatus" NOT NULL DEFAULT 'Opening',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeName_key" ON "Store"("storeName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
