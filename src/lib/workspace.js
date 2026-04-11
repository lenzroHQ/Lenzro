/**
 * Workspace utility functions.
 * In production these would query Firestore/your backend.
 * For now they operate on localStorage so the system works
 * without a database while you wire up the backend.
 */

/** Turn any string into a URL-safe workspace slug */
export function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 48);
}

/** Derive a workspace slug from a Firebase user object */
export function workspaceSlugFromUser(user) {
  if (!user) return null;
  // slugify can return "" if the string is all special/non-ascii chars,
  // so fall through to the next option when the result is empty.
  if (user.displayName) {
    const slug = slugify(user.displayName);
    if (slug) return slug;
  }
  if (user.email) {
    const slug = slugify(user.email.split("@")[0]);
    if (slug) return slug;
  }
  // Final fallback: first 16 chars of the uid (always alphanumeric)
  return user.uid.substring(0, 16);
}

// ─── localStorage helpers (client-only) ─────────────────────────────────────

export function storeWorkspace(slug) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lenzro-workspace", slug);
}

export function getStoredWorkspace() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("lenzro-workspace");
}

export function storeUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lenzrouser", JSON.stringify(user));
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("lenzrouser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("lenzrouser");
  localStorage.removeItem("lenzro-workspace");
}
