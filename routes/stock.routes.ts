// routes/stock.routes.ts
import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate } from "@/lib/auth-middlewares";
import { ContextUser } from "@/lib/types";
import { zValidator } from "@hono/zod-validator";
import {
    getCreateStockSchema,
    getUpdateStockSchema,
    type CreateStockInput,
    type UpdateStockInput
} from "@/zod/stock.schemas";
import { GoldType } from "@/lib/generated/prisma/client";

const stockRoutes = new Hono();

// Helper function to get the current gold balance for a specific gold type
async function getCurrentGoldBalance(storeId: string, goldType: GoldType): Promise<number> {
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

    const balanceMap = {
        GOLD_14: store.currentGold14,
        GOLD_18: store.currentGold18,
        GOLD_21: store.currentGold21,
        GOLD_24: store.currentGold24,
    };

    return balanceMap[goldType] || 0;
}

// Helper function to update store gold balance
async function updateStoreGoldBalance(
    storeId: string,
    goldType: GoldType,
    quantity: number,
    type: "ADD" | "REMOVE"
) {
    const currentBalance = await getCurrentGoldBalance(storeId, goldType);
    const adjustment = type === "ADD" ? quantity : -quantity;
    const newBalance = currentBalance + adjustment;

    if (newBalance < 0) {
        throw new Error("Insufficient stock for removal operation");
    }

    const updateData: any = {};

    switch (goldType) {
        case "GOLD_14":
            updateData.currentGold14 = newBalance;
            break;
        case "GOLD_18":
            updateData.currentGold18 = newBalance;
            break;
        case "GOLD_21":
            updateData.currentGold21 = newBalance;
            break;
        case "GOLD_24":
            updateData.currentGold24 = newBalance;
            break;
    }

    await prisma.store.update({
        where: { id: storeId },
        data: updateData
    });

    return newBalance;
}

