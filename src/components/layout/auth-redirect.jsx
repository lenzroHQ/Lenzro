"use client";

/**
 * AuthRedirect — Recovers sessions where Firebase auth is still valid
 * but the httpOnly session cookie has expired or was never set.
 *
 * Renders nothing. Placed in the marketing layout so any authenticated
 * user who lands on /, /pricing, /docs, etc. is silently re-cookied and
 * forwarded to their workspace — mirroring what the middleware does when
 * the cookie is present.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-provider";
import {
  workspaceSlugFromUser,
  storeUser,
  storeWorkspace,
} from "@/lib/workspace";

export default function AuthRedirect() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;

    // Firebase says the user is signed in but the middleware cookie is gone
    // (expired, cleared, or was never written). Re-issue it so subsequent
    // server-side checks pass, then navigate to the workspace.
    const workspace = workspaceSlugFromUser(user);
    const sessionUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    fetch("/api/routes/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: sessionUser, workspace }),
    })
      .then((res) => {
        if (res.ok) {
          storeUser(sessionUser);
          storeWorkspace(workspace);
          router.replace(`/app/${workspace}`);
        }
      })
      .catch(console.error);
  }, [user, loading, router]);

  return null;
}
