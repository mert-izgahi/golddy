// // routes/sales.routes.ts
// import prisma from "@/lib/prisma";
// import { Hono } from "hono";
// import { authenticate } from "@/lib/auth-middlewares";
// import { ContextUser } from "@/lib/types";
// import { zValidator } from "@hono/zod-validator";
// import { getCreateSaleSchema, getUpdateSaleSchema } from "@/lib/zod";

// const salesRoutes = new Hono();

// salesRoutes
//     // @desc    Get all sales for a store with pagination
//     // @route   GET /sales/store/:storeId
//     // @access  Private
//     // @method  Get
//     .get("/store/:storeId", authenticate, async (c) => {
//         const { storeId } = c.req.param();
//         const page = parseInt(c.req.query("page") || "1");
//         const limit = parseInt(c.req.query("limit") || "10");
//         const skip = (page - 1) * limit;

//         // Get total count for pagination
//         const total = await prisma.sale.count({
//             where: { storeId }
//         });

//         const sales = await prisma.sale.findMany({
//             where: { storeId },
//             orderBy: { createdAt: 'desc' },
//             skip,
//             take: limit,
//         });

//         const totalPages = Math.ceil(total / limit);

//         return c.json({
//             message: "Sales fetched successfully",
//             result: sales,
//             pagination: {
//                 page,
//                 limit,
//                 total,
//                 totalPages,
//                 hasNext: page < totalPages,
//                 hasPrevious: page > 1
//             },
//             success: true
//         });
//     })

//     // @desc    Get sale by ID
//     // @route   GET /sales/:id
//     // @access  Private
//     // @method  Get
//     .get("/:id", authenticate, async (c) => {
//         const { id } = c.req.param();
//         const sale = await prisma.sale.findUnique({
//             where: { id },
//             include: {
//                 store: {
//                     select: { name: true }
//                 }
//             }
//         });

//         if (!sale) {
//             return c.json({ message: "Sale not found", result: null, success: false }, 404);
//         }

//         return c.json({ message: "Sale fetched successfully", result: sale, success: true });
//     })

//     // @desc    Create a new sale
//     // @route   POST /sales/store/:storeId
//     // @access  Private
//     // @method  Post
//     .post("/store/:storeId", zValidator('json', getCreateSaleSchema('en')), authenticate, async (c) => {
//         console.log("👉👉 CREATE SALE");

//         const user = c.get("user") as ContextUser;
//         const { storeId } = c.req.param();
//         const body = c.req.valid('json');
//         const {
//             weight,
//             goldType,
//             pricePerGramUSD,
//             total,
//             currency,
//             customerName,
//             description,
//             paymentType
//         } = body;

//         // Verify store exists and user has access
//         const store = await prisma.store.findFirst({
//             where: {
//                 id: storeId,
//                 ownerId: user!.id
//             }
//         });

//         if (!store) {
//             return c.json({ message: "Store not found or access denied", result: null, success: false }, 403);
//         }

//         const newSale = await prisma.sale.create({
//             data: {
//                 storeId,
//                 weight,
//                 goldType,
//                 currency,
//                 customerName: customerName || null,
//                 description: description || null,
//                 paymentType,
//             }
//         });

//         return c.json({ message: "Sale created successfully", result: newSale, success: true }, 201);
//     })

//     // @desc    Update a sale
//     // @route   PUT /sales/:id
//     // @access  Private
//     // @method  Put
//     .put("/:id", authenticate, zValidator('json', getUpdateSaleSchema('en')), async (c) => {
//         const user = c.get("user") as ContextUser;
//         const { id } = c.req.param();
//         const body = c.req.valid('json');

//         // Check if sale exists and user has access
//         const existingSale = await prisma.sale.findFirst({
//             where: {
//                 id,
//                 store: { ownerId: user!.id }
//             }
//         });

//         if (!existingSale) {
//             return c.json({ message: "Sale not found or access denied", result: null, success: false }, 403);
//         }

