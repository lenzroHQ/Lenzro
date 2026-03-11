import { NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/session";

/**
 * Production-grade route protection.
 *
 * Route rules
 * ───────────
 *  /app/*             → must have a VALID signed session  → else /auth?next=…
 *  /onboarding/*      → must have a VALID signed session  → else /auth?next=…
 *  /auth              → if session valid → /app/{workspace}
 *  ALL marketing/*    → if session valid → /app/{workspace}
 *    (/, /pricing, /solutions, /docs/*)
 *
 * After successful verification the uid and workspace are forwarded in
 * request headers (x-session-uid, x-session-workspace) so server
 * components can read them without re-parsing the cookie.
 */
export async function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  const rawToken = req.cookies.get(COOKIE_NAME)?.value ?? null;

  // Cryptographically verify the token — returns null if missing, tampered,
  // or expired.
  const session = rawToken ? await verifySessionToken(rawToken) : null;

  const isAppRoute = pathname.startsWith("/app");
  const isOnboarding = pathname.startsWith("/onboarding");
  const isAuthRoute = pathname === "/auth";

  // Every page in the (marketing) route group
  const isMarketingRoute =
    pathname === "/" ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/docs");

  // ── 1. Protected routes: require a valid session ──────────────────────────
  if ((isAppRoute || isOnboarding) && !session) {
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── 2. Marketing + auth pages: kick authenticated users to their workspace ─
  // Once logged in, the user should never see marketing pages or the login
  // page again — pressing Back, typing the URL, or navigating there all
  // result in an immediate redirect straight into their workspace.
  if ((isMarketingRoute || isAuthRoute) && session) {
    url.pathname = `/app/${session.workspace}`;
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  // ── 3. Forward verified identity to server components via headers ─────────
  const response = NextResponse.next();
  if (session) {
    response.headers.set("x-session-uid", session.uid);
    response.headers.set("x-session-workspace", session.workspace);
  }
  return response;
}

export const config = {
  // Include all marketing routes + auth + app + onboarding.
  // api/routes/session is intentionally excluded so login can always set cookies.
  matcher: [
    "/",
    "/pricing/:path*",
    "/solutions/:path*",
    "/docs/:path*",
    "/auth",
    "/app/:path*",
    "/onboarding/:path*",
  ],
};
