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
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "logoUrl" TEXT,
    "primaryPhoneNumber" TEXT,
    "secondaryPhoneNumber" TEXT,
    "status" "StoreStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentGold14" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentGold18" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentGold21" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentGold24" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentUSD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold14USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold18USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold21USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold24USD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold14SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold18SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold21SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceGold24SYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "exchangeRateUSDtoSYP" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastPriceUpdate" TIMESTAMP(3),
    "profitMarginGold14" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "profitMarginGold18" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "profitMarginGold21" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "profitMarginGold24" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION NOT NULL,
    "goldType" "GoldType" NOT NULL,
    "pricePerGramUSD" DOUBLE PRECISION NOT NULL,
    "pricePerGramSYP" DOUBLE PRECISION NOT NULL,
    "totalUSD" DOUBLE PRECISION NOT NULL,
    "totalSYP" DOUBLE PRECISION NOT NULL,
    "currency" "CurrencyType" NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "description" TEXT,
    "costPriceUSD" DOUBLE PRECISION NOT NULL,
    "profitUSD" DOUBLE PRECISION NOT NULL,
    "profitSYP" DOUBLE PRECISION NOT NULL,
    "profitMargin" DOUBLE PRECISION NOT NULL,
    "reportId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goldType" "GoldType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "type" "StockType" NOT NULL,
    "balanceAfter" DOUBLE PRECISION NOT NULL,
    "costPerGramUSD" DOUBLE PRECISION,
    "totalCostUSD" DOUBLE PRECISION,
    "totalCostSYP" DOUBLE PRECISION,
    "supplier" TEXT,
    "invoiceRef" TEXT,
    "note" TEXT,
    "reportId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromCurrency" "CurrencyType",
    "toCurrency" "CurrencyType",
    "exchangeRate" DOUBLE PRECISION,
    "amountFrom" DOUBLE PRECISION,
    "amountTo" DOUBLE PRECISION,
    "balanceUSDAfter" DOUBLE PRECISION NOT NULL,
    "balanceSYPAfter" DOUBLE PRECISION NOT NULL,
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
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_invoiceNumber_key" ON "Sale"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Sale_storeId_date_idx" ON "Sale"("storeId", "date");

-- CreateIndex
CREATE INDEX "Sale_invoiceNumber_idx" ON "Sale"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Sale_reportId_idx" ON "Sale"("reportId");

-- CreateIndex
CREATE INDEX "Stock_storeId_date_idx" ON "Stock"("storeId", "date");

-- CreateIndex
CREATE INDEX "Stock_goldType_idx" ON "Stock"("goldType");

-- CreateIndex
CREATE INDEX "Stock_reportId_idx" ON "Stock"("reportId");

-- CreateIndex
CREATE INDEX "Exchange_storeId_date_idx" ON "Exchange"("storeId", "date");

-- CreateIndex
CREATE INDEX "Exchange_reportId_idx" ON "Exchange"("reportId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
