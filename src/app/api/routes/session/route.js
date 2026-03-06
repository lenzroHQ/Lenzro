import { NextResponse } from "next/server";

const SESSION_COOKIE = "lenzro-session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * POST /api/routes/session
 * Body: { user: { uid, email, displayName, photoURL } }
 * Sets a server-side httpOnly session cookie.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { user } = body;

  if (!user?.uid) {
    return NextResponse.json({ error: "Missing user.uid" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, user.uid, COOKIE_OPTIONS);
  return res;
}

/**
 * DELETE /api/routes/session
 * Clears the session cookie (sign-out).
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return res;
}
