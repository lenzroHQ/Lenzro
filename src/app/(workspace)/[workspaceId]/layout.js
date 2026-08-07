import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/with-session";
import ClientNavbar from "@/components/layout/clientnav";
import FloatingAi from "@/components/layout/floating-ai";
import WorkspaceSidebar from "@/components/layout/sidebar";

/**
 * Workspace shell layout.
 *
 * Combines two responsibilities:
 *  1. Workspace isolation — verifies the route's workspace slug matches the
 *     signed session token.  Any authenticated user navigating to another
 *     user's workspace is silently redirected to their own workspace.
 *  2. UI shell — renders the sticky navbar, sidebar, and AI assistant.
 *
 * This is a Server Component — keep it that way.
 */
export default async function WorkspaceLayout({ children, params }) {
  const { workspaceId: routeWorkspace } = await params;
  const session = await getServerSession();

  // Defensive guard (parent app layout already covers this)
  if (!session) {
    redirect("/auth");
  }

  // Workspace isolation: silently redirect to the user's own workspace
  if (session.workspace && routeWorkspace !== session.workspace) {
    redirect(`/${session.workspace}`);
  }

  return (
    <>
      <div className="bg-background h-screen overflow-hidden flex flex-col">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-40">
          <ClientNavbar />
        </div>

        {/* Sidebar + page content */}
        <div className="flex flex-row flex-1 gap-1 p-1 min-h-0">
          <WorkspaceSidebar />
          <div className="flex-1 scrollbar-pill custom-scrollbar min-h-0 rounded-md border bg-background overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Floating AI assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <FloatingAi />
      </div>
    </>
  );
}
