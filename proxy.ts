import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractToken, verifyToken } from "@/lib/jwt";

const AUTH_PREFIX = "/auth";
const SIGN_IN_PATH = "/auth/sign-in";
const PUBLIC_PATHS = ["/api/health", "/api/auth/sign-in", "/api/auth/sign-out"]; // Add sign-out

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = extractToken(
    request.headers.get("Authorization"),
    request.cookies.get("token")?.value || null
  );
  
  // If no token and accessing protected page → redirect to sign-in
  if (!token && !pathname.startsWith(AUTH_PREFIX)) {
    console.log(`Middleware: Missing token for ${pathname}`);
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  }

  // If accessing /auth with valid token → redirect home
  if (pathname.startsWith(AUTH_PREFIX) && token) {
    try {
      const user = await verifyToken(token);
      if (user) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      // Token invalid, allow access to auth pages
    }
  }

  // Verify token for protected routes
  if (token && !pathname.startsWith(AUTH_PREFIX)) {
    try {
      const user = await verifyToken(token);

      if (!user) {
        // Invalid or expired token - clear cookie and redirect
        const response = NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
        response.cookies.delete("token");
        return response;
      }

      // ✅ Valid token: attach user info to headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", user.id);
      requestHeaders.set("x-user-email", user.email ?? "");
      requestHeaders.set("x-user-role", user.role ?? "");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Middleware: Token verification error", error);
      const response = NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};