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
  if (user.displayName) return slugify(user.displayName);
  if (user.email) return slugify(user.email.split("@")[0]);
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
