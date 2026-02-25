import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const cookie = req.cookies.get("lenzrouser");

  if (cookie && url.pathname === "/") {
    url.pathname = "/client";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply to these routes
export const config = {
  matcher: ["/", "/client", "/loading", "/auth"],
};
