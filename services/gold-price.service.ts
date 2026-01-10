import prisma from "@/lib/prisma";

/**
 * Gold Price Service
 * Fetches live gold prices (USD) from GoldAPI.io and USD→SYP rate from CurrencyAPI.
 * Updates store prices accordingly.
 */

interface GoldAPIResponse {
    price: number; // price per ounce in USD
    timestamp: number;
}

interface CurrencyAPIResponse {
    data: {
        SYP?: {
            code: string;
            value: number;
        };
    };
}

export class GoldPriceService {
    /**
     * Fetch 24K gold price (USD/gram) from GoldAPI.io
     */
    static async fetchGoldPriceUSD(): Promise<number> {
        try {
            const API_KEY = process.env.GOLD_API_KEY || "goldapi-3km5qxsmk8cl3p8-io";

            const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
                headers: {
                    "x-access-token": API_KEY,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error("❌ GoldAPI error:", errText);
                throw new Error("Failed to fetch gold price from GoldAPI.io");
            }

            const data: GoldAPIResponse = await res.json();

            // Convert ounce → gram
            const pricePerOunce = data.price;
            const pricePerGram = pricePerOunce / 31.1035;

            console.log("🟡 Gold price (24K, USD/g):", pricePerGram);
            return pricePerGram;
        } catch (error) {
            console.error("Error fetching gold price:", error);
            throw new Error("Unable to fetch current gold price");
        }
    }

    /**
     * Fetch USD → SYP exchange rate using CurrencyAPI
     */
    static async fetchExchangeRate(): Promise<number> {
        try {
            const API_KEY = process.env.CURRENCY_API_KEY;
            if (!API_KEY) throw new Error("Missing CURRENCY_API_KEY");

            //const url = `https://currencyapi.com/api/v3/latest?apikey=num_live_J4fu5wohPql6kFwfmh9C8M5JQYntd8IJMu2OC9k0&base_currency=USD&currencies=SYP`;
            const url = `https://currencyapi.com/api/v3/latest?apikey=${API_KEY}&base_currency=USD&currencies=SYP`;
            const res = await fetch(url, { cache: "no-store" });

            if (!res.ok) {
                const errText = await res.text();
                console.error("❌ CurrencyAPI error:", errText);
                throw new Error("FX API failed");
            }

            const data: CurrencyAPIResponse = await res.json();
            const rate = data.data?.SYP?.value;

            // Check if value is realistic
            if (!rate ) {
                console.warn("⚠️ Invalid SYP rate returned. Using fallback 12000.");
                return 12000;
            }

            console.log("💵 Exchange rate (USD→SYP):", rate);
            return rate;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return 12000; // fallback realistic default
        }
    }
    // static async fetchExchangeRate(): Promise<number> {
    //     try {
    //         const url = `https://open.exchangerate-api.com/v6/latest/USD`;
    //         const res = await fetch(url, { cache: "no-store" });

    //         if (!res.ok) {
    //             console.error("❌ ExchangeRate API error");
    //             return 12000; // fallback
    //         }

    //         const data = await res.json();
    //         const rate = data.rates?.SYP;

    //         if (!rate || rate < 1000) {
    //             console.warn("⚠️ Invalid SYP rate returned. Using fallback 12000.");
    //             return 12000;
    //         }

    //         console.log("💵 Exchange rate (USD→SYP):", rate);
    //         return rate;
    //     } catch (error) {
    //         console.error("Error fetching exchange rate:", error);
    //         return 12000; // fallback
    //     }
    // }

    /**
     * Compute gold prices for different karats
     */
    static calculateKaratPrices(gold24: number) {
        const purity = {
            gold14: 14 / 24,
            gold18: 18 / 24,
            gold21: 21 / 24,
            gold24: 1,
        };

        return {
            gold14: gold24 * purity.gold14,
            gold18: gold24 * purity.gold18,
            gold21: gold24 * purity.gold21,
            gold24,
        };
    }

