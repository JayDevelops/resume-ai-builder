import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthPage = request.nextUrl.pathname.startsWith("/signIn");

  // If the user is authenticated and trying to access auth pages, redirect to home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Add any protected routes here
  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If accessing a protected route without authentication, redirect to sign in
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to auth routes
    "/signIn",
    "/signOut",
    // Apply to protected routes
    "/dashboard/:path*",
    "/profile/:path*",
    // Exclude next internal routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
