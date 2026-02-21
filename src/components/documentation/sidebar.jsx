import { docs } from "@/lib/constants";
import { cn } from "@/lib/utils"; // Assuming you have a cn helper, otherwise use standard template strings

const Sidebar = () => {
  // Example active state - you'd usually get this from your router (e.g., usePathname in Next.js)
  const activePath = "Components";

  return (
    <aside
      style={{ height: "calc(100vh - 100px)" }}
      className="w-64 text-white hide-scrollbar flex flex-col px-6 py-10 overflow-y-auto border-r border-zinc-800"
    >
      <nav className="space-y-8">
        {docs.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            {/* Section Header */}
            <h4 className="px-2 text-sm tracking-tight  text-gray-300">
              {section.title}
            </h4>

            {section.children && (
              <div className="grid grid-flow-row auto-rows-max text-xs">
                {section.children.map((child) => {
                  const isActive = activePath === child.title;

                  return (
                    <a
                      key={child.title}
                      href={child.href || "#"}
                      className={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-colors hover:bg-zinc-800/50 hover:text-white",
                        isActive
                          ? "bg-zinc-800 font-medium text-white"
                          : "text-zinc-400",
                      )}
                    >
                      {child.title}

                      {/* Optional Blue Dot (for 'RTL' or 'Changelog' style) */}
                      {child.hasUpdate && (
                        <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
