import { GoldType, CurrencyType, Store } from "@/lib/generated/prisma";
import { CurrentPrices } from "@/lib/types";



export async function getCurrentPrices(store: Store): Promise<CurrentPrices> {
    // Get the latest settings (prices) from admin

    return {
        priceGold14USD: store.priceGold14USD,
        priceGold18USD: store.priceGold18USD,
        priceGold21USD: store.priceGold21USD,
        priceGold24USD: store.priceGold24USD,
        exchangeRateUSDtoSYP: store.exchangeRateUSDtoSYP,
    };
}

export function getPricePerGram(
    goldType: GoldType,
    currency: CurrencyType,
    prices: CurrentPrices
): number {
    switch (goldType) {
        case GoldType.GOLD_14:
            return prices.priceGold14USD;
        case GoldType.GOLD_18:
            return prices.priceGold18USD
        case GoldType.GOLD_21:
            return prices.priceGold21USD
        case GoldType.GOLD_24:
            return prices.priceGold24USD
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

export async function getStoreGoldBalance(store: Store, goldType: GoldType): Promise<number> {

    if (!store) return 0;

    switch (goldType) {
        case GoldType.GOLD_14: return store.currentGold14;
        case GoldType.GOLD_18: return store.currentGold18;
        case GoldType.GOLD_21: return store.currentGold21;
        case GoldType.GOLD_24: return store.currentGold24;
        default: return 0;
    }
}