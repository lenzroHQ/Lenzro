"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";
import { docs } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Shared nav tree used in both desktop sidebar and mobile sheet
const SidebarNav = ({ pathname, onLinkClick }) => (
  <nav className="flex flex-col border-r space-y-4">
    {docs.map((section) => (
      <div key={section.title} className="flex flex-col space-y-2">
        <h4 className="text-sm text-foreground">
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
                  onClick={onLinkClick}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-xs text-muted-foreground hover:underline hover:text-foreground",
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
);

const DocsSidebar = () => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Find the current section + page title for the mobile breadcrumb
  const currentPage = docs
    .flatMap((s) => s.children ?? [])
    .find((c) => c.route === pathname);

  return (
    <>
      {/* ── Desktop sidebar (md+) ── */}
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-10vh)] w-full shrink-0 md:sticky md:block pr-6">
        <div
          className="h-[calc(100vh-3.5rem)] overflow-y-auto hide-scrollbar py-6 pr-4"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
          }}
        >
          <SidebarNav pathname={pathname} />
        </div>
      </aside>

      {/* ── Mobile nav bar (< md) ── */}
      <div className="sticky top-14 z-30 flex md:hidden items-center gap-2 border-b border-border/50 bg-background/95 backdrop-blur px-4 py-2">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open docs navigation"
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </SheetTrigger>
          {currentPage && (
            <span className="text-sm text-muted-foreground truncate">
              {currentPage.title}
            </span>
          )}
          <SheetContent side="left" className="w-72 pt-10">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-base">Documentation</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(100vh-8rem)] hide-scrollbar pr-2">
              <SidebarNav
                pathname={pathname}
                onLinkClick={() => setSheetOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DocsSidebar;
