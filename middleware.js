import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("lenzro-session")?.value;
  const { pathname } = req.nextUrl;

  const isAuth = pathname.startsWith("/auth");
  const isClient = pathname.startsWith("/client");
  const isRoot = pathname === "/";

  // Logged in → block auth & marketing
  if (session && (isRoot || isAuth)) {
    return NextResponse.redirect(new URL("/client", req.url));
  }

  // Logged out → block client
  if (!session && isClient) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/client/:path*"],
};