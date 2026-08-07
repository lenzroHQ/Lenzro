import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_FIELDS = ["name", "email"];
const OPTIONAL_FIELDS = [
  ["website", "Website"],
  ["budget", "Budget"],
  ["timeline", "Timeline"],
  ["message", "Message"],
  ["goal", "What they're looking to achieve"],
  ["reason", "What made them reach out"],
];

export async function POST(request) {
  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email } = body ?? {};

  for (const field of REQUIRED_FIELDS) {
    if (!body?.[field] || typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const extra = {};
  for (const [key, label] of OPTIONAL_FIELDS) {
    if (typeof body[key] === "string" && body[key].trim()) {
      extra[label] = body[key].trim();
    }
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New project inquiry from ${name}`,
        from_name: name,
        email,
        ...extra,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
