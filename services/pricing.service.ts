// lib/services/pricing.service.ts
import prisma from "@/lib/prisma";
import { GoldType, CurrencyType } from "@/lib/generated/prisma/client";
import { CurrentPrices } from "@/lib/types";



export async function getCurrentPrices(): Promise<CurrentPrices> {
    // Get the latest settings (prices) from admin
    const latestSettings = await prisma.settings.findFirst({
        orderBy: { createdAt: 'desc' },
    });

    if (!latestSettings) {
        // Return default prices if no settings exist
        return {
            priceGold14USD: 0,
            priceGold18USD: 0,
            priceGold21USD: 0,
            priceGold24USD: 0,
            priceGold14SYP: 0,
            priceGold18SYP: 0,
            priceGold21SYP: 0,
            priceGold24SYP: 0,
            exchangeRateUSDtoSYP: 1,
        };
    }

    return {
        priceGold14USD: latestSettings.priceGold14USD,
        priceGold18USD: latestSettings.priceGold18USD,
        priceGold21USD: latestSettings.priceGold21USD,
        priceGold24USD: latestSettings.priceGold24USD,
        priceGold14SYP: latestSettings.priceGold14SYP,
        priceGold18SYP: latestSettings.priceGold18SYP,
        priceGold21SYP: latestSettings.priceGold21SYP,
        priceGold24SYP: latestSettings.priceGold24SYP,
        exchangeRateUSDtoSYP: latestSettings.exchangeRateUSDtoSYP,
    };
}

export function getPricePerGram(
    goldType: GoldType,
    currency: CurrencyType,
    prices: CurrentPrices
): number {
    switch (goldType) {
        case GoldType.GOLD_14:
            return currency === CurrencyType.USD ? prices.priceGold14USD : prices.priceGold14SYP;
        case GoldType.GOLD_18:
            return currency === CurrencyType.USD ? prices.priceGold18USD : prices.priceGold18SYP;
        case GoldType.GOLD_21:
            return currency === CurrencyType.USD ? prices.priceGold21USD : prices.priceGold21SYP;
        case GoldType.GOLD_24:
            return currency === CurrencyType.USD ? prices.priceGold24USD : prices.priceGold24SYP;
        default:
            return 0;
    }
}

export function calculateProfit(
    costPriceUSD: number,
    sellingPriceUSD: number
): {
    profitUSD: number;
    profitMargin: number;
} {
    const profitUSD = sellingPriceUSD - costPriceUSD;
    const profitMargin = costPriceUSD > 0 ? (profitUSD / costPriceUSD) * 100 : 0;

    return { profitUSD, profitMargin };
}

export async function getStoreGoldBalance(storeId: string, goldType: GoldType): Promise<number> {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: {
            currentGold14: true,
            currentGold18: true,
            currentGold21: true,
            currentGold24: true,
        }
    });

    if (!store) return 0;

    switch (goldType) {
        case GoldType.GOLD_14: return store.currentGold14;
        case GoldType.GOLD_18: return store.currentGold18;
        case GoldType.GOLD_21: return store.currentGold21;
        case GoldType.GOLD_24: return store.currentGold24;
        default: return 0;
    }
}

export function getProfitMargin(storeId: string, goldType: GoldType, storeData?: any): number {
    if (!storeData) return 0;

    switch (goldType) {
        case GoldType.GOLD_14: return storeData.profitMarginGold14 || 0;
        case GoldType.GOLD_18: return storeData.profitMarginGold18 || 0;
        case GoldType.GOLD_21: return storeData.profitMarginGold21 || 0;
        case GoldType.GOLD_24: return storeData.profitMarginGold24 || 0;
        default: return 0;
    }
}