"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import HomeSidebar from "./home-sidebar";


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const mainTabs = [
    {
      label: "Home",
      icon: "/home-svg.svg",
      path: "/client",
      isCustomSvg: true,
    },
    {
      label: "Inbox",
      icon: "/inbox_svg.svg",
      path: "/client/inbox",
      isCustomSvg: true,
    },
    {
      label: "Library",
      icon: "/library_svg.svg",
      path: "/client/library",
      isCustomSvg: true,
    },
    {
      label: "Calendar",
      icon: "/calendar_svg.svg",
      noExpand: true,
      path: "/client/calendar",
      isCustomSvg: true,
    },
    {
      label: "Docs",
      icon: "/docs_svg.svg",
      path: "/client/docs",
      isCustomSvg: true,
    },
    { label: "More", icon: "/more_svg.svg", isMore: true, isCustomSvg: true },
  ];

  // Logic to determine which component to show in the secondary panel
  const renderSecondaryContent = () => {
    switch (pathname) {
      case "/client":
        return <HomeSidebar />;
      // case "/client/inbox":
      //   return <InboxSidebar />;
      // case "/client/library":
      //   return <LibrarySidebar />;
      // default:
      //   return <HomeSidebar />;
    }
  };

  const handleTabClick = (item) => {
    if (item.isMore) return;
    setIsCollapsed(item.noExpand ? true : false);
  };

  return (
    <div className="flex h-[93vh]">
      {/* --- ICON STRIP --- */}
      <motion.div
        layout
        className="flex flex-col justify-between items-center w-[58px] bg-black border border-zinc-800 rounded-lg py-4 z-20"
      >
        <div className="flex flex-col items-center w-full gap-4">
          <button
            onClick={toggleSidebar}
            className="text-zinc-500 hover:text-white transition-transform"
          >
            <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }}>
              <ChevronsRight size={14} />
            </motion.div>
          </button>

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
                  <Popover key={idx}>
                    <PopoverTrigger asChild>{tabContent}</PopoverTrigger>
                    <PopoverContent
                      side="right"
                      align="end"
                      className="w-72 p-4 bg-[#111] border-zinc-800 rounded-2xl ml-2 shadow-2xl"
                    >
                      {/* More items logic remains the same */}
                    </PopoverContent>
                  </Popover>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.path}
                  onClick={() => handleTabClick(item)}
                >
                  {tabContent}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* --- SECONDARY CONTENT PANEL --- */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.aside
            key={pathname} // Key helps Framer Motion track changes for entry/exit animations
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: 280, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-black border border-zinc-800 rounded-md overflow-hidden flex flex-col ml-1"
          >
            {renderSecondaryContent()}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
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
