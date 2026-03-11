"use client";

/**
 * AuthGuard — Client-side authentication gate.
 *
 * Wraps pages inside /app that need client-side Firebase auth state.
 * The middleware + server layout provide the first (server) protection layer;
 * this component provides the second (client) layer to prevent flashes of
 * unauthenticated UI while onAuthStateChanged resolves.
 *
 * Usage:
 *   Wrap your app layout children with <AuthGuard>:
 *
 *     export default function DashboardLayout({ children }) {
 *       return <AuthGuard>{children}</AuthGuard>;
 *     }
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-provider";

export function AuthGuard({ children }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Wait until Firebase has resolved auth state
    if (loading) return;

    // If Firebase says the user is not authenticated, hard-redirect to login.
    // Use window.location.replace so the browser history entry is replaced
    // (prevents navigating back to an authenticated-only page without a session).
    if (!user) {
      window.location.replace("/auth");
    }
  }, [user, loading, router]);

  // While Firebase is resolving, show a minimal full-screen loader.
  // This prevents any flash of the app UI before we know the auth state.
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-black">
        <div className="w-5 h-5 rounded-full border-2 border-zinc-600 border-t-white animate-spin" />
        <p className="text-xs text-zinc-500">Verifying session…</p>
      </div>
    );
  }

  return <>{children}</>;
}
