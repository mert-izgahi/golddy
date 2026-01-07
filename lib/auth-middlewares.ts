import { getCookie } from "hono/cookie";
import { ContextUser } from "@/lib/types";
import { extractToken, verifyToken } from "./jwt";
import { Context, Next } from "hono";
import { Role } from "./generated/prisma";

export async function authenticate(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization')
    const cookieToken = getCookie(c, 'token')
    const token = extractToken(authHeader, cookieToken);
    if (!token) {
        c.set("user", null);
        return c.json({ message: "Unauthorized", success: false, result: null, }, 401);
    }
    try {
        const user: ContextUser | null = await verifyToken(token);
        c.set("user", user);
        return next();
    } catch (error) {
        console.error("Auth Middleware: Token verification error", error);
        c.set("user", null);
        return c.json({ message: "Unauthorized", success: false, result: null, }, 401);
    }
}

export function authorize(roles: Role[]) {
    return async (c: Context, next: Next) => {
        const user = c.get("user") as ContextUser | null;

        if (!user || (roles.length > 0 && !roles.includes(user.role))) {
            return c.json({ message: "Forbidden", success: false, result: null, }, 403);
        }

        return next();
    };
}

export const getAuthUser = (c: Context): ContextUser | null => {
    const user = c.get("user") as ContextUser | null;
    return user;
}