"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutGrid,
  MoreHorizontal,
  Plus,
  ChevronDown,
  ChevronsRight,
  MessageSquare,
  FileText,
  PenTool,
  ClipboardList,
  AppWindow,
  Inbox,
  Users2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HomeSidebar from "./home-sidebar";
import LibrarySidebar from "./library-sidebar";
import InboxSidebar from "./inbox-sidebar";
import CalendarSidebar from "./calendar-sidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const { workspace } = useParams() ?? {};
  const base = workspace ? `/app/${workspace}` : "/client";

  // Collapse sidebar when navigating to blackboard
  useEffect(() => {
    if (pathname.includes("/blackboard")) {
      setIsCollapsed(true);
    }
  }, [pathname]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const mainTabs = [
    {
      label: "Home",
      icon: "/home-svg.svg",
      path: base,
      isCustomSvg: true,
    },
    {
      label: "Inbox",
      icon: "/inbox_svg.svg",
      path: `${base}/inbox`,
      isCustomSvg: true,
    },
    {
      label: "Library",
      icon: "/library_svg.svg",
      path: `${base}/library`,
      isCustomSvg: true,
    },
    {
      label: "Calendar",
      icon: "/calendar_svg.svg",
      path: `${base}/calendar`,
      isCustomSvg: true,
    },
    {
      label: "Docs",
      icon: "/docs_svg.svg",
      path: `${base}/files`,
      isCustomSvg: true,
    },
    { label: "More", icon: "/more_svg.svg", isMore: true, isCustomSvg: true },
  ];

  // Logic to determine which component to show in the secondary panel
  const renderSecondaryContent = () => {
    if (pathname === base) return <HomeSidebar />;
    if (pathname === `${base}/inbox`) return <InboxSidebar />;
    if (pathname === `${base}/library`) return <LibrarySidebar />;
    if (pathname === `${base}/calendar`) return <CalendarSidebar />;
    return null;
  };

  const SECONDARY_PATHS = [
    base,
    `${base}/inbox`,
    `${base}/library`,
    `${base}/calendar`,
  ];
  const currentHasSecondary = SECONDARY_PATHS.includes(pathname);

  const handleTabClick = (item) => {
    if (item.isMore) return;
    // Collapse for items with no secondary panel or explicitly marked noExpand
    const hasSecondary = SECONDARY_PATHS.includes(item.path);
    if (item.noExpand || !hasSecondary) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex">
        {/* --- ICON STRIP --- */}
        <motion.div
          layout
          className="flex flex-col justify-between items-center w-[58px] bg-black border border-zinc-800 rounded-lg py-4 z-20"
        >
          <div className="flex flex-col items-center w-full gap-4">
            {currentHasSecondary && (
              <button
                onClick={toggleSidebar}
                className="text-zinc-500 hover:text-white transition-transform"
              >
                <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }}>
                  <ChevronsRight size={14} />
                </motion.div>
              </button>
            )}

            <div className="flex flex-col gap-2 items-center">
              {mainTabs.map((item, idx) => {
                const isActive = pathname === item.path;

                const tabContent = (
                  <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-8 h-8 rounded-xl transition-all",
                        isActive
                          ? "btn-grad text-black"
                          : "text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white",
                      )}
                    >
                      {item.isCustomSvg ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={cn(
                            "w-5 h-5 transition-all",
                            isActive
                              ? "invert-0"
                              : "invert-[0.5] group-hover:invert-0",
                          )}
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-medium transition-colors",
                        isActive ? "text-white" : "text-zinc-500",
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                );

                if (item.isMore) {
                  return (
                    <Tooltip key={idx}>
                      <Popover>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>{tabContent}</PopoverTrigger>
                        </TooltipTrigger>
                        <PopoverContent
                          side="right"
                          className="w-72 p-4 bg-[#111] border-zinc-800 rounded-2xl  shadow-2xl"
                        >
                          {/* More items logic remains the same */}
                        </PopoverContent>
                      </Popover>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  );
                }

                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.path}
                        onClick={() => handleTabClick(item)}
                      >
                        {tabContent}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* --- SECONDARY CONTENT PANEL --- */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.aside
              initial={{ width: 0, opacity: 0, x: -20 }}
              animate={{ width: 280, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-black border border-zinc-800 rounded-md overflow-hidden flex flex-col ml-1"
            >
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderSecondaryContent()}
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

const ContentRow = ({ icon, label, active = false }) => (
  <div
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
      active
        ? "bg-zinc-800 text-white font-semibold"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
    )}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default Sidebar;
