"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Calendar,
  Sparkles,
  Users2,
  LayoutGrid,
  MoreHorizontal,
  Inbox,
  Library,
  FileText,
  Plus,
  ChevronDown,
  ChevronsRight,
  FolderClosed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const mainTabs = [
    { label: "Home", icon: <Home size={18} />, isBrand: true },
    { label: "Inbox", icon: <Inbox size={18} /> },
    { label: "Library", icon: <Library size={18} /> },
    { label: "Calendar", icon: <Calendar size={18} />, noExpand: true },
    { label: "Docs", icon: <FolderClosed size={18} /> },
    { label: "More", icon: <MoreHorizontal size={18} /> },
  ];

  const handleTabClick = (item) => {
    // If it's the calendar, we stay collapsed. Otherwise, we expand.
    if (item.noExpand) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  return (
    <div className="flex h-[93vh]">
      {/* --- ICON STRIP (The Main Sidebar) --- */}
      <motion.div
        layout
        className="flex flex-col justify-between items-center w-[58px] bg-black border border-zinc-800 rounded-lg py-6 z-20"
      >
        <div className="flex flex-col items-center w-full gap-4">
          <button
            onClick={toggleSidebar}
            className="text-zinc-500 hover:text-white transition-transform"
          >
            <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }}>
              <ChevronsRight size={18} />
            </motion.div>
          </button>

          <div className="flex flex-col items-center">
            {mainTabs.map((item, idx) => (
              <Link
                key={idx}
                href={`/client/${item.label.toLowerCase()}`}
                onClick={() => handleTabClick(item)}
                className="flex flex-col items-center gap-1 py-2 group cursor-pointer"
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center w-9 h-9 rounded-xl transition-all",
                    item.isBrand
                      ? "bg-white text-black"
                      : "text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white",
                  )}
                >
                  {item.isBrand && (
                    <div className="absolute inset-0 -z-10 bg-blue-500/50 blur-xl rounded-full scale-150" />
                  )}
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium text-zinc-500">
                  {item.label}
                </span>
              </Link>
            ))}
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
            <div className="p-4 w-[280px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Home</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-12 bg-zinc-900 border border-zinc-800"
                >
                  <Plus size={14} className="mr-1" /> <ChevronDown size={12} />
                </Button>
              </div>
              <div className="space-y-1">
                <ContentRow icon={<Inbox size={16} />} label="Inbox" />
                <ContentRow icon={<Users2 size={16} />} label="Replies" />
                <ContentRow
                  icon={<Sparkles size={16} />}
                  label="AI Tasks"
                  active
                />
              </div>
              <Separator className="my-6 bg-zinc-800" />
              <div className="px-2">
                <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
                  Favorites
                </h3>
                <p className="text-xs text-zinc-600 italic">
                  Click star to add favorites...
                </p>
              </div>
            </div>
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
        ? "bg-zinc-800 text-white"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
    )}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;