//         const updateData: any = {};
//         if (body.weight !== undefined) updateData.weight = body.weight;
//         if (body.goldType !== undefined) updateData.goldType = body.goldType;
//         if (body.pricePerGram !== undefined) updateData.pricePerGram = body.pricePerGram;
//         if (body.total !== undefined) updateData.total = body.total;
//         if (body.currency !== undefined) updateData.currency = body.currency;
//         if (body.customerName !== undefined) updateData.customerName = body.customerName || null;
//         if (body.description !== undefined) updateData.description = body.description || null;
//         if (body.paymentType !== undefined) updateData.paymentType = body.paymentType;

//         const updatedSale = await prisma.sale.update({
//             where: { id },
//             data: updateData
//         });

//         return c.json({ message: "Sale updated successfully", result: updatedSale, success: true });
//     })

//     // @desc    Delete a sale
//     // @route   DELETE /sales/:id
//     // @access  Private
//     // @method  Delete
//     .delete("/:id", authenticate, async (c) => {
//         const user = c.get("user") as ContextUser;
//         const { id } = c.req.param();

//         // Check if sale exists and user has access
//         const existingSale = await prisma.sale.findFirst({
//             where: {
//                 id,
//                 store: { ownerId: user!.id }
//             }
//         });

//         if (!existingSale) {
//             return c.json({ message: "Sale not found or access denied", result: null, success: false }, 403);
//         }

//         await prisma.sale.delete({
//             where: { id }
//         });

//         return c.json({ message: "Sale deleted successfully", result: null, success: true });
//     })

//     // @desc    Get sales statistics for a store
//     // @route   GET /sales/stats/store/:storeId
//     // @access  Private
//     // @method  Get
//     .get("/stats/store/:storeId", authenticate, async (c) => {
//         const user = c.get("user") as ContextUser;
//         const { storeId } = c.req.param();

//         // Verify store exists and user has access
//         const store = await prisma.store.findFirst({
//             where: {
//                 id: storeId,
//                 ownerId: user!.id
//             }
//         });

//         if (!store) {
//             return c.json({ message: "Store not found or access denied", result: null, success: false }, 403);
//         }

//         // Get sales stats
//         const totalSales = await prisma.sale.count({
//             where: { storeId }
//         });

//         const totalUSD = await prisma.sale.aggregate({
//             where: { storeId, currency: 'USD' },
//             _sum: { total: true }
//         });

//         const totalSYP = await prisma.sale.aggregate({
//             where: { storeId, currency: 'SYP' },
//             _sum: { total: true }
//         });

//         const totalWeight = await prisma.sale.aggregate({
//             where: { storeId },
//             _sum: { weight: true }
//         });

//         const stats = {
//             totalSales,
//             totalUSD: totalUSD._sum.total || 0,
//             totalSYP: totalSYP._sum.total || 0,
//             totalWeight: totalWeight._sum.weight || 0
//         };

//         return c.json({ message: "Sales statistics fetched successfully", result: stats, success: true });
//     });

// export { salesRoutes };

// routes/sales.routes.ts - UPDATED VERSION
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate } from "@/lib/auth-middlewares";
import { ContextUser } from "@/lib/types";
import { zValidator } from "@hono/zod-validator";
import { getCreateSaleSchema, getUpdateSaleSchema } from "@/lib/zod";
import {
    getCurrentPrices,
    getPricePerGram,
    calculateProfit,
    getStoreGoldBalance,
    getProfitMargin
} from "@/services/pricing.service";
import { GoldType, CurrencyType } from "@/lib/generated/prisma/client";

const salesRoutes = new Hono();

// Helper function to generate invoice number
async function generateInvoiceNumber(storeId: string): Promise<string> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Count today's sales for this store
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todaySalesCount = await prisma.sale.count({
        where: {
            storeId,
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            }
        }
    });

    const sequence = String(todaySalesCount + 1).padStart(3, '0');
    return `INV-${storeId.slice(-4)}-${year}${month}${day}-${sequence}`;
}

