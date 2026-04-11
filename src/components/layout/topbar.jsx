"use client";

import React from "react";
import {
  Plus,
  ChevronDown,
  CheckCircle2,
  Send,
  ListTodo,
  Hash,
  Globe,
  Zap,
  FileText,
  FormInput,
  BarChart3,
  PenTool,
  Settings2,
  LayoutTemplate,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const TopBar = ({ setIsCollapsed }) => {
  return (
    <div className="sticky top-0 z-20 ">
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-sm text-zinc-100">Home</h1>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-1.5 text-zinc-400">


          <div className="h-4 w-[1px] bg-zinc-800 mx-0.5" />

          {/* Popover for the Split Add Button */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center bg-background cursor-pointer rounded-sm overflow-hidden transition-colors h-6 border">
                <button className="flex items-center justify-center px-1  h-full">
                  <Plus size={14} />
                </button>
                <div className="flex items-center justify-center px-1 h-full">
                  <ChevronDown size={12} />
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-72 p-1.5 shadow-2xl bg-background rounded-xl"
              side="bottom"
              align="center"
              sideOffset={8}
            >
              <div className="flex flex-col gap-0.5">
                <p className="px-3 py-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Create
                </p>

                {/* Section 1: Quick Actions */}
                <MenuItem
                  icon={<CheckCircle2 size={16} />}
                  label="Page"
                  shortcut="Alt T"
                />
                <MenuItem
                  icon={<Send size={16} />}
                  label="Sub page"
                  shortcut="Ctrl G"
                />

                <Separator className="my-1.5 bg-zinc-800" />

                {/* Section 2: Organizational */}
                <MenuItem
                  icon={<ListTodo size={16} />}
                  label="List"
                  sub="Track tasks, projects, people & more"
                />
                <MenuItem
                  icon={<Hash size={16} />}
                  label="Channel"
                  sub="Conversations on specific topics"
                />
                <MenuItem
                  icon={<Globe size={16} />}
                  label="Space"
                  sub="Organize work by team or department"
                />

                <Separator className="mt-3 bg-zinc-800" />

                <Separator className="my-1.5 bg-zinc-800" />

                {/* Section 4: Content */}
                <div className="grid grid-cols-2 gap-0.5">
                  <MenuItem
                    icon={<FileText size={16} className="text-sky-500" />}
                    label="Doc"
                  />
                  <MenuItem
                    icon={<FormInput size={16} className="text-purple-500" />}
                    label="Form"
                  />
                  <MenuItem
                    icon={<BarChart3 size={16} className="text-fuchsia-500" />}
                    label="Dashboard"
                  />
                  <MenuItem
                    icon={<PenTool size={16} className="text-amber-500" />}
                    label="Whiteboard"
                  />
                </div>

                <Separator className="my-1.5 bg-zinc-800" />

                <MenuItem
                  icon={<Settings2 size={16} />}
                  label="Customize your sidebar"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator className="bg-zinc-800" />
    </div>
  );
};

// Reusable menu item component
const MenuItem = ({ icon, label, shortcut, sub }) => (
  <div className="flex flex-col px-3 py-2 hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-zinc-500 group-hover:text-zinc-300">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {shortcut && (
        <span className="text-[10px] text-zinc-600 font-mono">{shortcut}</span>
      )}
    </div>
    {sub && <p className="text-[11px] text-zinc-500 mt-0.5 pl-7">{sub}</p>}
  </div>
);

export default TopBar;
