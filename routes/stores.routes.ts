import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate, authorize } from "@/lib/auth-middlewares";
import { ContextUser } from "@/lib/types";
import { Role } from "@/lib/generated/prisma/client";import { StoreStatus } from "@/lib/generated/prisma/client";

const storesRoutes = new Hono();

storesRoutes
    // @desc    Get all stores
    // @route   GET /stores
    // @access  Private
    // @method  Get
    .get("/", authenticate, authorize([Role.ADMIN]), async (c) => {
        const page = parseInt(c.req.query("page") || "1");
        const limit = parseInt(c.req.query("limit") || "10");
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await prisma.store.count();

        const stores = await prisma.store.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return c.json({
            message: "Stores fetched successfully",
            result: stores,
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

    // @desc    Get store by user ID
    // @route   GET /stores/user/:userId
    // @access  Private
    // @method  Get
    .get("/user/:userId", authenticate, async (c) => {
        const { userId } = c.req.param();
        const store = await prisma.store.findFirst({
            where: { ownerId: userId },
        });
        return c.json({
            message: "Store fetched successfully",
            result: store,
            success: true
        });
    })

    // @desc    Get store by ID
    // @route   GET /stores/:id
    // @access  Private
    // @method  Get
    .get("/:id", authenticate, async (c) => {
        const { id } = c.req.param();
        const store = await prisma.store.findUnique({
            where: { id },
        });
        if (!store) {
            return c.json({
                message: "Store not found",
                result: null,
                success: false
            }, 404);
        }

        return c.json({
            message: "Store fetched successfully",
            result: store,
            success: true
        });
    })

    // @desc    Create a new store
    // @route   POST /stores
    // @access  Private
    // @method  Post
    .post("/", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;

        const body = await c.req.json();
        const {
            name,
            address,
            city,
            logoUrl,
            primaryPhoneNumber,
            secondaryPhoneNumber,
            status = StoreStatus.ACTIVE,
            currentGold14 = 0,
            currentGold18 = 0,
            currentGold21 = 0,
            currentGold24 = 0,
            currentUSD = 0,
            currentSYP = 0,
            priceGold14USD = 0,
            priceGold18USD = 0,
            priceGold21USD = 0,
            priceGold24USD = 0,
            exchangeRateUSDtoSYP = 0
        } = body;

        if (!name) {
            return c.json({
                message: "Name is required",
                result: null,
                success: false
            }, 400);
        }

        try {
            const newStore = await prisma.store.create({
                data: {
                    name,
                    address,
                    city,
                    logoUrl,
                    primaryPhoneNumber,
                    secondaryPhoneNumber,
                    status,
                    currentGold14,
                    currentGold18,
                    currentGold21,
                    currentGold24,
                    currentUSD,
                    currentSYP,
                    priceGold14USD,
                    priceGold18USD,
                    priceGold21USD,
                    priceGold24USD,
                    exchangeRateUSDtoSYP,
                    ownerId: user.id
                },
            });

            return c.json({
                message: "Store created successfully",
                result: newStore,
                success: true
            }, 201);
        } catch (error: any) {
            console.error("Error creating store:", error);
            return c.json({
                message: error.code === 'P2002'
                    ? "Store name already exists"
                    : "Failed to create store",
                result: null,
                success: false
            }, 400);
        }
    })

    // @desc    Update a store
    // @route   PUT /stores/:id
    // @access  Private
    // @method  Put
    .put("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();
        const body = await c.req.json();

        // Check if store exists
        const existingStore = await prisma.store.findUnique({
            where: { id },
        });

        if (!existingStore) {
            return c.json({
                message: "Store not found",
                result: null,
                success: false
            }, 404);
        }

        // Check if user is owner or admin
        if (existingStore.ownerId !== user.id && user.role !== Role.ADMIN) {
            return c.json({
                message: "Not authorized to update this store",
                result: null,
                success: false
            }, 403);
        }

        try {
            const updatedStore = await prisma.store.update({
                where: { id },
                data: body,
            });

            return c.json({
                message: "Store updated successfully",
                result: updatedStore,
                success: true
            });
        } catch (error: any) {
            console.error("Error updating store:", error);
            return c.json({
                message: error.code === 'P2002'
                    ? "Store name already exists"
                    : "Failed to update store",
                result: null,
                success: false
            }, 400);
        }
    });

export { storesRoutes };