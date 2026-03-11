/**
 * with-session.js — Server-side session helpers for API routes and
 * React Server Components.
 *
 * Usage in an API route:
 *
 *   import { requireSession } from "@/lib/with-session";
 *
 *   export const GET = requireSession(async (req, ctx, session) => {
 *     // session.uid and session.workspace are verified here
 *     return Response.json({ uid: session.uid });
 *   });
 *
 * Usage in a Server Component / layout:
 *
 *   import { getServerSession } from "@/lib/with-session";
 *
 *   const session = await getServerSession();
 *   if (!session) redirect("/auth");
 */

import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

// ─── Server Component helper ─────────────────────────────────────────────────

/**
 * Read and verify the session from the request cookie store.
 * Returns { uid, workspace } or null.
 */
export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// ─── API Route higher-order handler ─────────────────────────────────────────

/**
 * Wrap a Next.js Route Handler so it is only accessible to authenticated users.
 *
 * @param {(req: Request, ctx: any, session: { uid: string, workspace: string }) => Promise<Response>} handler
 * @returns Route handler that returns 401 JSON if the session is invalid.
 */
export function requireSession(handler) {
  return async (req, ctx) => {
    const session = await getServerSession();
    if (!session) {
      return Response.json(
        { error: "Unauthorized — valid session required." },
        { status: 401 },
      );
    }
    return handler(req, ctx, session);
  };
}

/**
 * Workspace-scoped variant.  Additionally verifies that the authenticated
 * user's workspace matches the `workspace` route segment, preventing one
 * user from accessing another user's data through the API.
 *
 * Expects the route context to contain `params.workspace`.
 *
 * @param {(req: Request, ctx: any, session: { uid: string, workspace: string }) => Promise<Response>} handler
 */
export function requireWorkspaceSession(handler) {
  return async (req, ctx) => {
    const session = await getServerSession();
    if (!session) {
      return Response.json(
        { error: "Unauthorized — valid session required." },
        { status: 401 },
      );
    }

    const routeWorkspace = ctx?.params?.workspace;
    if (routeWorkspace && routeWorkspace !== session.workspace) {
      return Response.json(
        { error: "Forbidden — workspace mismatch." },
        { status: 403 },
      );
    }

    return handler(req, ctx, session);
  };
}
