import { Hono } from "hono";
import { hashPassword, comparePassword } from "@/lib/hash-password";
import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { authenticate } from "@/lib/auth-middlewares";
import { getSignInSchema } from "@/lib/zod";
import { zValidator } from "@hono/zod-validator";
import { ContextUser } from "@/lib/types";


export const authRoutes = new Hono();
const signInSchema = getSignInSchema("en");

authRoutes
    // @desc    Sign in user and return JWT token
    // @route   POST /auth/sign-in
    // @access  Public
    // @method  Post
    .post("/sign-in", zValidator("json", signInSchema, (result, c) => {
        if (!result.success) {
            return c.json({ message: "Invalid request data", result: null, success: false }, 400);
        }
    }), async (c) => {
        const body = await c.req.json();
        const parsed = signInSchema.safeParse(body);

        if (!parsed.success) {
            return c.json({ message: "Invalid request data", result: null, success: false }, 400);
        }

        const { email, password } = parsed.data;


        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            return c.json({ message: "Invalid email or password", result: null, success: false }, 401);
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return c.json({ message: "Invalid email or password", result: null, success: false }, 401);
        }

        const token = await generateToken({ id: user.id, email: user.email, role: user.role });


        // Set token in HttpOnly cookie
        c.header("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`);
        
        return c.json({ message: "Sign-in successful", result: { token }, success: true });
    })

    // @desc    Sign out user
    // @route   POST /auth/sign-out
    // @access  Private
    // @method  Post
    .post("/sign-out", authenticate, async (c) => {
        // Invalidate token on client side by deleting cookie
        const response = c.json({ message: "Sign-out successful", result: null, success: true });
        response.headers.append("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`);
        return response;
    })

    // @desc    Get authenticated user info
    // @route   GET /auth/me
    // @access  Private
    // @method  Get
    .get("/me", authenticate, async (c) => {
        const user = c.get("user") as ContextUser;

        if (!user) {
            return c.json({ message: "User not found", result: null, success: false }, 404);
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                role: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!dbUser) {
            return c.json({ message: "User not found", result: null, success: false }, 404);
        }

        return c.json({ message: "User fetched successfully", result: dbUser, success: true });
    })
    

    // @desc    Update authenticated user info
    // @route   PUT /auth/me
    // @access  Private
    // @method  Put
    .put("/me", authenticate, zValidator("json", signInSchema.partial(), (result, c) => {
        if (!result.success) {
            return c.json({ message: "Invalid request data", result: null, success: false }, 400);
        }
    }), async (c) => {
        const user = c.get("user") as ContextUser;

        if (!user) {
            return c.json({ message: "User not found", result: null, success: false }, 404);
        }

        const body = await c.req.json();
        const parsed = signInSchema.partial().safeParse(body);

        if (!parsed.success) {
            return c.json({ message: "Invalid request data", result: null, success: false }, 400);
        }

        const updateData: any = {};

        if (parsed.data.email) {
            updateData.email = parsed.data.email;
        }

        if (parsed.data.password) {
            updateData.password = await hashPassword(parsed.data.password);
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: updateData,
            select: {
                id: true,
                email: true,
                role: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return c.json({ message: "User updated successfully", result: updatedUser, success: true });
    });