salesRoutes
    // @desc    Get all sales for a store with pagination
    // @route   GET /sales/store/:storeId
    // @access  Private
    .get("/store/:storeId", authenticate, async (c) => {
        const { storeId } = c.req.param();
        const user = c.get("user") as ContextUser;
        const page = parseInt(c.req.query("page") || "1");
        const limit = parseInt(c.req.query("limit") || "10");
        const skip = (page - 1) * limit;

        // Verify store access
        const store = await prisma.store.findFirst({
            where: {
                id: storeId,
                ownerId: user.id
            }
        });

        if (!store) {
            return c.json({
                message: "Store not found or access denied",
                result: null,
                success: false
            }, 403);
        }

        // Get total count for pagination
        const total = await prisma.sale.count({
            where: { storeId }
        });

        const sales = await prisma.sale.findMany({
            where: { storeId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                store: {
                    select: { name: true }
                }
            }
        });

        const totalPages = Math.ceil(total / limit);

        return c.json({
            message: "Sales fetched successfully",
            result: sales,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1
            },
            success: true
        });
    })

    // @desc    Get sale by ID
    // @route   GET /sales/:id
    // @access  Private
    .get("/:id", authenticate, async (c) => {
        const { id } = c.req.param();
        const user = c.get("user") as ContextUser;

        const sale = await prisma.sale.findFirst({
            where: {
                id,
                store: { ownerId: user.id }
            },
            include: {
                store: {
                    select: { name: true }
                }
            }
        });

        if (!sale) {
            return c.json({
                message: "Sale not found",
                result: null,
                success: false
            }, 404);
        }

        return c.json({
            message: "Sale fetched successfully",
            result: sale,
            success: true
        });
    })

    // @desc    Create a new sale
    // @route   POST /sales/store/:storeId
    // @access  Private
    .post("/store/:storeId",
        authenticate,
        zValidator('json', getCreateSaleSchema('en')),
        async (c) => {
            console.log("👉👉 CREATE SALE");

            const user = c.get("user") as ContextUser;
            const { storeId } = c.req.param();
            const body = c.req.valid('json');

            const {
                weight,
                goldType,
                currency,
                paymentType,
                amountPaid,
                customerName,
                customerPhone,
                description,
            } = body;

            try {
                // 1. Verify store exists and user has access
                const store = await prisma.store.findFirst({
                    where: {
                        id: storeId,
                        ownerId: user.id
                    }
                });

                if (!store) {
                    return c.json({
                        message: "Store not found or access denied",
                        result: null,
                        success: false
                    }, 403);
                }

                // 2. Check if store has enough gold inventory
                const currentGoldBalance = await getStoreGoldBalance(storeId, goldType);
                if (currentGoldBalance < weight) {
                    return c.json({
                        message: `Insufficient ${goldType} gold inventory. Available: ${currentGoldBalance}g, Requested: ${weight}g`,
                        result: null,
                        success: false
                    }, 400);
                }

                // 3. Get current prices from settings
                const currentPrices = await getCurrentPrices();

                // 4. Calculate price per gram based on gold type and currency
                const pricePerGram = getPricePerGram(goldType, currency, currentPrices);

                if (pricePerGram <= 0) {
                    return c.json({
                        message: `Price for ${goldType} in ${currency} is not set. Please contact admin.`,
                        result: null,
                        success: false
                    }, 400);
                }

                // 5. Calculate totals
                const total = weight * pricePerGram;

                // 6. Calculate in other currency for records
                let pricePerGramUSD: number;
                let pricePerGramSYP: number;
                let totalUSD: number;
                let totalSYP: number;

                if (currency === CurrencyType.USD) {
                    pricePerGramUSD = pricePerGram;
                    pricePerGramSYP = pricePerGram * currentPrices.exchangeRateUSDtoSYP;
                    totalUSD = total;
                    totalSYP = total * currentPrices.exchangeRateUSDtoSYP;
                } else {
                    pricePerGramSYP = pricePerGram;
                    pricePerGramUSD = pricePerGram / currentPrices.exchangeRateUSDtoSYP;
                    totalSYP = total;
                    totalUSD = total / currentPrices.exchangeRateUSDtoSYP;
                }

                // 7. Calculate cost price (current store price with profit margin)
                const profitMargin = getProfitMargin(storeId, goldType, store);
                const costPricePerGramUSD = pricePerGramUSD / (1 + (profitMargin / 100));
                const costPriceUSD = weight * costPricePerGramUSD;

                // 8. Calculate profit
                const { profitUSD, profitMargin: actualProfitMargin } = calculateProfit(
                    costPriceUSD,
                    totalUSD
                );

                const profitSYP = profitUSD * currentPrices.exchangeRateUSDtoSYP;

                // 9. Generate invoice number
                const invoiceNumber = await generateInvoiceNumber(storeId);

                // 10. Start transaction to update multiple records
                const result = await prisma.$transaction(async (tx) => {
                    // Create the sale
                    const newSale = await tx.sale.create({
                        data: {
                            invoiceNumber,
                            weight,
                            goldType,
                            pricePerGramUSD,
                            pricePerGramSYP,
                            totalUSD,
                            totalSYP,
                            currency,
                            paymentType,
                            amountPaid,
                            customerName: customerName || null,
                            customerPhone: customerPhone || null,
                            description: description || null,
                            costPriceUSD,
                            profitUSD,
                            profitSYP,
                            profitMargin: actualProfitMargin,
                            storeId,
                        }
                    });

                    // Update store inventory (deduct gold)
                    const updateData: any = {};
                    switch (goldType) {
                        case GoldType.GOLD_14:
                            updateData.currentGold14 = { decrement: weight };
                            break;
                        case GoldType.GOLD_18:
                            updateData.currentGold18 = { decrement: weight };
                            break;
                        case GoldType.GOLD_21:
                            updateData.currentGold21 = { decrement: weight };
                            break;
                        case GoldType.GOLD_24:
                            updateData.currentGold24 = { decrement: weight };
                            break;
                    }

                    // Update store cash balance (add cash)
                    if (currency === CurrencyType.USD) {
                        updateData.currentUSD = { increment: amountPaid };
                    } else {
                        updateData.currentSYP = { increment: amountPaid };
                    }

                    await tx.store.update({
                        where: { id: storeId },
                        data: updateData
                    });

                    // Check if there's an open report for today
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    let report = await tx.report.findFirst({
                        where: {
                            storeId,
                            date: {
                                gte: today,
                                lt: tomorrow
                            },
                            status: 'Opening'
                        }
                    });

                    // If no open report exists, create one with current store balances
                    if (!report) {
                        report = await tx.report.create({
                            data: {
                                storeId,
                                openingUSD: store.currentUSD,
                                openingSYP: store.currentSYP,
                                openingGold14: store.currentGold14,
                                openingGold18: store.currentGold18,
                                openingGold21: store.currentGold21,
                                openingGold24: store.currentGold24,
                                priceGold14USD: currentPrices.priceGold14USD,
                                priceGold18USD: currentPrices.priceGold18USD,
                                priceGold21USD: currentPrices.priceGold21USD,
                                priceGold24USD: currentPrices.priceGold24USD,
                                priceGold14SYP: currentPrices.priceGold14SYP,
                                priceGold18SYP: currentPrices.priceGold18SYP,
                                priceGold21SYP: currentPrices.priceGold21SYP,
                                priceGold24SYP: currentPrices.priceGold24SYP,
                                exchangeRateUSDtoSYP: currentPrices.exchangeRateUSDtoSYP,
                            }
                        });
                    }

                    // Connect sale to report
                    await tx.sale.update({
                        where: { id: newSale.id },
                        data: { reportId: report.id }
                    });

                    // Update report totals
                    await tx.report.update({
                        where: { id: report.id },
                        data: {
                            totalGoldSold: { increment: weight },
                            totalSalesUSD: { increment: totalUSD },
                            totalSalesSYP: { increment: totalSYP },
                            profitUSD: { increment: profitUSD },
                            profitSYP: { increment: profitSYP },
                        }
                    });

                    return newSale;
                });

                return c.json({
                    message: "Sale created successfully",
                    result: result,
                    success: true
                }, 201);

            } catch (error: any) {
                console.error("Error creating sale:", error);
                return c.json({
                    message: error.message || "Failed to create sale",
                    result: null,
                    success: false
                }, 500);
            }
        })

    // @desc    Update a sale (basic update - for non-critical fields only)
    // @route   PUT /sales/:id
    // @access  Private
    .put("/:id",
        authenticate,
        zValidator('json', getUpdateSaleSchema('en')),
        async (c) => {
            const user = c.get("user") as ContextUser;
            const { id } = c.req.param();
            const body = c.req.valid('json');

            try {
                // Check if sale exists and user has access
                const existingSale = await prisma.sale.findFirst({
                    where: {
                        id,
                        store: { ownerId: user.id }
                    }
                });

                if (!existingSale) {
                    return c.json({
                        message: "Sale not found or access denied",
                        result: null,
                        success: false
                    }, 403);
                }

                // Only allow updating non-critical fields
                const allowedUpdates = ['customerName', 'customerPhone', 'description', 'paymentType'];
                const updateData: any = {};

                allowedUpdates.forEach(field => {
                    if (body[field as keyof typeof body] !== undefined) {
                        updateData[field] = body[field as keyof typeof body] || null;
                    }
                });

                const updatedSale = await prisma.sale.update({
                    where: { id },
                    data: updateData
                });

                return c.json({
                    message: "Sale updated successfully",
                    result: updatedSale,
                    success: true
                });

            } catch (error: any) {
                console.error("Error updating sale:", error);
                return c.json({
                    message: error.message || "Failed to update sale",
                    result: null,
                    success: false
                }, 500);
            }
        })

    // @desc    Delete a sale (with reversal of inventory and cash)
    // @route   DELETE /sales/:id
    // @access  Private
    .delete("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

        try {
            // Check if sale exists and user has access
            const existingSale = await prisma.sale.findFirst({
                where: {
                    id,
                    store: { ownerId: user.id }
                }
            });

            if (!existingSale) {
                return c.json({
                    message: "Sale not found or access denied",
                    result: null,
                    success: false
                }, 403);
            }

            // Start transaction to reverse the sale
            await prisma.$transaction(async (tx) => {
                // Reverse store inventory (add back gold)
                const updateData: any = {};
                switch (existingSale.goldType) {
                    case GoldType.GOLD_14:
                        updateData.currentGold14 = { increment: existingSale.weight };
                        break;
                    case GoldType.GOLD_18:
                        updateData.currentGold18 = { increment: existingSale.weight };
                        break;
                    case GoldType.GOLD_21:
                        updateData.currentGold21 = { increment: existingSale.weight };
                        break;
                    case GoldType.GOLD_24:
                        updateData.currentGold24 = { increment: existingSale.weight };
                        break;
                }

                // Reverse store cash balance (deduct cash)
                if (existingSale.currency === CurrencyType.USD) {
                    updateData.currentUSD = { decrement: existingSale.amountPaid };
                } else {
                    updateData.currentSYP = { decrement: existingSale.amountPaid };
                }

                await tx.store.update({
                    where: { id: existingSale.storeId },
                    data: updateData
                });

                // Update report totals if report exists
                if (existingSale.reportId) {
                    await tx.report.update({
                        where: { id: existingSale.reportId },
                        data: {
                            totalGoldSold: { decrement: existingSale.weight },
                            totalSalesUSD: { decrement: existingSale.totalUSD },
                            totalSalesSYP: { decrement: existingSale.totalSYP },
                            profitUSD: { decrement: existingSale.profitUSD },
                            profitSYP: { decrement: existingSale.profitSYP },
                        }
                    });
                }

                // Delete the sale
                await tx.sale.delete({
                    where: { id }
                });
            });

            return c.json({
                message: "Sale deleted successfully",
                result: null,
                success: true
            });

        } catch (error: any) {
            console.error("Error deleting sale:", error);
            return c.json({
                message: error.message || "Failed to delete sale",
                result: null,
                success: false
            }, 500);
        }
    })

    // @desc    Get sales statistics for a store
    // @route   GET /sales/stats/store/:storeId
    // @access  Private
    .get("/stats/store/:storeId", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { storeId } = c.req.param();

        try {
            // Verify store exists and user has access
            const store = await prisma.store.findFirst({
                where: {
                    id: storeId,
                    ownerId: user.id
                }
            });

            if (!store) {
                return c.json({
                    message: "Store not found or access denied",
                    result: null,
                    success: false
                }, 403);
            }

            // Get today's date range
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Get sales stats
            const [totalSales, todaySales, totalUSD, totalSYP, totalWeight, todayStats] = await Promise.all([
                // Total sales count
                prisma.sale.count({ where: { storeId } }),

                // Today's sales count
                prisma.sale.count({
                    where: {
                        storeId,
                        createdAt: {
                            gte: today,
                            lt: tomorrow
                        }
                    }
                }),

                // Total USD sales
                prisma.sale.aggregate({
                    where: { storeId, currency: 'USD' },
                    _sum: { totalUSD: true }
                }),

                // Total SYP sales
                prisma.sale.aggregate({
                    where: { storeId, currency: 'SYP' },
                    _sum: { totalSYP: true }
                }),

                // Total weight sold
                prisma.sale.aggregate({
                    where: { storeId },
                    _sum: { weight: true }
                }),

                // Today's stats
                prisma.sale.aggregate({
                    where: {
                        storeId,
                        createdAt: {
                            gte: today,
                            lt: tomorrow
                        }
                    },
                    _sum: {
                        weight: true,
                        totalUSD: true,
                        totalSYP: true,
                        profitUSD: true,
                        profitSYP: true
                    }
                })
            ]);

            const stats = {
                totalSales,
                todaySales,
                totalUSD: totalUSD._sum.totalUSD || 0,
                totalSYP: totalSYP._sum.totalSYP || 0,
                totalWeight: totalWeight._sum.weight || 0,
                todayWeight: todayStats._sum.weight || 0,
                todayUSD: todayStats._sum.totalUSD || 0,
                todaySYP: todayStats._sum.totalSYP || 0,
                todayProfitUSD: todayStats._sum.profitUSD || 0,
                todayProfitSYP: todayStats._sum.profitSYP || 0,
                storeInventory: {
                    currentGold14: store.currentGold14,
                    currentGold18: store.currentGold18,
                    currentGold21: store.currentGold21,
                    currentGold24: store.currentGold24,
                    currentUSD: store.currentUSD,
                    currentSYP: store.currentSYP,
                }
            };

            return c.json({
                message: "Sales statistics fetched successfully",
                result: stats,
                success: true
            });

        } catch (error: any) {
            console.error("Error fetching sales stats:", error);
            return c.json({
                message: error.message || "Failed to fetch sales statistics",
                result: null,
                success: false
            }, 500);
        }
    })

    // @desc    Get sale with store details for invoice
    // @route   GET /sales/:id/invoice
    // @access  Private
    // @method  Get
    .get("/:id/invoice", authenticate, async (c) => {
        const { id } = c.req.param();
        const sale = await prisma.sale.findUnique({
            where: { id },
            include: {
                store: true
            }
        });

        if (!sale) {
            return c.json({ message: "Sale not found", result: null, success: false }, 404);
        }

        // Get current settings for exchange rate
        const settings = await prisma.settings.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        return c.json({ 
            message: "Sale invoice data fetched successfully", 
            result: { sale, settings },
            success: true 
        });
    });

export { salesRoutes };