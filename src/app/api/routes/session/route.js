import { NextResponse } from "next/server";
import {
  createSessionToken,
  COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/session";

/**
 * POST /api/routes/session
 * Body: { user: { uid, email, displayName, photoURL }, workspace: string }
 *
 * Creates a cryptographically-signed HMAC token containing the uid and
 * workspace slug, then sets it as an httpOnly cookie.  The raw uid is NEVER
 * stored directly — the cookie is tamper-proof.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { user, workspace } = body;

  if (!user?.uid) {
    return NextResponse.json({ error: "Missing user.uid" }, { status: 400 });
  }
  if (!workspace) {
    return NextResponse.json(
      { error: "Missing workspace slug" },
      { status: 400 },
    );
  }

  const token = await createSessionToken(user.uid, workspace);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return res;
}

/**
 * DELETE /api/routes/session
 * Clears the session cookie (sign-out).
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
  return res;
}