stockRoutes
    // @desc    Get all stock movements for a store with pagination
    // @route   GET /stock/store/:storeId
    // @access  Private
    .get("/store/:storeId", authenticate, async (c) => {
        const { storeId } = c.req.param();
        const user = c.get("user") as ContextUser;

        // Verify store exists and user has access
        const store = await prisma.store.findFirst({
            where: {
                id: storeId,
                ownerId: user!.id
            }
        });

        if (!store) {
            return c.json({
                message: "Store not found or access denied",
                result: null,
                success: false
            }, 403);
        }

        const page = parseInt(c.req.query("page") || "1");
        const limit = parseInt(c.req.query("limit") || "10");
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await prisma.stock.count({
            where: { storeId }
        });

        const stockMovements = await prisma.stock.findMany({
            where: { storeId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                report: {
                    select: {
                        id: true,
                        date: true,
                        status: true
                    }
                }
            }
        });

        const totalPages = Math.ceil(total / limit);

        return c.json({
            message: "Stock movements fetched successfully",
            result: stockMovements,
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

    // @desc    Get stock movement by ID
    // @route   GET /stock/:id
    // @access  Private
    .get("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

        const stockMovement = await prisma.stock.findUnique({
            where: { id },
            include: {
                store: {
                    select: { name: true, id: true }
                },
                report: {
                    select: {
                        id: true,
                        date: true,
                        status: true
                    }
                }
            }
        });

        if (!stockMovement) {
            return c.json({
                message: "Stock movement not found",
                result: null,
                success: false
            }, 404);
        }

        // Verify user has access to this stock movement
        const hasAccess = await prisma.store.findFirst({
            where: {
                id: stockMovement.storeId,
                ownerId: user!.id
            }
        });

        if (!hasAccess) {
            return c.json({
                message: "Access denied to this stock movement",
                result: null,
                success: false
            }, 403);
        }

        return c.json({
            message: "Stock movement fetched successfully",
            result: stockMovement,
            success: true
        });
    })

    // @desc    Create a new stock movement
    // @route   POST /stock/store/:storeId
    // @access  Private
    .post("/store/:storeId",
        authenticate,
        zValidator('json', getCreateStockSchema('en')),
        async (c) => {
            console.log("👉 CREATE STOCK MOVEMENT");

            const user = c.get("user") as ContextUser;
            const { storeId } = c.req.param();
            const body = c.req.valid('json') as CreateStockInput;
            const {
                quantity,
                goldType,
                type,
                costPerGramUSD,
                totalCostUSD,
                totalCostSYP,
                supplier,
                invoiceRef,
                note
            } = body;

            try {
                // Verify store exists and user has access
                const store = await prisma.store.findFirst({
                    where: {
                        id: storeId,
                        ownerId: user!.id
                    }
                });

                if (!store) {
                    return c.json({
                        message: "Store not found or access denied",
                        result: null,
                        success: false
                    }, 403);
                }

                // Check if removing more than available
                if (type === "REMOVE") {
                    const currentBalance = await getCurrentGoldBalance(storeId, goldType);
                    if (currentBalance < quantity) {
                        return c.json({
                            message: `Insufficient stock. Current balance: ${currentBalance}g, Requested removal: ${quantity}g`,
                            result: null,
                            success: false
                        }, 400);
                    }
                }

                // Update store gold balance and get new balance
                const balanceAfter = await updateStoreGoldBalance(storeId, goldType, quantity, type);

                // Create stock movement record
                const newStock = await prisma.stock.create({
                    data: {
                        storeId,
                        quantity,
                        goldType,
                        type,
                        balanceAfter,
                        costPerGramUSD: costPerGramUSD || null,
                        totalCostUSD: totalCostUSD || null,
                        totalCostSYP: totalCostSYP || null,
                        supplier: supplier || null,
                        invoiceRef: invoiceRef || null,
                        note: note || null,
                    },
                    include: {
                        store: {
                            select: {
                                name: true
                            }
                        }
                    }
                });

                return c.json({
                    message: "Stock movement created successfully",
                    result: newStock,
                    success: true
                }, 201);
            } catch (error: any) {
                console.error("Error creating stock movement:", error);
                return c.json({
                    message: error.message || "Failed to create stock movement",
                    result: null,
                    success: false
                }, 500);
            }
        })

    // @desc    Update a stock movement
    // @route   PUT /stock/:id
    // @access  Private
    .put("/:id",
        authenticate,
        zValidator('json', getUpdateStockSchema('en')),
        async (c) => {
            const user = c.get("user") as ContextUser;
            const { id } = c.req.param();
            const body = c.req.valid('json') as UpdateStockInput;

            try {
                // Check if stock movement exists and user has access
                const existingStock = await prisma.stock.findFirst({
                    where: {
                        id,
                        store: { ownerId: user!.id }
                    },
                    include: {
                        store: true
                    }
                });

                if (!existingStock) {
                    return c.json({
                        message: "Stock movement not found or access denied",
                        result: null,
                        success: false
                    }, 403);
                }

                // If quantity, goldType, or type is being updated, we need to recalculate balances
                const isBalanceAffected =
                    body.quantity !== undefined ||
                    body.goldType !== undefined ||
                    body.type !== undefined;

                if (isBalanceAffected) {
                    // Revert the old movement
                    const revertType = existingStock.type === "ADD" ? "REMOVE" : "ADD";
                    await updateStoreGoldBalance(
                        existingStock.storeId,
                        existingStock.goldType,
                        existingStock.quantity,
                        revertType
                    );

                    // Apply the new movement
                    const newQuantity = body.quantity ?? existingStock.quantity;
                    const newGoldType = body.goldType ?? existingStock.goldType;
                    const newType = body.type ?? existingStock.type;

                    const balanceAfter = await updateStoreGoldBalance(
                        existingStock.storeId,
                        newGoldType,
                        newQuantity,
                        newType
                    );

                    body.balanceAfter = balanceAfter!;
                }

                const updatedStock = await prisma.stock.update({
                    where: { id },
                    data: {
                        ...body,
                        costPerGramUSD: body.costPerGramUSD !== undefined ? body.costPerGramUSD : undefined,
                        totalCostUSD: body.totalCostUSD !== undefined ? body.totalCostUSD : undefined,
                        totalCostSYP: body.totalCostSYP !== undefined ? body.totalCostSYP : undefined,
                        supplier: body.supplier !== undefined ? body.supplier : undefined,
                        invoiceRef: body.invoiceRef !== undefined ? body.invoiceRef : undefined,
                        note: body.note !== undefined ? body.note : undefined,
                        balanceAfter: body.balanceAfter! !== undefined ? body.balanceAfter! : 0
                    },
                    include: {
                        store: {
                            select: {
                                name: true
                            }
                        }
                    }
                });

                return c.json({
                    message: "Stock movement updated successfully",
                    result: updatedStock,
                    success: true
                });
            } catch (error: any) {
                console.error("Error updating stock movement:", error);
                return c.json({
                    message: error.message || "Failed to update stock movement",
                    result: null,
                    success: false
                }, 500);
            }
        })

    // @desc    Delete a stock movement
    // @route   DELETE /stock/:id
    // @access  Private
    .delete("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

        try {
            // Check if stock movement exists and user has access
            const existingStock = await prisma.stock.findFirst({
                where: {
                    id,
                    store: { ownerId: user!.id }
                }
            });

            if (!existingStock) {
                return c.json({
                    message: "Stock movement not found or access denied",
                    result: null,
                    success: false
                }, 403);
            }

            // Revert the stock movement from store balance
            const revertType = existingStock.type === "ADD" ? "REMOVE" : "ADD";
            await updateStoreGoldBalance(
                existingStock.storeId,
                existingStock.goldType,
                existingStock.quantity,
                revertType
            );

            // Delete the stock movement
            await prisma.stock.delete({
                where: { id }
            });

            return c.json({
                message: "Stock movement deleted successfully",
                result: null,
                success: true
            });
        } catch (error: any) {
            console.error("Error deleting stock movement:", error);
            return c.json({
                message: error.message || "Failed to delete stock movement",
                result: null,
                success: false
            }, 500);
        }
    })

    // @desc    Get stock statistics for a store
    // @route   GET /stock/stats/store/:storeId
    // @access  Private
    .get("/stats/store/:storeId", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { storeId } = c.req.param();

        try {
            // Verify store exists and user has access
            const store = await prisma.store.findFirst({
                where: {
                    id: storeId,
                    ownerId: user!.id
                },
                select: {
                    currentGold14: true,
                    currentGold18: true,
                    currentGold21: true,
                    currentGold24: true,
                }
            });

            if (!store) {
                return c.json({
                    message: "Store not found or access denied",
                    result: null,
                    success: false
                }, 403);
            }

            // Get current stock from store (source of truth)
            const currentStock = {
                GOLD_14: store.currentGold14,
                GOLD_18: store.currentGold18,
                GOLD_21: store.currentGold21,
                GOLD_24: store.currentGold24,
            };

            // Get totals
            const totalAdditions = await prisma.stock.aggregate({
                where: { storeId, type: 'ADD' },
                _sum: { quantity: true }
            });

            const totalRemovals = await prisma.stock.aggregate({
                where: { storeId, type: 'REMOVE' },
                _sum: { quantity: true }
            });

            const totalMovements = await prisma.stock.count({
                where: { storeId }
            });

            const stats = {
                currentStock,
                totalAdditions: totalAdditions._sum.quantity || 0,
                totalRemovals: totalRemovals._sum.quantity || 0,
                totalMovements,
                netChange: (totalAdditions._sum.quantity || 0) - (totalRemovals._sum.quantity || 0)
            };

            return c.json({
                message: "Stock statistics fetched successfully",
                result: stats,
                success: true
            });
        } catch (error: any) {
            console.error("Error fetching stock statistics:", error);
            return c.json({
                message: error.message || "Failed to fetch stock statistics",
                result: null,
                success: false
            }, 500);
        }
    })

    // @desc    Get stock movements by date range
    // @route   GET /stock/store/:storeId/date-range
    // @access  Private
    .get("/store/:storeId/date-range", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { storeId } = c.req.param();
        const fromDate = c.req.query("from");
        const toDate = c.req.query("to");

        try {
            // Verify store exists and user has access
            const store = await prisma.store.findFirst({
                where: {
                    id: storeId,
                    ownerId: user!.id
                }
            });

            if (!store) {
                return c.json({
                    message: "Store not found or access denied",
                    result: null,
                    success: false
                }, 403);
            }

            const whereClause: any = { storeId };

            if (fromDate || toDate) {
                whereClause.createdAt = {};
                if (fromDate) whereClause.createdAt.gte = new Date(fromDate);
                if (toDate) whereClause.createdAt.lte = new Date(toDate);
            }

            const stockMovements = await prisma.stock.findMany({
                where: whereClause,
                orderBy: { createdAt: 'desc' },
                include: {
                    report: {
                        select: {
                            id: true,
                            date: true,
                            status: true
                        }
                    }
                }
            });

            return c.json({
                message: "Stock movements fetched successfully",
                result: stockMovements,
                success: true
            });
        } catch (error: any) {
            console.error("Error fetching stock movements by date range:", error);
            return c.json({
                message: error.message || "Failed to fetch stock movements",
                result: null,
                success: false
            }, 500);
        }
    });

export { stockRoutes };