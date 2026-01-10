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
} from "@/lib/zod"; // We'll add these to your zod.ts

const stockRoutes = new Hono();

stockRoutes
    // @desc    Get all stock movements for a store with pagination
    // @route   GET /stock/store/:storeId
    // @access  Private
    // @method  Get
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
            orderBy: { date: 'desc' },
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
    // @method  Get
    .get("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

        const stockMovement = await prisma.stock.findUnique({
            where: { id },
            include: {
                store: {
                    select: { name: true }
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
    // @method  Post
    .post("/store/:storeId",
        zValidator('json', getCreateStockSchema('en')),
        authenticate,
        async (c) => {
            console.log("👉👉 CREATE STOCK MOVEMENT");

            const user = c.get("user") as ContextUser;
            const { storeId } = c.req.param();
            const body = c.req.valid('json') as CreateStockInput;
            const {
                date,
                quantity,
                goldType,
                type,
                note
            } = body;

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

            const newStock = await prisma.stock.create({
                data: {
                    storeId,
                    date: date || new Date(),
                    quantity,
                    goldType,
                    type,
                    note: note || null
                }
            });

            return c.json({
                message: "Stock movement created successfully",
                result: newStock,
                success: true
            }, 201);
        })

    // @desc    Update a stock movement
    // @route   PUT /stock/:id
    // @access  Private
    // @method  Put
    .put("/:id",
        authenticate,
        zValidator('json', getUpdateStockSchema('en')),
        async (c) => {
            const user = c.get("user") as ContextUser;
            const { id } = c.req.param();
            const body = c.req.valid('json') as UpdateStockInput;

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

            const updateData: any = {};
            if (body.date !== undefined) updateData.date = body.date;
            if (body.quantity !== undefined) updateData.quantity = body.quantity;
            if (body.goldType !== undefined) updateData.goldType = body.goldType;
            if (body.type !== undefined) updateData.type = body.type;
            if (body.note !== undefined) updateData.note = body.note || null;

            const updatedStock = await prisma.stock.update({
                where: { id },
                data: updateData
            });

            return c.json({
                message: "Stock movement updated successfully",
                result: updatedStock,
                success: true
            });
        })

    // @desc    Delete a stock movement
    // @route   DELETE /stock/:id
    // @access  Private
    // @method  Delete
    .delete("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

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

        await prisma.stock.delete({
            where: { id }
        });

        return c.json({
            message: "Stock movement deleted successfully",
            result: null,
            success: true
        });
    })

    // @desc    Get stock statistics for a store
    // @route   GET /stock/stats/store/:storeId
    // @access  Private
    // @method  Get
    .get("/stats/store/:storeId", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { storeId } = c.req.param();

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

        // Get all stock movements
        const stockMovements = await prisma.stock.findMany({
            where: { storeId },
            orderBy: { date: 'asc' }
        });

        // Calculate current stock by gold type
        const currentStock = {
            GOLD_14: 0,
            GOLD_18: 0,
            GOLD_21: 0,
            GOLD_24: 0
        };

        stockMovements.forEach(movement => {
            if (movement.type === 'ADD') {
                currentStock[movement.goldType] += movement.quantity;
            } else if (movement.type === 'REMOVE') {
                currentStock[movement.goldType] -= movement.quantity;
            }
        });

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
    })

    // @desc    Get stock movements by date range
    // @route   GET /stock/store/:storeId/date-range
    // @access  Private
    // @method  Get
    .get("/store/:storeId/date-range", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { storeId } = c.req.param();
        const fromDate = c.req.query("from");
        const toDate = c.req.query("to");

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
            whereClause.date = {};
            if (fromDate) whereClause.date.gte = new Date(fromDate);
            if (toDate) whereClause.date.lte = new Date(toDate);
        }

        const stockMovements = await prisma.stock.findMany({
            where: whereClause,
            orderBy: { date: 'desc' },
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
    });

export { stockRoutes };