import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("lenzro-session");
  const { pathname } = req.nextUrl;

  // Block marketing and root for logged-in users
  if (session && (pathname === "/" || pathname.startsWith("/(marketing)"))) {
    return NextResponse.redirect(new URL("/client", req.url));
  }

  // Block /client for logged-out users
  if (!session && pathname.startsWith("/client")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Block /auth for logged-in users
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/client", req.url));
  }
}
