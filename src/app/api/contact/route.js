import { NextResponse } from "next/server";
import { Resend } from "resend";

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

const CONTACT_FROM = "Lenzro <onboarding@resend.dev>";
const CONTACT_TO = "team@lenzro.com";

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
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

  const rows = [["Name", name.trim()], ["Email", email.trim()], ...Object.entries(extra)];
  const html = `
    <h2>New project inquiry from ${escapeHtml(name.trim())}</h2>
    <table cellpadding="6" cellspacing="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:600;vertical-align:top;">${escapeHtml(
              label
            )}</td><td style="white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email.trim(),
      subject: `New project inquiry from ${name.trim()}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
