import {
  ArrowRightLeft,
  ArrowUpRight,
  ChevronRight,
  Copy,
  Link2,
  MoreHorizontal,
  PanelLeft,
  PencilLine,
  Plus,
  RefreshCcw,
  Star,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import MenuButton from "./menu-button";

const SidebarRow = ({
  icon,
  label,
  textColor,
  activeItem,
  setActiveItem,
  subpageLabel,
}) => {
  const isActive = activeItem === label;

  const lowercaseLabel = label.toLowerCase();
  return (
    <Link
      onClick={() => setActiveItem(label)}
      className={`group/row flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
        isActive
          ? `${textColor} bg-zinc-900/40`
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
      }`}
      href={`/client/${lowercaseLabel}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="relative flex items-center justify-center h-5 w-5 shrink-0">
          <div className="relative z-10 flex items-center justify-center transition-colors">
            <div className="group-hover/row:hidden flex items-center justify-center transition-all duration-200">
              {React.cloneElement(icon, {
                size: 16,
                className: isActive
                  ? `${textColor}`
                  : "text-zinc-500 group-hover:text-zinc-300",
              })}
            </div>
            <div className="hidden group-hover/row:flex items-center justify-center animate-in fade-in zoom-in-75 duration-200">
              <ChevronRight size={14} className="text-zinc-500" />
            </div>
          </div>
        </div>

        <span className="text-[13px] font-medium transition-all truncate">
          {label}
        </span>
      </div>

      <div className="flex items-center opacity-0 group-hover/row:opacity-100 transition-opacity">
        {/* PAGE ACTIONS POPOVER */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={10}
            className="bg-[#1A1A1A] text-white border-zinc-800 w-[240px] p-1 shadow-2xl rounded-lg overflow-hidden"
          >
            <div className="px-2 py-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Page
            </div>

            <div className="flex flex-col gap-0.5">
              <MenuButton icon={<Star size={14} />} label="Add to Favorites" />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton icon={<Link2 size={14} />} label="Copy link" />
              <MenuButton
                icon={<Copy size={14} />}
                label="Duplicate"
                shortcut="Ctrl+D"
              />
              <MenuButton
                icon={<PencilLine size={14} />}
                label="Rename"
                shortcut="Ctrl+Shift+R"
              />
              <MenuButton
                icon={<ArrowRightLeft size={14} />}
                label="Move to"
                shortcut="Ctrl+Shift+P"
              />
              <MenuButton icon={<Trash2 size={14} />} label="Move to Trash" />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton
                icon={<RefreshCcw size={14} />}
                label="Turn into wiki"
              />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton
                icon={<ArrowUpRight size={14} />}
                label="Open in new tab"
                shortcut="Ctrl+Shift+Enter"
              />
              <MenuButton
                icon={<PanelLeft size={14} />}
                label="Open in side peek"
                shortcut="Alt+Click"
              />
            </div>

            {/* METADATA FOOTER */}
            <div className="mt-2 px-3 py-2 border-t border-zinc-800 bg-zinc-900/30 text-[11px] text-zinc-500">
              Last edited by Abdiaziz Mohamed
              <br />
              Today at 2:42 PM
            </div>
          </PopoverContent>
        </Popover>

        {/* ADD PAGE BUTTON */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Plus size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-zinc-800 text-white ml-2 border-zinc-700 text-[10px] px-2 py-1"
            >
              Add a page inside
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Link>
  );
};

export default SidebarRow;
