import { Hono } from "hono";
import prisma from "@/lib/prisma";
import { authenticate, authorize } from "@/lib/auth-middlewares";
import { Role } from "@/lib/generated/prisma";import { zValidator } from "@hono/zod-validator";

import { hashPassword } from "@/lib/hash-password";
import { getUserSchema, UserInput } from "@/lib/zod";
import { ContextUser } from "@/lib/types";
const schema = getUserSchema("en");

const usersRoutes = new Hono();

// --------------------------
// 📍 Routes
// --------------------------

// @desc    Get all users with pagination
// @route   GET /users
// @access  Private (Admin)
usersRoutes.get("/", authenticate, authorize([Role.ADMIN]), async (c) => {
    try {
        // Get pagination parameters
        const page = parseInt(c.req.query("page") || "1");
        const limit = parseInt(c.req.query("limit") || "10");
        const search = c.req.query("search") || "";
        const role = c.req.query("role") as Role | undefined;

        const skip = (page - 1) * limit;

        // Build where clause for filtering
        const where: any = {};

        // Add search filter (name or email)
        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive' as const
                    }
                },
                {
                    email: {
                        contains: search,
                        mode: 'insensitive' as const
                    }
                }
            ];
        }

        // Add role filter if provided
        if (role) {
            where.role = role;
        }

        // Get total count for pagination
        const total = await prisma.user.count({ where });

        // Get users with pagination
        const users = await prisma.user.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true,
                password: false,
            }
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;

        return c.json(
            {
                message: "Users fetched successfully",
                result: users,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext,
                    hasPrevious
                },
                success: true
            },
            200
        );
    } catch (error) {
        console.error("Error fetching users:", error);
        return c.json(
            { message: "Failed to fetch users", result: null, success: false },
            500
        );
    }
});

// @desc    Get single user
// @route   GET /users/:id
// @access  Private (Admin)
usersRoutes.get("/:id", authenticate, authorize([Role.ADMIN]), async (c) => {
    const id = c.req.param("id");

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true,
                password: false,
            }
        });
        if (!user) {
            return c.json(
                { message: "User not found", result: null, success: false },
                404
            );
        }
        return c.json(
            { message: "User fetched successfully", result: user, success: true },
            200
        );
    } catch (error) {
        console.error("Error fetching user:", error);
        return c.json(
            { message: "Failed to fetch user", result: null, success: false },
            500
        );
    }
});

// @desc    Create new user
// @route   POST /users
// @access  Private (Admin)
usersRoutes.post(
    "/",
    authenticate,
    authorize([Role.ADMIN]),
    zValidator("json", schema),
    async (c) => {
        const data: UserInput = c.req.valid("json");

        try {
            // Check if email already exists
            const existing = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existing) {
                return c.json(
                    { message: "Email already exists", result: null, success: false },
                    400
                );
            }

            // Hash the password before saving
            const hashedPassword = await hashPassword(data.password!);

            const user = await prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    phoneNumber: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false,
                }
            });

            return c.json(
                { message: "User created successfully", result: user, success: true },
                201
            );
        } catch (error) {
            console.error("Error creating user:", error);
            return c.json(
                { message: "Failed to create user", result: null, success: false },
                500
            );
        }
    }
);

// @desc    Update user
// @route   PUT /users/:id
// @access  Private (Admin)
usersRoutes.put(
    "/:id",
    authenticate,
    authorize([Role.ADMIN]),
    zValidator("json", schema),
    async (c) => {
        const id = c.req.param("id");
        const data: Partial<UserInput> = c.req.valid("json");

        try {
            // Check if user exists
            const existingUser = await prisma.user.findUnique({
                where: { id }
            });

            if (!existingUser) {
                return c.json(
                    { message: "User not found", result: null, success: false },
                    404
                );
            }

            // Check if email is being changed and already exists
            if (data.email && data.email !== existingUser.email) {
                const emailExists = await prisma.user.findUnique({
                    where: { email: data.email }
                });
                if (emailExists) {
                    return c.json(
                        { message: "Email already exists", result: null, success: false },
                        400
                    );
                }
            }

            // Hash password if provided in update
            let updateData = { ...data };
            if (data.password) {
                updateData.password = await hashPassword(data.password);
            }

            const updated = await prisma.user.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    phoneNumber: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false,
                }
            });

            return c.json(
                { message: "User updated successfully", result: updated, success: true },
                200
            );
        } catch (error) {
            console.error("Error updating user:", error);
            return c.json(
                { message: "Failed to update user", result: null, success: false },
                500
            );
        }
    }
);

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private (Admin)
usersRoutes.delete("/:id", authenticate, authorize([Role.ADMIN]), async (c) => {
    const id = c.req.param("id");

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existingUser) {
            return c.json(
                { message: "User not found", result: null, success: false },
                404
            );
        }

        // Prevent admin from deleting themselves
        const currentUser = c.get("user") as ContextUser;
        if (existingUser.id === currentUser.id) {
            return c.json(
                { message: "Cannot delete your own account", result: null, success: false },
                400
            );
        }

        await prisma.user.delete({ where: { id } });

        return c.json(
            { message: "User deleted successfully", result: null, success: true },
            200
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        return c.json(
            { message: "Failed to delete user", result: null, success: false },
            500
        );
    }
});



export { usersRoutes };