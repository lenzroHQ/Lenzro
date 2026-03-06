import { NextResponse } from "next/server";

/**
 * Route protection rules:
 *
 * /app/*        → requires lenzro-session cookie → else redirect to /auth
 * /onboarding/* → requires lenzro-session cookie → else redirect to /auth
 * /auth         → if already has session → redirect to /app (skip re-login)
 *
 * Marketing routes (/, /pricing, /solutions, /docs/*) are always public.
 */
export function middleware(req) {
  const url = req.nextUrl.clone();
  const session = req.cookies.get("lenzro-session");

  const { pathname } = url;

  const isAppRoute = pathname.startsWith("/app");
  const isOnboarding = pathname.startsWith("/onboarding");
  const isAuthRoute = pathname === "/auth";

  // ── Protected app & onboarding routes ────────────────────────────────────
  if ((isAppRoute || isOnboarding) && !session) {
    url.pathname = "/auth";
    // Preserve the original destination so we can redirect back after login
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── Auth page: skip for already-authenticated users ───────────────────────
  if (isAuthRoute && session) {
    url.pathname = "/app";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/onboarding/:path*", "/auth"],
};
