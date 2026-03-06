import { ChevronDown, Lock, Star, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GetStarted from "@/components/pages/getstartedpage";

const TopBar = () => (
  <div className="flex items-center justify-between w-full border-b py-2 border-zinc-800/50 bg-black/5">
    <div className="flex items-center gap-2 px-2 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors">
      <span className="text-lg">👋</span>
      <span className="text-[12px] font-medium text-zinc-200">
        Getting Started
      </span>
    </div>

    <div className="flex items-center gap-1">
      <span className="text-[12px] text-zinc-500 mr-2">Edited 1h ago</span>

      <button className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 hover:bg-zinc-800/50 text-zinc-200 transition-colors">
        <Lock size={14} />
        <span className="text-[13px]">Share</span>
        <ChevronDown size={12} className="mt-0.5" />
      </button>

      <TooltipProvider>
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
          <TooltipContent
            side="bottom"
            className="bg-zinc-800 text-white border-zinc-700 text-[11px] px-2 py-1"
          >
            Options
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

export default function WorkspaceHomePage() {
  return (
    <div className="flex flex-col max-h-[90vh]">
      <TopBar />
      <div className="flex-1 overflow-y-auto pt-5">
        <GetStarted />
      </div>
    </div>
  );
}