    /**
     * Update store prices (USD + SYP) based on current API data
     */
    static async updateStorePrices(storeId: string): Promise<void> {
        try {
            const gold24PriceUSD = await this.fetchGoldPriceUSD();
            const exchangeRate = await this.fetchExchangeRate();

            const pricesUSD = this.calculateKaratPrices(gold24PriceUSD);
            const pricesSYP = {
                gold14: pricesUSD.gold14 * exchangeRate,
                gold18: pricesUSD.gold18 * exchangeRate,
                gold21: pricesUSD.gold21 * exchangeRate,
                gold24: pricesUSD.gold24 * exchangeRate,
            };

            const store = await prisma.store.findUnique({
                where: { id: storeId },
                select: {
                    profitMarginGold14: true,
                    profitMarginGold18: true,
                    profitMarginGold21: true,
                    profitMarginGold24: true,
                },
            });

            if (!store) throw new Error("Store not found");

            const applyMargin = (price: number, margin: number) =>
                price * (1 + margin / 100);

            await prisma.store.update({
                where: { id: storeId },
                data: {
                    // USD prices
                    priceGold14USD: applyMargin(pricesUSD.gold14, store.profitMarginGold14),
                    priceGold18USD: applyMargin(pricesUSD.gold18, store.profitMarginGold18),
                    priceGold21USD: applyMargin(pricesUSD.gold21, store.profitMarginGold21),
                    priceGold24USD: applyMargin(pricesUSD.gold24, store.profitMarginGold24),

                    // SYP prices
                    priceGold14SYP: applyMargin(pricesSYP.gold14, store.profitMarginGold14),
                    priceGold18SYP: applyMargin(pricesSYP.gold18, store.profitMarginGold18),
                    priceGold21SYP: applyMargin(pricesSYP.gold21, store.profitMarginGold21),
                    priceGold24SYP: applyMargin(pricesSYP.gold24, store.profitMarginGold24),

                    exchangeRateUSDtoSYP: exchangeRate,
                    lastPriceUpdate: new Date(),
                },
            });

            console.log(`✅ Store ${storeId} prices updated successfully`);
        } catch (error) {
            console.error("Error updating store prices:", error);
            throw error;
        }
    }

    /**
     * Get store prices, refreshing if older than 1 hour
     */
    static async getCurrentPrices(storeId: string) {
        const store = await prisma.store.findUnique({ where: { id: storeId } });
        if (!store) throw new Error("Store not found");

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const needsUpdate =
            !store.lastPriceUpdate || store.lastPriceUpdate < oneHourAgo;

        if (needsUpdate) {
            await this.updateStorePrices(storeId);
            const updated = await prisma.store.findUnique({ where: { id: storeId } });
            if (!updated) throw new Error("Store not found after update");

            return {
                pricesUSD: {
                    gold14: updated.priceGold14USD,
                    gold18: updated.priceGold18USD,
                    gold21: updated.priceGold21USD,
                    gold24: updated.priceGold24USD,
                },
                pricesSYP: {
                    gold14: updated.priceGold14SYP,
                    gold18: updated.priceGold18SYP,
                    gold21: updated.priceGold21SYP,
                    gold24: updated.priceGold24SYP,
                },
                exchangeRate: updated.exchangeRateUSDtoSYP,
                lastUpdate: updated.lastPriceUpdate!,
            };
        }

        return {
            pricesUSD: {
                gold14: store.priceGold14USD,
                gold18: store.priceGold18USD,
                gold21: store.priceGold21USD,
                gold24: store.priceGold24USD,
            },
            pricesSYP: {
                gold14: store.priceGold14SYP,
                gold18: store.priceGold18SYP,
                gold21: store.priceGold21SYP,
                gold24: store.priceGold24SYP,
            },
            exchangeRate: store.exchangeRateUSDtoSYP,
            lastUpdate: store.lastPriceUpdate!,
        };
    }
}
