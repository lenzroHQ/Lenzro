"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  CalendarDays,
  CalendarRange,
  LayoutList,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Search,
  Zap,
  CircleDashed,
  Circle,
  CheckCircle,
  Users,
  Check,
  RefreshCcw,
  FilePlus2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ─── Status Popover & Task Row ───────────────────────────────────────────────

const ST_TODO = "TODO";
const ST_IN_PROGRESS = "IN_PROGRESS";
const ST_COMPLETE = "COMPLETE";

function TaskRow({ title, tooltipDesc }) {
  const [status, setStatus] = useState(ST_TODO);
  const [tab, setTab] = useState("status");

  // Determine icon based on status
  let StatusIcon = CircleDashed;
  let statusColor = "text-zinc-500 hover:text-zinc-300";
  if (status === ST_IN_PROGRESS) {
    StatusIcon = Circle;
    statusColor = "text-purple-500 fill-purple-900/50";
  } else if (status === ST_COMPLETE) {
    StatusIcon = CheckCircle2;
    statusColor = "text-emerald-500";
  }

  return (
    <div className="flex flex-col w-full group/task relative">
      <div className="flex items-center justify-between w-full rounded-md hover:bg-[#262626] px-2 py-1 cursor-pointer transition-colors relative">
        <div className="flex items-center gap-2 min-w-0 z-10 w-full relative">
          <Popover>
            <PopoverTrigger asChild>
              {/* Force stop propagation on Popover trigger so it doesnt conflict with row click */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center shrink-0 w-6 h-6 rounded transition-colors group/btn relative"
              >
                <div className="group-hover/task:opacity-0 transition-opacity absolute inset-0 flex items-center justify-center">
                  <StatusIcon size={14} className={statusColor} />
                </div>
                <div className="opacity-0 group-hover/task:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center text-zinc-400 group-hover/btn:text-zinc-200">
                  <FilePlus2 size={13} />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-64 p-0 border-zinc-800 bg-background rounded-xl overflow-hidden shadow-2xl"
              sideOffset={4}
            >
              {/* Tabs */}
              <div className="flex p-1 gap-1 border-b border-zinc-800/80 bg-[#1a1a1a]">
                <button
                  onClick={() => setTab("status")}
                  className={cn(
                    "flex-1 py-1.5 text-[12px] font-medium rounded-md transition-colors",
                    tab === "status"
                      ? "bg-[#262626] text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300",
                  )}
                >
                  Status
                </button>
              </div>

              {tab === "status" && (
                <div className="p-2 flex flex-col gap-3">
                  <div className="px-1">
                    <div className="relative">
                      <Input
                        placeholder="Search..."
                        className="h-8 text-xs bg-transparent border-zinc-700/60 focus-visible:ring-0 focus-visible:border-zinc-500 rounded-md placeholder:text-zinc-500"
                      />
                    </div>
                  </div>

                  {/* Status Options */}
                  <div className="flex flex-col gap-1">
                    {/* Not started */}
                    <div>
                      <p className="px-2 text-[10px]  text-zinc-500 mb-1">
                        Not started
                      </p>
                      <button
                        onClick={() => setStatus(ST_TODO)}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-zinc-900 transition-colors group",
                          status === ST_TODO && "bg-zinc-900",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CircleDashed size={14} className="text-zinc-500" />
                          <span className="text-[12px] font-medium text-zinc-300 group-hover:text-zinc-100">
                            TO DO
                          </span>
                        </div>
                        {status === ST_TODO && (
                          <Check size={14} className="text-zinc-100" />
                        )}
                      </button>
                    </div>

                    {/* Active */}
                    <div>
                      <p className="px-2 text-[10px]  text-zinc-500 mb-1 mt-1">
                        Active
                      </p>
                      <button
                        onClick={() => setStatus(ST_IN_PROGRESS)}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-zinc-900 transition-colors group",
                          status === ST_IN_PROGRESS && "bg-zinc-900",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Circle size={14} className="text-purple-500" />
                          <span className="text-[12px] font-medium text-zinc-300 group-hover:text-zinc-100">
                            IN PROGRESS
                          </span>
                        </div>
                        {status === ST_IN_PROGRESS && (
                          <Check size={14} className="text-zinc-100" />
                        )}
                      </button>
                    </div>

                    {/* Closed */}
                    <div>
                      <p className="px-2 text-[10px]  text-zinc-500 mb-1 mt-1">
                        Closed
                      </p>
                      <button
                        onClick={() => setStatus(ST_COMPLETE)}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-zinc-900 transition-colors group",
                          status === ST_COMPLETE && "bg-zinc-900",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />
                          <span className="text-[12px] font-medium text-zinc-300 group-hover:text-zinc-100">
                            COMPLETE
                          </span>
                        </div>
                        {status === ST_COMPLETE && (
                          <Check size={14} className="text-zinc-100" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Task Name & Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 truncate cursor-default pr-6">
                <span className="text-[13px] text-zinc-300">{title}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              className=" text-background border-zinc-800/80 px-2 py-1 shadow-2xl"
              sideOffset={4}
            >
              <p className="text-[11px] font-medium">{tooltipDesc}</p>
            </TooltipContent>
          </Tooltip>

          {/* Action icons */}
          <div className="absolute right-2 opacity-0 group-hover/task:opacity-100 transition-opacity flex items-center justify-center shrink-0">
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-6 h-6 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Zap size={13} fill="currentColor" className="opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  const handleRefresh = (e) => {
    e.stopPropagation();
    toast.success("Tasks have been refreshed");
  };

  return (
    <div className="flex flex-col mb-1 w-full group/section">
      <div className="flex items-center justify-between w-full hover:bg-zinc-900/60 rounded-md transition-colors px-1">
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-1 items-center gap-2 py-1.5 px-1 group cursor-pointer text-left"
        >
          <span className="text-[13px]  text-zinc-300 group-hover:text-zinc-100 transition-colors">
            {title}
          </span>
          <ChevronRight
            size={12}
            className={cn(
              "text-zinc-500 transition-transform duration-200",
              open && "rotate-90",
            )}
          />
        </button>
        <button
          onClick={handleRefresh}
          className="p-1 opacity-0 group-hover/section:opacity-100 hover:text-zinc-100 text-zinc-400 transition-all rounded hover:bg-zinc-800"
        >
          <RefreshCcw size={13} />
        </button>
      </div>
      {open && (
        <div className="flex flex-col w-full pl-1 pr-1 pb-1 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const CalendarSidebar = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const workspace = params?.workspaceId;
  const base = workspace ? `/${workspace}` : "/client";

  // Parse date from URL or use current date
  const dateParam = searchParams.get("date");
  const initialDate = dateParam ? new Date(dateParam) : new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [activeView, setActiveView] = useState("month");

  const handleDateSelect = (date) => {
    if (!date) return;
    setSelectedDate(date);

    // Format date as YYYY-MM-DD for the query parameter
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    // Update URL without a full page reload relying on Next.js setup mapping
    const nextUrl = `${pathname}?date=${dateString}`;
    router.replace(nextUrl);
  };

  return (
    <div className="w-[280px] h-[92vh] flex flex-col overflow-hidden">
      <TooltipProvider delayDuration={0}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-sm font-medium text-zinc-100">Month</h1>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center border border-zinc-800 hover:bg-zinc-800 rounded-md cursor-pointer transition-colors h-7 overflow-hidden group">
                <button className="px-2 flex items-center justify-center h-full hover:bg-zinc-700/50 transition-colors">
                  <Plus
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-300"
                  />
                </button>
                <div className="h-4 w-[1px] bg-zinc-800" />
                <button className="px-1.5 flex items-center justify-center h-full hover:bg-zinc-700/50 transition-colors">
                  <ChevronDown
                    size={14}
                    className="text-zinc-500 group-hover:text-zinc-400"
                  />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-56 p-1.5 bg-background border border-zinc-800 rounded-xl shadow-2xl flex flex-col gap-2 pt-2"
            >
              <div className="px-2 pb-1 text-[11px] font-medium tracking-wide text-zinc-500 flex justify-between items-center">
                <span>Create</span>
              </div>
              <button className="flex items-center gap-3 px-2 py-1.5 w-full rounded-md hover:bg-zinc-800 text-zinc-200 transition-colors text-sm group">
                <CalendarDays size={14} className="text-pink-500" />
                <span className="flex-1 text-left">Event</span>
              </button>
              <button className="flex items-center gap-3 px-2 py-1.5 w-full rounded-md hover:bg-zinc-800 text-zinc-200 transition-colors text-sm group">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="flex-1 text-left">Task</span>
              </button>
              <Separator />
              <Button className="flex items-center justify-center gap-3 px-2 py-1.5 w-full rounded-md  transition-colors text-[13px] group">
                Add a new property
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-pill px-2 pb-4 space-y-2 h-[80vh] mt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-lg border w-full mb-6"
            captionLayout="dropdown"
          />

          <CollapsibleSection title="Priorities" defaultOpen={false}>
            <TaskRow
              title="2vhe"
              tooltipDesc="Personal Space / Personal List"
            />
            <TaskRow
              title="Fix auth bug"
              tooltipDesc="Development / High Priority"
            />
          </CollapsibleSection>

          <div className="flex flex-col mb-1 w-full group/section">
            <div className="flex items-center justify-between gap-2 py-1.5 px-2 w-full text-left hover:bg-zinc-900/60 rounded-md transition-colors">
              <span className="text-[13px]  text-zinc-300">Meet with</span>
              <button
                onClick={() => toast.success("Tasks have been refreshed")}
                className="p-1 opacity-0 group-hover/section:opacity-100 hover:text-zinc-100 text-zinc-400 transition-all rounded hover:bg-zinc-800"
              >
                <RefreshCcw size={13} />
              </button>
            </div>
            <div className="px-1 mt-1">
              <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-md overflow-hidden">
                <div className="pl-2 pt-0.5">
                  <Users size={14} className="text-zinc-500" />
                </div>
                <Input
                  placeholder="Search for people..."
                  className="h-8 text-[13px] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>

          <CollapsibleSection title="Assigned to me" defaultOpen={false}>
            <TaskRow
              title="Design new sidebar"
              tooltipDesc="Internal / UI Team"
            />
          </CollapsibleSection>

          <CollapsibleSection title="Today & overdue" defaultOpen={true}>
            <TaskRow title="Client sync" tooltipDesc="Meetings / External" />
            <TaskRow title="Push to prod" tooltipDesc="DevOps / Deployments" />
          </CollapsibleSection>

          <CollapsibleSection title="Backlog" defaultOpen={false}>
            <TaskRow
              title="Refactor legacy auth"
              tooltipDesc="Tech Debt / Core"
            />
            <TaskRow title="Update copy" tooltipDesc="Marketing / Website" />
          </CollapsibleSection>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default CalendarSidebar;
