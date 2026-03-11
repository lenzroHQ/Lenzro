import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/with-session";
import { AuthGuard } from "@/components/layout/auth-guard";

/**
 * /app layout — dual-layer auth guard.
 *
 * Layer 1 (this file, server):
 *   Reads and cryptographically verifies the HMAC-signed session cookie.
 *   Any unauthenticated or tampered request is redirected to /auth before
 *   React even renders.  No client-side flash is possible.
 *
 * Layer 2 (AuthGuard, client):
 *   Subscribes to Firebase onAuthStateChanged.  If the Firebase token has
 *   expired or the user was forcibly signed out on another device, the
 *   client guard performs a hard-redirect to /auth.
 */
export default async function AppLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  // Pass server-verified session to children via AuthGuard (client layer)
  return <AuthGuard>{children}</AuthGuard>;
}
