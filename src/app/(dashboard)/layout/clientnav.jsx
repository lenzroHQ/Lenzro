import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import WorkspaceMenu from "@/components/ui/workspace-menu";
import { Button } from "@/components/ui/button";
import SidePopover from "./sidepopover";
import { CircleCheckBig, SearchIcon } from "lucide-react";

function ChevronDown({ open, className = "" }) {
  return (
    <svg
      className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} ${className}`}
      fill="none"
      stroke="gray"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const ClientNavbar = () => {
  const [user, setUser] = useState({ displayName: "", photoURL: "" });
  const [loading, setLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          const stored = window.localStorage.getItem("lenzrouser");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser({
              displayName: parsed.displayName || "",
              photoURL: parsed.photoURL || "",
            });
          }
        } catch {}
        setLoading(false);
      }, 500); // shorter delay for snappier UX
    }
  }, []);

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  return (
    <div className="bg-black px-2 flex items-center justify-between border-b h-10 gap-2">
      {/* Workspace Switcher */}
      <WorkspaceMenu />
      <div className="flex items-center gap-2">
        <CircleCheckBig className={"size-4"}  />
        <SearchIcon className="size-4"/>
        {/* User Avatar Popover */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger className="p-0" asChild>
            <div className="relative flex items-center  hover:bg-zinc-800 transition-colors rounded-full pr-1 gap-2 shadow-sm cursor-pointer">
              <button className="relative flex gap-0 rounded-full items-center focus:outline-none bg-transparent p-0 m-0">
                {/* Avatar with initials */}
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs select-none">
                  {initials}
                </span>
                {/* Online status dot */}
                <span className="absolute bottom-1 left-5 w-2 h-2 rounded-full bg-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 border-2 border-white block" />
                </span>
                {/* Chevron */}
                <ChevronDown className="w-3 h-3" open={popoverOpen} />
              </button>
            </div>
          </PopoverTrigger>

          <PopoverContent className="mt-2 p-0 border-none bg-background text-foreground shadow-none">
            <SidePopover />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ClientNavbar;
