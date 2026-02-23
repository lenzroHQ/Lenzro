"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Better for Next.js App Router
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import WorkspaceMenu from "@/components/ui/workspace-menu";
import SidePopover from "./sidepopover";
import {
  CircleCheckBig,
  Presentation,
  SearchIcon,
  LayoutDashboard,
  ChevronDown as ChevronIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const ClientNavbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState({ displayName: "", photoURL: "" });
  const [loading, setLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lenzrouser");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          displayName: parsed.displayName || "",
          photoURL: parsed.photoURL || "",
        });
      }
    } catch (e) {
      console.error("Failed to parse user", e);
    }
    setLoading(false);
  }, []);

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AM"; // Matching your profile snippet

  return (
    <TooltipProvider delayDuration={200}>
      <nav className="bg-black px-3 flex items-center justify-between border-b border-zinc-800 h-11 gap-2 select-none">
        {/* LEFT SECTION: Workspace & Switcher */}
        <div className="flex items-center gap-2">
          <WorkspaceMenu />
          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />{" "}
          {/* Subtle Divider */}
          {pathname === "/client/blackboard" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/client"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors"
                >
                  <LayoutDashboard size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-zinc-800 text-white border-zinc-700 text-[11px] ml-2 px-2 py-1"
              >
                Switch to Workspace
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/client/blackboard"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors"
                >
                  <Presentation size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-zinc-800 text-white border-zinc-700 text-[11px] ml-2 px-2 py-1"
              >
                Switch to Blackboard
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* RIGHT SECTION: Global Actions & User */}
        <div className="flex items-center gap-1">
          {/* Create Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors">
                <CircleCheckBig size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-zinc-800 text-white border-zinc-700 text-[11px] px-2 mt-2 py-1"
            >
              Create
            </TooltipContent>
          </Tooltip>

          {/* Search Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors">
                <SearchIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-zinc-800 text-white border-zinc-700 text-[11px] px-2 mt-2 py-1"
            >
              Search
            </TooltipContent>
          </Tooltip>

          <div className="h-4 w-[1px] bg-zinc-800 mx-2" />

          {/* User Avatar Popover */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center pl-1 pr-2 py-0.5 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer gap-2 group">
                <div className="relative">
                  {/* Avatar Initials */}
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 text-white text-[10px] font-bold select-none">
                    {initials}
                  </div>
                  {/* Online Indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#191919] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <ChevronIcon
                  size={12}
                  className={`text-zinc-500 transition-transform duration-200 ${popoverOpen ? "rotate-180" : ""}`}
                />
              </div>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="end"
              sideOffset={8}
              className="p-0 border border-zinc-800 bg-[#1A1A1A] text-white shadow-2xl rounded-lg overflow-hidden w-64"
            >
              <SidePopover />
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default ClientNavbar;
