"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DocsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block pr-6 border-r border-border/50">
      <div
        className="h-[calc(100vh-3.5rem)] overflow-y-auto hide-scrollbar py-6 pr-4"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
        }}
      >
        <nav className="flex flex-col space-y-4">
          {docs.map((section) => (
            <div key={section.title} className="flex flex-col space-y-2">
              <h4 className="font-semibold text-sm text-foreground">
                {section.title}
              </h4>

              {section.children && (
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {section.children.map((child) => {
                    const isActive = pathname === child.route;

                    return (
                      <Link
                        key={child.title}
                        href={child.route || "#"}
                        className={cn(
                          "group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm text-muted-foreground hover:underline hover:text-foreground",
                          isActive &&
                            "font-medium text-foreground hover:no-underline",
                        )}
                      >
                        {child.title}
                        {child.hasUpdate && (
                          <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                            New
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;
