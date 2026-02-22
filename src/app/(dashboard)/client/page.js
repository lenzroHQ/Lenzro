import React from "react";
import { ChevronDown, Lock, Star, MoreHorizontal, Users2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GetStarted from "../pages/getstartedpage";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-full border-b py-2 border-zinc-800/50 bg-black/5">
      {/* Left side: Breadcrumb & Privacy */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-2  rounded hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <span className="text-lg">👋</span>
          <span className="text-[12px] font-medium text-zinc-200">
            Getting Started
          </span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-1">
        <span className="text-[12px] text-zinc-500 mr-2">Edited 1h ago</span>

        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 hover:bg-zinc-800/50 text-zinc-200 transition-colors">
          <Lock size={14} />
          <span className="text-[13px]">Share</span>
          <ChevronDown size={12} className="mt-0.5" />
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors">
              <Star size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-zinc-800 text-white border-zinc-700 text-[11px] px-2 py-1"
          >
            Add to Favorites
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-zinc-800 text-white border-zinc-700 text-[11px] px-2 py-1">
            Style, elements and widgets
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <div className="flex-1 overflow-y-auto py-5">
        <GetStarted />
      </div>
    </div>
  );
};

export default Page;
