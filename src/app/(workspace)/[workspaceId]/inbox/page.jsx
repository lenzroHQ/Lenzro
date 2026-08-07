"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Inbox as InboxIcon,
  Zap,
  Clock,
  CheckCircle2,
  Search,
  ListFilter,
  Plus,
  ChevronDown,
  AtSign,
  UserCircle,
  Mail,
  Bell,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const FILTER_LABELS = {
  inbox: "Inbox",
  starred: "Starred",
  snoozed: "Snoozed",
  sent: "Sent",
  draft: "Drafts",
  purchases: "Purchases",
  important: "Important",
  scheduled: "Scheduled",
  all: "All Mail",
  spam: "Spam",
  bin: "Bin",
};

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState("Primary");
  const searchParams = useSearchParams();
  const activeFilter = searchParams?.get("filter") ?? "inbox";
  const filterLabel = FILTER_LABELS[activeFilter] ?? "Inbox";

  const tabs = [
    { name: "Primary", icon: <InboxIcon size={16} /> },
    { name: "Other", icon: <Zap size={16} /> },
    { name: "Later", icon: <Clock size={16} /> },
    { name: "Cleared", icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full text-zinc-400">
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 h-12  shrink-0">
        {/* Left Section: filter label + Tabs */}
        <div className="flex items-center h-full gap-6">
          <span className="text-[13px] font-semibold text-zinc-100 capitalize border-r border-zinc-800 pr-4">
            {filterLabel}
          </span>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 h-full text-[13px] font-medium transition-colors relative px-1 ${
                activeTab === tab.name ? "text-zinc-100" : "hover:text-zinc-200"
              }`}
            >
              {tab.icon}
              {tab.name}

              {/* Animated sliding line */}
              {activeTab === tab.name && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

          {/* Add Button Group */}
          <div className="flex items-center bg-zinc-100 hover:bg-white text-black rounded-sm overflow-hidden transition-colors h-6">
            <button className="flex items-center justify-center px-1.5 border-r border-zinc-300 h-full">
              <Plus size={16} />
            </button>
            <button className="flex items-center justify-center px-1 h-full">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto  scrollbar-pill pt-5">
        {/* pill popover */}
        <div className="fixed right-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant=""
                className="text-[12px] rounded-full bg-white/5 text-zinc-300 hover:bg-white/10 border border-zinc-800 h-7 gap-2"
              >
                <ListFilter size={14} /> Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-54 p-1.5  border-zinc-800 rounded-xl shadow-2xl"
              side="bottom"
              align="end"
            >
              <div className="flex flex-col gap-0.5">
                <FilterItemWithTooltip
                  icon={<AtSign size={14} />}
                  label="Mentions"
                  shortcut="↑ 1"
                  tooltip="Filter for mentions"
                />
                <FilterItemWithTooltip
                  icon={<UserCircle size={14} />}
                  label="Assigned to me"
                  shortcut="↑ 2"
                  tooltip="Filter for tasks assigned to you"
                />
                <FilterItemWithTooltip
                  icon={<Mail size={14} />}
                  label="Unread"
                  shortcut="↑ 3"
                  tooltip="Filter for unread notifications"
                />
                <FilterItemWithTooltip
                  icon={<Bell size={14} />}
                  label="Reminders"
                  shortcut="↑ 4"
                  tooltip="Filter for reminders"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center h-full pt-5">
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
            {/* Displaying your SVG from the public folder */}
            <img src="/inbox.svg" alt="Empty Inbox" className="opacity-80" />

            <h2 className="text-zinc-100 text-lg">Inbox Zero</h2>

            <p className="text-zinc-500 text-sm flex items-center gap-1">
              Congratulations! You cleared your important notifications 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterItemWithTooltip = ({ icon, label, shortcut, tooltip }) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-zinc-800/50 rounded-lg text-sm transition-colors text-zinc-300 group">
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 group-hover:text-zinc-300">
              {icon}
            </span>
            {label}
          </div>
        </button>
      </TooltipTrigger>
      {/* Tooltip styled like the reference */}
      <TooltipContent
        side="top"
        className="bg-[#1a1a1a] border-zinc-800 text-zinc-200 text-xs font-medium py-1.5 px-3 shadow-xl"
      >
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
export default InboxPage;
