/**
 * session.js — Signed session token utilities.
 *
 * Uses Web Crypto (HMAC-SHA256), which works in both:
 *   • Edge runtime  (Next.js Middleware)
 *   • Node.js runtime (API routes, Server Components)
 *
 * Token format: base64url(payload) + "." + base64url(hmac-signature)
 * Payload:      { uid: string, workspace: string, iat: number }
 *
 * The secret is read from the SESSION_SECRET env-var.  Set it to a long
 * random string (e.g. `openssl rand -hex 32`) in your .env.local file.
 */

export const COOKIE_NAME = "lenzro-session";
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Base64url helpers (no Buffer; works in Edge) ───────────────────────────

function toBase64Url(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromBase64Url(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=");
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// ─── HMAC key ────────────────────────────────────────────────────────────────

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret === "CHANGE_ME") {
    // Warn loudly in development; break in production.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SESSION_SECRET env-var is not set. " +
          "Generate one with: openssl rand -hex 32",
      );
    }
    console.warn(
      "[session] SESSION_SECRET not set — using insecure dev fallback. " +
        "Add SESSION_SECRET to .env.local before going to production.",
    );
    return "dev-fallback-secret-CHANGE-ME-in-production";
  }
  return secret;
}

async function getHmacKey() {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Mint a cryptographically-signed session token.
 * @param {string} uid          Firebase user uid
 * @param {string} workspace    The user's workspace slug
 * @returns {Promise<string>}   Opaque token string
 */
export async function createSessionToken(uid, workspace) {
  const enc = new TextEncoder();
  const payload = JSON.stringify({ uid, workspace, iat: Date.now() });
  const payloadB64 = toBase64Url(enc.encode(payload));
  const key = await getHmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

/**
 * Verify a session token and return its payload, or null if invalid / expired.
 * @param {string} token
 * @returns {Promise<{ uid: string, workspace: string } | null>}
 */
export async function verifySessionToken(token) {
  try {
    const dot = token.lastIndexOf(".");
    if (dot < 0) return null;

    const payloadB64 = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);

    const enc = new TextEncoder();
    const key = await getHmacKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64),
      enc.encode(payloadB64),
    );

    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payloadB64)),
    );

    // Reject expired tokens
    if (Date.now() - payload.iat > TOKEN_MAX_AGE_MS) return null;

    return { uid: payload.uid, workspace: payload.workspace };
  } catch {
    return null;
  }
}

/** Cookie options — consistent between API route (set) and middleware (read). */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
};
