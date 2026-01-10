import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractToken, verifyToken } from "@/lib/jwt";
import { getAuthUser } from "./lib/actions";

const AUTH_PREFIX = "/auth";
const SIGN_IN_PATH = "/auth/sign-in";
const PUBLIC_PATHS = ["/api/health", "/api/auth/sign-in", "/api/auth/sign-out"];

function redirectToSignIn(request: NextRequest) {
  const response = NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  response.cookies.delete("token");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ 1. Allow all public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ✅ 2. Extract token (from header or cookie)
  const token = extractToken(
    request.headers.get("Authorization"),
    request.cookies.get("token")?.value ?? null
  );

  // 🧩 3. Handle missing token for protected routes
  if (!token && !pathname.startsWith(AUTH_PREFIX)) {
    console.log(`Middleware: Missing token for ${pathname}`);
    return redirectToSignIn(request);
  }

  let user = null;
  if (token) {
    try {
      user = await getAuthUser();
    } catch (error) {
      console.error("Middleware: Token verification failed", error);
      return redirectToSignIn(request);
    }
  }

  // 🧭 4. Auth routes logic
  if (pathname.startsWith(AUTH_PREFIX)) {
    // User already logged in → redirect home
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // No or invalid token → allow access to sign-in/signup
    return NextResponse.next();
  }

  // 🔐 5. Protected routes logic
  if (!user) {
    // No valid token
    return redirectToSignIn(request);
  }

  // ✅ 6. Valid token: attach user info to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", user.id);
  requestHeaders.set("x-user-email", user.email ?? "");
  requestHeaders.set("x-user-role", user.role ?? "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// ✅ 7. Ignore Next.js internal/static routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
