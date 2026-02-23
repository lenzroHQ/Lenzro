import { NextResponse } from "next/server";

const COOKIE_NAME = "lenzro-session";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function POST(request) {
  const { user } = await request.json();

  if (!user?.uid) {
    return NextResponse.json({ error: "Missing user info" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, user.uid, COOKIE_OPTIONS);

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });

  return res;
}
