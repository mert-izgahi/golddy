import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { ContextUser } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

const getSecretKey = () => new TextEncoder().encode(JWT_SECRET || "default_secret_key");

export async function generateToken(user: ContextUser): Promise<string> {
    const secret = getSecretKey()
    // Parse expiration time (e.g., "7d" -> 7 days)
    const expiresIn = parseExpiration(JWT_EXPIRES_IN)


    const jwt = await new SignJWT({ user })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
    return jwt;
}

function parseExpiration(exp: string): string {
    // If it's already a valid format for setExpirationTime, return it
    if (exp.match(/^\d+[smhd]$/)) {
        return exp
    }

    // Default to 7 days if parsing fails
    return '7d'
}

export async function verifyToken(token: string): Promise<ContextUser | null> {
    try {
        const secret = getSecretKey()
        const { payload } = await jwtVerify(token, secret);
        return (payload as JWTPayload & { user: ContextUser }).user || null;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}


export function extractToken(authHeader?: string | null, cookieToken?: string | null): string | null {
    // Check Authorization header first
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7)
    }

    // Fallback to cookie
    if (cookieToken) {
        return cookieToken
    }

    return null
}