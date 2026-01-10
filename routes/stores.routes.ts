import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate, authorize } from "@/lib/auth-middlewares";
import { ContextUser } from "@/lib/types";
import { Role } from "@/lib/generated/prisma";


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
            }, success: true
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
        return c.json({ message: "Store fetched successfully", result: store, success: true });
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
            return c.json({ message: "Store not found", result: null, success: false }, 404);
        }

        return c.json({ message: "Store fetched successfully", result: store, success: true });
    })

    // @desc    Create a new store
    // @route   POST /stores
    // @access  Private
    // @method  Post
    .post("/", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;

        const body = await c.req.json();
        const { name } = body;

        if (!name) {
            return c.json({ message: "Name is required", result: null, success: false }, 400);
        }

        const newStore = await prisma.store.create({
            data: { name, ownerId: user!.id },
        });

        return c.json({ message: "Store created successfully", result: newStore, success: true }, 201);
    })
    
    ;


export { storesRoutes };