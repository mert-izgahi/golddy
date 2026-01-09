import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { authenticate } from "@/lib/auth-middlewares";
import { ContextUser } from "@/lib/types";

const salesRoutes = new Hono();

salesRoutes
    // @desc    Get all sales for a store with pagination
    // @route   GET /sales/store/:storeId
    // @access  Private
    // @method  Get
    .get("/store/:storeId", authenticate, async (c) => {
        const { storeId } = c.req.param();
        const page = parseInt(c.req.query("page") || "1");
        const limit = parseInt(c.req.query("limit") || "10");
        const skip = (page - 1) * limit;
        
        // Get total count for pagination
        const total = await prisma.sale.count({
            where: { storeId }
        });
        
        const sales = await prisma.sale.findMany({
            where: { storeId },
            orderBy: { date: 'desc' },
            skip,
            take: limit,
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
    // @method  Get
    .get("/:id", authenticate, async (c) => {
        const { id } = c.req.param();
        const sale = await prisma.sale.findUnique({
            where: { id },
            include: {
                store: {
                    select: { name: true }
                }
            }
        });
        
        if (!sale) {
            return c.json({ message: "Sale not found", result: null, success: false }, 404);
        }
        
        return c.json({ message: "Sale fetched successfully", result: sale, success: true });
    })

    // @desc    Create a new sale
    // @route   POST /sales
    // @access  Private
    // @method  Post
    .post("/", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const body = await c.req.json();
        const { 
            storeId, 
            weight, 
            goldType, 
            pricePerGram, 
            total, 
            currency, 
            customerName, 
            description, 
            paymentType 
        } = body;

        // Validate required fields
        if (!storeId || !weight || !goldType || !pricePerGram || !total || !currency || !paymentType) {
            return c.json({ message: "Missing required fields", result: null, success: false }, 400);
        }

        // Validate enum values
        const validGoldTypes = ['GOLD_14', 'GOLD_18', 'GOLD_21', 'GOLD_24'];
        const validCurrencies = ['USD', 'SYP'];
        const validPaymentTypes = ['CASH', 'TRANSFER', 'OTHER'];

        if (!validGoldTypes.includes(goldType)) {
            return c.json({ message: "Invalid gold type", result: null, success: false }, 400);
        }
        if (!validCurrencies.includes(currency)) {
            return c.json({ message: "Invalid currency type", result: null, success: false }, 400);
        }
        if (!validPaymentTypes.includes(paymentType)) {
            return c.json({ message: "Invalid payment type", result: null, success: false }, 400);
        }

        // Verify store exists and user has access
        const store = await prisma.store.findFirst({
            where: { 
                id: storeId,
                ownerId: user!.id 
            }
        });

        if (!store) {
            return c.json({ message: "Store not found or access denied", result: null, success: false }, 403);
        }

        const newSale = await prisma.sale.create({
            data: {
                storeId,
                weight,
                goldType,
                pricePerGram,
                total,
                currency,
                customerName,
                description,
                paymentType,
                date: new Date()
            }
        });

        return c.json({ message: "Sale created successfully", result: newSale, success: true }, 201);
    })

    // @desc    Update a sale
    // @route   PUT /sales/:id
    // @access  Private
    // @method  Put
    .put("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();
        const body = await c.req.json();
        const { 
            weight, 
            goldType, 
            pricePerGram, 
            total, 
            currency, 
            customerName, 
            description, 
            paymentType 
        } = body;

        // Check if sale exists and user has access
        const existingSale = await prisma.sale.findFirst({
            where: { 
                id,
                store: { ownerId: user!.id }
            }
        });

        if (!existingSale) {
            return c.json({ message: "Sale not found or access denied", result: null, success: false }, 403);
        }

        // Validate enum values if provided
        if (goldType) {
            const validGoldTypes = ['GOLD_14', 'GOLD_18', 'GOLD_21', 'GOLD_24'];
            if (!validGoldTypes.includes(goldType)) {
                return c.json({ message: "Invalid gold type", result: null, success: false }, 400);
            }
        }
        if (currency) {
            const validCurrencies = ['USD', 'SYP'];
            if (!validCurrencies.includes(currency)) {
                return c.json({ message: "Invalid currency type", result: null, success: false }, 400);
            }
        }
        if (paymentType) {
            const validPaymentTypes = ['CASH', 'TRANSFER', 'OTHER'];
            if (!validPaymentTypes.includes(paymentType)) {
                return c.json({ message: "Invalid payment type", result: null, success: false }, 400);
            }
        }

        const updateData: any = {};
        if (weight !== undefined) updateData.weight = weight;
        if (goldType !== undefined) updateData.goldType = goldType;
        if (pricePerGram !== undefined) updateData.pricePerGram = pricePerGram;
        if (total !== undefined) updateData.total = total;
        if (currency !== undefined) updateData.currency = currency;
        if (customerName !== undefined) updateData.customerName = customerName;
        if (description !== undefined) updateData.description = description;
        if (paymentType !== undefined) updateData.paymentType = paymentType;

        const updatedSale = await prisma.sale.update({
            where: { id },
            data: updateData
        });

        return c.json({ message: "Sale updated successfully", result: updatedSale, success: true });
    })

    // @desc    Delete a sale
    // @route   DELETE /sales/:id
    // @access  Private
    // @method  Delete
    .delete("/:id", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;
        const { id } = c.req.param();

        // Check if sale exists and user has access
        const existingSale = await prisma.sale.findFirst({
            where: { 
                id,
                store: { ownerId: user!.id }
            }
        });

        if (!existingSale) {
            return c.json({ message: "Sale not found or access denied", result: null, success: false }, 403);
        }

        await prisma.sale.delete({
            where: { id }
        });

        return c.json({ message: "Sale deleted successfully", result: null, success: true });
    })

    // @desc    Get sales statistics for a store
    // @route   GET /sales/stats/store/:storeId
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
            return c.json({ message: "Store not found or access denied", result: null, success: false }, 403);
        }

        // Get sales stats
        const totalSales = await prisma.sale.count({
            where: { storeId }
        });

        const totalUSD = await prisma.sale.aggregate({
            where: { storeId, currency: 'USD' },
            _sum: { total: true }
        });

        const totalSYP = await prisma.sale.aggregate({
            where: { storeId, currency: 'SYP' },
            _sum: { total: true }
        });

        const totalWeight = await prisma.sale.aggregate({
            where: { storeId },
            _sum: { weight: true }
        });

        const stats = {
            totalSales,
            totalUSD: totalUSD._sum.total || 0,
            totalSYP: totalSYP._sum.total || 0,
            totalWeight: totalWeight._sum.weight || 0
        };

        return c.json({ message: "Sales statistics fetched successfully", result: stats, success: true });
    });

export { salesRoutes };