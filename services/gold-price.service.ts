// lib/services/gold-price.service.ts
import prisma from "@/lib/prisma";

/**
 * Gold Price Service
 * Fetches current gold prices from external API and updates store prices
 */

interface GoldPriceAPIResponse {
    gold24k: number; // Price per gram in USD
    timestamp: number;
}

interface ExchangeRateAPIResponse {
    rates: {
        SYP: number; // USD to SYP rate
    };
}

export class GoldPriceService {

    /**
     * Fetch current gold price from API
     * Using metals-api.com or similar service
     */
    static async fetchGoldPriceUSD(): Promise<number> {
        try {
            // Option 1: Using metals-api.com (requires API key)
            // const API_KEY = process.env.METALS_API_KEY;
            // const response = await fetch(`https://metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=XAU`);

            // Option 2: Using goldapi.io
            // const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            //   headers: { 'x-access-token': process.env.GOLD_API_KEY }
            // });

            // Option 3: Free alternative - gold-price.live (no auth required)
            const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD');

            if (!response.ok) {
                throw new Error('Failed to fetch gold price');
            }

            const data = await response.json();

            // Convert from troy ounce to gram
            // 1 troy ounce = 31.1035 grams
            const pricePerTroyOunce = parseFloat(data.items[0].xauPrice);
            const pricePerGram = pricePerTroyOunce / 31.1035;

            return pricePerGram;

        } catch (error) {
            console.error('Error fetching gold price:', error);

            // Fallback to a default price or throw error
            // For production, you might want to use the last known price
            throw new Error('Unable to fetch current gold price');
        }
    }

    /**
     * Fetch USD to SYP exchange rate
     */
    static async fetchExchangeRate(): Promise<number> {
        try {
            // Option 1: Using exchangerate-api.com (free tier available)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rate');
            }

            const data: ExchangeRateAPIResponse = await response.json();
            return data.rates.SYP;

        } catch (error) {
            console.error('Error fetching exchange rate:', error);

            // Fallback to a default rate or last known rate
            // For SYP, you might want to use a fixed rate due to currency controls
            return 15000; // Default fallback rate
        }
    }

    /**
     * Calculate gold prices for different karats
     */
    static calculateKaratPrices(gold24Price: number): {
        gold14: number;
        gold18: number;
        gold21: number;
        gold24: number;
    } {
        // Gold purity percentages
        const purity = {
            gold14: 14 / 24, // 58.33%
            gold18: 18 / 24, // 75%
            gold21: 21 / 24, // 87.5%
            gold24: 1,       // 100%
        };

        return {
            gold14: gold24Price * purity.gold14,
            gold18: gold24Price * purity.gold18,
            gold21: gold24Price * purity.gold21,
            gold24: gold24Price,
        };
    }

    /**
     * Update store prices from API
     */
    static async updateStorePrices(storeId: string): Promise<void> {
        try {
            // Fetch current prices
            const gold24PriceUSD = await this.fetchGoldPriceUSD();
            const exchangeRate = await this.fetchExchangeRate();

            // Calculate prices for all karats
            const pricesUSD = this.calculateKaratPrices(gold24PriceUSD);

            // Calculate prices in SYP
            const pricesSYP = {
                gold14: pricesUSD.gold14 * exchangeRate,
                gold18: pricesUSD.gold18 * exchangeRate,
                gold21: pricesUSD.gold21 * exchangeRate,
                gold24: pricesUSD.gold24 * exchangeRate,
            };

            // Get store to apply profit margins
            const store = await prisma.store.findUnique({
                where: { id: storeId },
                select: {
                    profitMarginGold14: true,
                    profitMarginGold18: true,
                    profitMarginGold21: true,
                    profitMarginGold24: true,
                },
            });

            if (!store) {
                throw new Error('Store not found');
            }

            // Apply profit margins
            const applyMargin = (price: number, margin: number) => {
                return price * (1 + margin / 100);
            };

            // Update store prices
            await prisma.store.update({
                where: { id: storeId },
                data: {
                    priceGold14USD: applyMargin(pricesUSD.gold14, store.profitMarginGold14),
                    priceGold18USD: applyMargin(pricesUSD.gold18, store.profitMarginGold18),
                    priceGold21USD: applyMargin(pricesUSD.gold21, store.profitMarginGold21),
                    priceGold24USD: applyMargin(pricesUSD.gold24, store.profitMarginGold24),

                    priceGold14SYP: applyMargin(pricesSYP.gold14, store.profitMarginGold14),
                    priceGold18SYP: applyMargin(pricesSYP.gold18, store.profitMarginGold18),
                    priceGold21SYP: applyMargin(pricesSYP.gold21, store.profitMarginGold21),
                    priceGold24SYP: applyMargin(pricesSYP.gold24, store.profitMarginGold24),

                    exchangeRateUSDtoSYP: exchangeRate,
                    lastPriceUpdate: new Date(),
                },
            });

            // Save price history
            //   await prisma.goldPriceHistory.create({
            //     data: {
            //       storeId,
            //       gold14USD: pricesUSD.gold14,
            //       gold18USD: pricesUSD.gold18,
            //       gold21USD: pricesUSD.gold21,
            //       gold24USD: pricesUSD.gold24,
            //       gold14SYP: pricesSYP.gold14,
            //       gold18SYP: pricesSYP.gold18,
            //       gold21SYP: pricesSYP.gold21,
            //       gold24SYP: pricesSYP.gold24,
            //       exchangeRate,
            //       source: 'goldprice.org',
            //     },
            //   });

        } catch (error) {
            console.error('Error updating store prices:', error);
            throw error;
        }
    }

    /**
     * Get current store prices with freshness check
     * Auto-updates if prices are stale (older than 1 hour)
     */
    static async getCurrentPrices(storeId: string): Promise<{
        pricesUSD: {
            gold14: number;
            gold18: number;
            gold21: number;
            gold24: number;
        };
        pricesSYP: {
            gold14: number;
            gold18: number;
            gold21: number;
            gold24: number;
        };
        exchangeRate: number;
        lastUpdate: Date;
    }> {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
        });

        if (!store) {
            throw new Error('Store not found');
        }

        // Check if prices need updating (older than 1 hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const needsUpdate = !store.lastPriceUpdate || store.lastPriceUpdate < oneHourAgo;

        if (needsUpdate) {
            await this.updateStorePrices(storeId);

            // Fetch updated store
            const updatedStore = await prisma.store.findUnique({
                where: { id: storeId },
            });

            return {
                pricesUSD: {
                    gold14: updatedStore!.priceGold14USD,
                    gold18: updatedStore!.priceGold18USD,
                    gold21: updatedStore!.priceGold21USD,
                    gold24: updatedStore!.priceGold24USD,
                },
                pricesSYP: {
                    gold14: updatedStore!.priceGold14SYP,
                    gold18: updatedStore!.priceGold18SYP,
                    gold21: updatedStore!.priceGold21SYP,
                    gold24: updatedStore!.priceGold24SYP,
                },
                exchangeRate: updatedStore!.exchangeRateUSDtoSYP,
                lastUpdate: updatedStore!.lastPriceUpdate!,
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