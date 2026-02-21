import { NextResponse } from "next/server";

export async function POST(request) {
  const { user } = await request.json();
  if (!user || !user.uid) {
    return NextResponse.json({ error: "Missing user info" }, { status: 400 });
  }
  // Set a cookie for session (httpOnly for security)
  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        "Set-Cookie": `lenzro-session=${user.uid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      },
    },
  );
}

export async function DELETE() {
  // Remove the session cookie
  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        "Set-Cookie":
          "lenzro-session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax",
      },
    },
  );
}
