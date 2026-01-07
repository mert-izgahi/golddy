import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractToken, verifyToken } from "@/lib/jwt";

const AUTH_PREFIX = "/auth";
const SIGN_IN_PATH = "/auth/sign-in";
const PUBLIC_PATHS = ["/api/health", "/api/auth/sign-in"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = extractToken(
    request.headers.get("Authorization"),
    request.cookies.get("token")?.value || null
  );
  console.log(`Provided token: ${token}`);
  
  // Allow public or unauthenticated routes
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow access to /auth pages if NOT authenticated
  if (pathname.startsWith(AUTH_PREFIX) && !token) {
    return NextResponse.next();
  }

  // If no token → redirect to sign-in
  if (!token) {
    console.log(`Middleware: Missing token for ${pathname}`);
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  }

  // Verify token
  try {
    const user = await verifyToken(token);

    if (!user) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
      response.cookies.delete("token");
      return response;
    }
    
    // If accessing /auth while already authenticated → redirect home
    if (pathname.startsWith(AUTH_PREFIX)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Valid token: attach user info to headers for API/backend
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email ?? "");
    requestHeaders.set("x-user-role", user.role ?? "");

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.error("Middleware: Token verification error", error);
    const response = NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",],
};
