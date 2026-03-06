import ClientNavbar from "@/components/layout/clientnav";
import LenzroAi from "@/components/layout/lenzroai";
import WorkspaceSidebar from "@/components/layout/sidebar";

/**
 * Workspace shell layout.
 * Wraps every /app/[workspace]/* page with the navbar, sidebar, and AI button.
 * This is a Server Component — keep it that way.
 * Child pages decide whether they are server or client components individually.
 */
export default function WorkspaceLayout({ children }) {
  return (
    <>
      <div className="bg-background min-h-screen flex flex-col">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-40">
          <ClientNavbar />
        </div>

        {/* Sidebar + page content */}
        <div className="flex flex-row flex-1 gap-1 p-1 min-h-0">
          <WorkspaceSidebar />
          <div className="flex-1 hide-scrollbar min-h-0 rounded-md border bg-background overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Floating AI assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <LenzroAi />
      </div>
    </>
  );
}
