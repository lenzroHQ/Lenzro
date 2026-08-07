"use client";

/**
 * CalendarPage
 * ════════════
 * Production-grade calendar with Day / 4-day / Week / Month views.
 *
 * Architecture:
 *  - URL ?date=YYYY-MM-DD is the single source of truth for the anchor date,
 *    shared with the CalendarSidebar mini-calendar.
 *  - Events live in local useState (replace with a DB call later).
 *  - Clicking ANY time slot opens the create dialog — no hover icons.
 *  - Dark mode only, matching the app's overall aesthetic.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  Clock,
  User,
  Flag,
  X,
  Check,
  CircleDashed,
  Circle,
  CheckCircle2,
  Folder,
  Tag,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

/** View options shown in the header dropdown */
const VIEWS = [
  { key: "day", label: "Day view" },
  { key: "4day", label: "4-day view" },
  { key: "week", label: "Week view" },
  { key: "month", label: "Month view" },
];

/** 24 hour slots (0 = midnight, 23 = 11 PM) */
const HOURS = Array.from({ length: 24 }, (_, i) => i);

/** Priority levels with tailwind color tokens */
const PRIORITIES = [
  {
    key: "urgent",
    label: "Urgent",
    flagColor: "text-red-400",
    dot: "bg-red-400",
  },
  {
    key: "high",
    label: "High",
    flagColor: "text-orange-400",
    dot: "bg-orange-400",
  },
  {
    key: "medium",
    label: "Medium",
    flagColor: "text-yellow-400",
    dot: "bg-yellow-400",
  },
  {
    key: "low",
    label: "Low",
    flagColor: "text-emerald-400",
    dot: "bg-emerald-400",
  },
];

/** Task workflow statuses */
const STATUSES = [
  { key: "todo", label: "To Do", Icon: CircleDashed, color: "text-zinc-400" },
  {
    key: "in_progress",
    label: "In Progress",
    Icon: Circle,
    color: "text-purple-400",
  },
  { key: "done", label: "Done", Icon: CheckCircle2, color: "text-emerald-400" },
];

/**
 * Event color presets (dark-mode tinted backgrounds).
 * `key`    — stored as event.color, used to look up the preset at render time.
 * `bg`     — card background class.
 * `border` — card border class.
 * `text`   — event title color.
 * `time`   — muted start-time label color.
 * `dot`    — color swatch dot in the dialog color picker.
 */
const EVENT_COLORS = [
  {
    key: "blue",
    bg: "bg-blue-950/70",
    border: "border-blue-800/40",
    text: "text-blue-300",
    time: "text-blue-300/60",
    dot: "bg-blue-500",
  },
  {
    key: "rose",
    bg: "bg-rose-950/70",
    border: "border-rose-800/40",
    text: "text-rose-300",
    time: "text-rose-300/60",
    dot: "bg-rose-500",
  },
  {
    key: "violet",
    bg: "bg-violet-950/70",
    border: "border-violet-800/40",
    text: "text-violet-300",
    time: "text-violet-300/60",
    dot: "bg-violet-500",
  },
  {
    key: "green",
    bg: "bg-emerald-950/70",
    border: "border-emerald-800/40",
    text: "text-emerald-300",
    time: "text-emerald-300/60",
    dot: "bg-emerald-500",
  },
  {
    key: "amber",
    bg: "bg-amber-950/60",
    border: "border-amber-700/40",
    text: "text-amber-300",
    time: "text-amber-300/60",
    dot: "bg-amber-500",
  },
  {
    key: "orange",
    bg: "bg-orange-950/70",
    border: "border-orange-800/40",
    text: "text-orange-300",
    time: "text-orange-300/60",
    dot: "bg-orange-500",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** True if two Date objects are the same calendar day */
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** True if the date is today */
function isToday(date) {
  return isSameDay(date, new Date());
}

/**
 * Format hour 0–23 as a 12-hour gutter label.
 * 0 → "12 AM", 13 → "1 PM"
 */
function formatHourLabel(h) {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

/**
 * Format hour + minute as a 12-hour time string shown on event cards.
 * e.g. (9, 30) → "9:30 AM",  (14, 0) → "2 PM"
 */
function formatTime12(h, m) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0
    ? `${hour} ${suffix}`
    : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Return a new Date offset by n days */
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Return the Sunday that begins the week containing `date` */
function startOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

/** Days in a given month (0-indexed) */
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/** Serialize a Date to "YYYY-MM-DD" for the URL param */
function dateToParam(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse a "YYYY-MM-DD" URL param back to a local Date; defaults to today */
function paramToDate(p) {
  if (!p) return new Date();
  const [y, m, d] = p.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENT TIME INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A dotted horizontal rule overlaid at the current time position.
 * Rendered inside each "today" column only.
 *
 * `currentMinutes` — minutes elapsed since midnight (e.g. 14×60+20 = 860).
 * `top` is calculated as (minutes / 60) × ROW_HEIGHT where ROW_HEIGHT = 64px (h-16).
 */
function CurrentTimeIndicator({ currentMinutes }) {
  const ROW_HEIGHT = 64; // matches h-16 on slot cells
  const top = (currentMinutes / 60) * ROW_HEIGHT;

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
      style={{ top }}
    >
      {/* Small filled circle on the left edge */}
      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
      {/* Dotted line spanning the column */}
      <div className="flex-1 border-t border-dashed border-zinc-500/50" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT CARD  (Day / 4-day / Week views)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * An absolutely-positioned block inside a day column representing one event.
 *
 * Position: top = startTime × 64px
 * Height:   (endTime − startTime) × 64px, minimum 24px
 *
 * Clicking opens the edit dialog.  No hover icons — just a clean card.
 *
 * Shows:
 *  - Priority dot (top-right) for urgent/high priority events
 *  - Event title (always)
 *  - Start time  (only if card height > 32px)
 */
function EventCard({ event, onEdit }) {
  const ROW_HEIGHT = 64;
  const startFrac = event.startHour + event.startMin / 60;
  const endFrac = event.endHour + event.endMin / 60;
  const top = startFrac * ROW_HEIGHT;
  const height = Math.max((endFrac - startFrac) * ROW_HEIGHT, 24);

  // Look up color preset by key, fall back to "blue"
  const cp = EVENT_COLORS.find((c) => c.key === event.color) ?? EVENT_COLORS[0];
  const priority = PRIORITIES.find((p) => p.key === event.priority);
  const showDot = event.priority === "urgent" || event.priority === "high";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onEdit(event);
      }}
      className={cn(
        "absolute left-1 right-1 rounded-lg border px-2.5 py-1.5 cursor-pointer z-10 overflow-hidden",
        "transition-all hover:brightness-125 hover:shadow-lg active:scale-[0.98]",
        cp.bg,
        cp.border,
      )}
      style={{ top, height }}
    >
      {/* Priority dot — top-right corner, urgent/high only */}
      {showDot && (
        <div
          className={cn(
            "absolute top-2 right-2 w-1.5 h-1.5 rounded-full shrink-0",
            priority?.dot,
          )}
        />
      )}

      {/* Event title — truncated if it doesn't fit */}
      <p
        className={cn(
          "text-[12px] font-semibold leading-tight truncate pr-3",
          cp.text,
        )}
      >
        {event.title}
      </p>

      {/* Start time — only shown when the card is tall enough */}
      {height > 32 && (
        <p className={cn("text-[11px] mt-0.5", cp.time)}>
          {formatTime12(event.startHour, event.startMin)}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIME GRID  (Day / 4-day / Week views)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scrollable time-based grid shared by Day, 4-day, and Week views.
 *
 * Structure:
 *  ┌──────────┬────────────────────────────────────┐
 *  │  gutter  │  day column 1 │ day column 2 │ … │
 *  │ (labels) │  slot cells   │  slot cells  │   │
 *  └──────────┴────────────────────────────────────┘
 *
 * - Left gutter: 64px wide, shows hour labels (12 AM … 11 PM)
 * - Each day column: 24 × h-16 slot cells (one per hour)
 * - Clicking a slot cell → onSlotClick(date, hour)
 * - Events are absolutely positioned over their column via EventCard
 * - CurrentTimeIndicator overlaid on today's column only
 *
 * On mount: auto-scrolls so the current time is ~200px from the top.
 */
function TimeGrid({ days, events, currentMinutes, onSlotClick, onEditEvent }) {
  const scrollRef = useRef(null);

  // Scroll to current time on first render only
  useEffect(() => {
    if (scrollRef.current && currentMinutes > 0) {
      scrollRef.current.scrollTop = Math.max(
        0,
        (currentMinutes / 60) * 64 - 200,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* ── Day header row ── */}
      <div className="flex shrink-0 border-b border-zinc-800/60 bg-[#111111]">
        {/* Empty corner above the gutter */}
        <div className="w-16 shrink-0 border-r border-zinc-800/50" />

        {/* One header cell per visible day */}
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 flex flex-col items-center py-3 border-l border-zinc-800/50 select-none",
              isToday(day) && "bg-zinc-800/20",
            )}
          >
            {/* Short weekday name e.g. "MON" */}
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </span>

            {/*
             * Day number:
             *   today   → filled white circle with dark number (inverted for dark mode)
             *   other   → plain zinc-300 number
             */}
            <span
              className={cn(
                "text-[15px] font-bold leading-none mt-1",
                isToday(day)
                  ? "w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-900"
                  : "text-zinc-300",
              )}
            >
              {day.getDate()}
            </span>
          </div>
        ))}
      </div>

      {/* ── All-day strip ── */}
      <div className="flex shrink-0 border-b border-zinc-800/40 bg-[#0e0e0e]">
        <div className="w-16 shrink-0 border-r border-zinc-800/50 flex items-center justify-center py-1">
          <span className="text-[9px] text-zinc-700 select-none">All day</span>
        </div>
        {days.map((_, i) => (
          <div key={i} className="flex-1 min-h-5 border-l border-zinc-800/50" />
        ))}
      </div>

      {/* ── Scrollable hour grid ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Hour label gutter — 64px wide, one row per hour */}
          <div className="w-16 shrink-0 border-r border-zinc-800/50 select-none">
            {HOURS.map((h) => (
              <div key={h} className="h-16 relative">
                {/* Label floats at the top edge of each hour (skip midnight) */}
                {h > 0 && (
                  <span className="absolute -top-2.5 right-3 text-[10px] text-zinc-600 whitespace-nowrap">
                    {formatHourLabel(h)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Day columns — one per visible day */}
          {days.map((day, ci) => {
            // Only show events that fall on this exact calendar day
            const dayEvents = events.filter((ev) =>
              isSameDay(new Date(ev.date), day),
            );

            return (
              <div
                key={ci}
                className={cn(
                  "flex-1 border-l border-zinc-800/50 relative",
                  isToday(day) && "bg-zinc-900/10",
                )}
              >
                {/*
                 * Slot cells — 24 rows of h-16 (64px each).
                 * Clicking anywhere in a cell opens the create dialog
                 * pre-filled with that day + hour.  No hover icon needed.
                 */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    onClick={() => onSlotClick(day, h)}
                    className="h-16 border-b border-zinc-800/30 cursor-pointer hover:bg-zinc-800/20 transition-colors"
                  />
                ))}

                {/* Live time indicator — today's column only */}
                {isToday(day) && (
                  <CurrentTimeIndicator currentMinutes={currentMinutes} />
                )}

                {/* Event cards — absolutely positioned over the slot grid */}
                {dayEvents.map((ev) => (
                  <EventCard key={ev.id} event={ev} onEdit={onEditEvent} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MONTH GRID
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Classic 6×7 month calendar.
 *
 * Cell layout:
 *  ┌──────────────────────────────────────────┐
 *  │ Sun  Mon  Tue  Wed  Thu  Fri  Sat        │  ← weekday headers
 *  ├──────────────────────────────────────────┤
 *  │ 29   30   31 │  1    2    3    4         │  ← previous month grayed out
 *  │  5    6    7    8    9   10   11         │
 *  │ …                                        │
 *  └──────────────────────────────────────────┘
 *
 * - Out-of-month days are rendered in bg-zinc-900/30 with muted text.
 * - Up to 3 event pills per cell; "+N more" if there are additional events.
 * - Clicking any cell opens the create dialog at 9 AM on that date.
 */
function MonthGrid({ anchorDate, events, onSlotClick, onEditEvent }) {
  const year = anchorDate.getFullYear();
  const month = anchorDate.getMonth();

  // ── Build a flat list of cell objects ──
  const cells = [];

  // Trailing days from the previous month to fill the first week row
  const firstWeekday = new Date(year, month, 1).getDay(); // 0 = Sun
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstWeekday - 1; i >= 0; i--)
    cells.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      outside: true,
    });

  // Current month's days
  for (let d = 1; d <= getDaysInMonth(year, month); d++)
    cells.push({ date: new Date(year, month, d), outside: false });

  // Leading days from next month to complete the final row
  const remaining = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let d = 1; d <= remaining; d++)
    cells.push({ date: new Date(year, month + 1, d), outside: true });

  // Split into 7-cell rows
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Weekday header bar */}
      <div className="grid grid-cols-7 shrink-0 border-b border-zinc-800/60 bg-[#111111]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="py-2.5 text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-widest border-l border-zinc-800/50 first:border-l-0 select-none"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      <div className="flex-1 overflow-y-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7" style={{ minHeight: 120 }}>
            {week.map(({ date, outside }, di) => {
              const dayEvents = events.filter((ev) =>
                isSameDay(new Date(ev.date), date),
              );

              return (
                <div
                  key={di}
                  onClick={() => onSlotClick(date, 9)}
                  className={cn(
                    "border-b border-l border-zinc-800/50 first:border-l-0 p-1.5 cursor-pointer hover:bg-zinc-800/20 transition-colors",
                    outside && "bg-zinc-900/30",
                  )}
                >
                  {/* Day number badge */}
                  <span
                    className={cn(
                      "inline-flex items-center justify-center text-[12px] font-semibold w-6 h-6 rounded-full mb-1 select-none",
                      isToday(date)
                        ? "bg-zinc-100 text-zinc-900"
                        : outside
                          ? "text-zinc-700"
                          : "text-zinc-400",
                    )}
                  >
                    {date.getDate()}
                  </span>

                  {/* Event pills — max 3 visible */}
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev) => {
                      const cp =
                        EVENT_COLORS.find((c) => c.key === ev.color) ??
                        EVENT_COLORS[0];
                      return (
                        <div
                          key={ev.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditEvent(ev);
                          }}
                          className={cn(
                            "flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium truncate border cursor-pointer hover:brightness-125 transition-all",
                            cp.bg,
                            cp.border,
                            cp.text,
                          )}
                        >
                          <span className="truncate">{ev.title}</span>
                        </div>
                      );
                    })}

                    {/* Overflow count */}
                    {dayEvents.length > 3 && (
                      <p className="text-[10px] text-zinc-600 px-1">
                        +{dayEvents.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY ROW  (Notion-style label + interactive value)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders one row in the event dialog's properties table.
 *
 * Layout:
 *   [icon + label (130px fixed)] │ [children — popover/input/etc.]
 *
 * The row highlights on hover so it feels clickable/editable.
 */
function PropertyRow({ icon, label, children }) {
  return (
    <div className="flex items-center min-h-8.5 rounded-md hover:bg-white/3 transition-colors -mx-2 px-2 group/prop cursor-default">
      {/* Left: icon + property name */}
      <div className="flex items-center gap-2.5 w-32.5 shrink-0 select-none">
        <span className="text-zinc-600 group-hover/prop:text-zinc-500 shrink-0 transition-colors">
          {icon}
        </span>
        <span className="text-[12px] text-zinc-500 font-medium">{label}</span>
      </div>

      {/* Right: editable value */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT DIALOG  (Notion-style document layout)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default / blank event — used when creating a new task.
 * Also merged with any `initial` partial object coming from slot clicks or edits.
 */
const EMPTY_EVENT = {
  id: null,
  title: "",
  description: "",
  date: dateToParam(new Date()),
  startHour: 9,
  startMin: 0,
  endHour: 10,
  endMin: 0,
  priority: "medium",
  status: "todo",
  assignee: "",
  project: "",
  color: "blue", // key into EVENT_COLORS
};

/**
 * Modal dialog for creating and editing events.
 *
 * Design: Notion/Linear-style document with:
 *  - Large auto-growing title textarea (press Enter → jumps to description)
 *  - Free-form description textarea
 *  - Properties section (Status, Priority, Time, Assignee, Project, Color)
 *    where every property is a PropertyRow with a popover or inline input
 *  - Footer: Delete (left) | Cancel / Create Task (right)
 *
 * Props:
 *   open     — boolean controlled by parent
 *   onClose  — called to close
 *   initial  — partial event to pre-fill (slot click or edit)
 *   onSave   — (event) → called with complete event on create/update
 *   onDelete — (id) → called when the delete button is confirmed
 */
function EventDialog({ open, onClose, initial, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_EVENT);
  const [timeOpen, setTimeOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Re-initialize the form every time the dialog opens
  // (intentionally only depends on `open`, not on `initial`)
  useEffect(() => {
    if (!open) return;
    setForm(initial ? { ...EMPTY_EVENT, ...initial } : { ...EMPTY_EVENT }); // eslint-disable-line
    setTimeOpen(false);
    setPriorityOpen(false);
    setStatusOpen(false);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Patch a single form field */
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  /** Validate and call onSave, then close */
  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, id: form.id ?? Date.now() });
    onClose();
  };

  // ── Derived display values ──
  const cp = EVENT_COLORS.find((c) => c.key === form.color) ?? EVENT_COLORS[0];
  const priorityEntry = PRIORITIES.find((p) => p.key === form.priority);
  const statusEntry = STATUSES.find((s) => s.key === form.status);
  const StatusIcon = statusEntry?.Icon ?? CircleDashed;

  /** "09:00 → 10:00" string shown on the Time property button */
  const fmtRange = () =>
    `${String(form.startHour).padStart(2, "0")}:${String(form.startMin).padStart(2, "0")}` +
    ` → ` +
    `${String(form.endHour).padStart(2, "0")}:${String(form.endMin).padStart(2, "0")}`;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-[#191919] border-zinc-800/60 rounded-2xl p-0 max-w-135 shadow-[0_32px_80px_rgba(0,0,0,0.75)] gap-0 overflow-hidden"
      >
        {/* ── Section 1: Large document-style title + description ── */}
        <div className="relative px-8 pt-8 pb-5">
          {/* X close button — subtle, top-right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <X size={14} />
          </button>

          {/* Screen-reader accessible dialog title */}
          <DialogTitle className="sr-only">
            {form.id ? "Edit Task" : "New Task"}
          </DialogTitle>

          {/*
           * Auto-growing title textarea.
           * Starts at 1 row, expands as the user types.
           * Enter key jumps focus to the description field.
           */}
          <textarea
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              // Height grows with content
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // Move focus to the next sibling (description)
                e.currentTarget.nextElementSibling?.focus();
              }
            }}
            placeholder="Untitled"
            rows={1}
            spellCheck={false}
            autoFocus
            className="w-full bg-transparent text-[26px] font-bold text-zinc-50 placeholder:text-zinc-700 outline-none border-none resize-none leading-tight overflow-hidden"
          />

          {/* Free-form description — no border, feels like a doc */}
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className="w-full mt-3 bg-transparent text-[13px] text-zinc-400 placeholder:text-zinc-600 outline-none border-none resize-none leading-relaxed"
          />
        </div>

        {/* ── Section 2: Properties table ── */}
        <div className="px-6 pb-3">
          <div className="border-t border-zinc-800/60 pt-3">
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.12em] font-semibold px-2 mb-1 select-none">
              Properties
            </p>

            {/* — Status — */}
            <PropertyRow
              icon={
                <StatusIcon
                  size={13}
                  className={statusEntry?.color ?? "text-zinc-500"}
                />
              }
              label="Status"
            >
              <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] font-medium transition-colors hover:bg-zinc-800",
                      statusEntry?.color ?? "text-zinc-400",
                    )}
                  >
                    <StatusIcon size={11} />
                    <span>{statusEntry?.label}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  className="w-44 p-1.5 bg-[#1e1e1e] border-zinc-800 rounded-xl shadow-2xl"
                >
                  {STATUSES.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => {
                        set("status", s.key);
                        setStatusOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] transition-colors",
                        form.status === s.key
                          ? "bg-zinc-800 " + s.color
                          : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
                      )}
                    >
                      <s.Icon size={12} className={s.color} />
                      <span className="flex-1 text-left">{s.label}</span>
                      {form.status === s.key && (
                        <Check size={11} className="opacity-60" />
                      )}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </PropertyRow>

            {/* — Priority — */}
            <PropertyRow
              icon={
                <Flag
                  size={13}
                  className={priorityEntry?.flagColor ?? "text-zinc-500"}
                />
              }
              label="Priority"
            >
              <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] font-medium transition-colors hover:bg-zinc-800",
                      priorityEntry?.flagColor ?? "text-zinc-400",
                    )}
                  >
                    <Flag size={11} />
                    <span>{priorityEntry?.label ?? "None"}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  className="w-44 p-1.5 bg-[#1e1e1e] border-zinc-800 rounded-xl shadow-2xl"
                >
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => {
                        set("priority", p.key);
                        setPriorityOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] transition-colors",
                        form.priority === p.key
                          ? "bg-zinc-800 " + p.flagColor
                          : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
                      )}
                    >
                      <Flag size={12} className={p.flagColor} />
                      <span className="flex-1 text-left">{p.label}</span>
                      {form.priority === p.key && (
                        <Check size={11} className="opacity-60" />
                      )}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </PropertyRow>

            {/* — Time — */}
            <PropertyRow
              icon={<Clock size={13} className="text-zinc-500" />}
              label="Time"
            >
              <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                <PopoverTrigger asChild>
                  {/* Shows "09:00 → 10:00" — clicking opens the time picker popover */}
                  <button className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-zinc-300 font-medium hover:bg-zinc-800 transition-colors tabular-nums">
                    {fmtRange()}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  className="w-60 p-4 bg-[#1e1e1e] border-zinc-800 rounded-xl shadow-2xl"
                >
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.12em] font-semibold mb-3">
                    Time Range
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Start column */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-600">Start</span>
                      <div className="flex items-center gap-1">
                        <select
                          value={form.startHour}
                          onChange={(e) => set("startHour", +e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-700/60 rounded-md text-[11px] text-zinc-300 px-1.5 py-1.5 outline-none cursor-pointer"
                        >
                          {HOURS.map((h) => (
                            <option key={h} value={h}>
                              {String(h).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                        <span className="text-zinc-600 text-[10px]">:</span>
                        <select
                          value={form.startMin}
                          onChange={(e) => set("startMin", +e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-700/60 rounded-md text-[11px] text-zinc-300 px-1.5 py-1.5 outline-none cursor-pointer"
                        >
                          {[0, 15, 30, 45].map((m) => (
                            <option key={m} value={m}>
                              {String(m).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* End column */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-600">End</span>
                      <div className="flex items-center gap-1">
                        <select
                          value={form.endHour}
                          onChange={(e) => set("endHour", +e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-700/60 rounded-md text-[11px] text-zinc-300 px-1.5 py-1.5 outline-none cursor-pointer"
                        >
                          {HOURS.map((h) => (
                            <option key={h} value={h}>
                              {String(h).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                        <span className="text-zinc-600 text-[10px]">:</span>
                        <select
                          value={form.endMin}
                          onChange={(e) => set("endMin", +e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-700/60 rounded-md text-[11px] text-zinc-300 px-1.5 py-1.5 outline-none cursor-pointer"
                        >
                          {[0, 15, 30, 45].map((m) => (
                            <option key={m} value={m}>
                              {String(m).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </PropertyRow>

            {/* — Assignee — */}
            <PropertyRow
              icon={<User size={13} className="text-zinc-500" />}
              label="Assignee"
            >
              <input
                value={form.assignee}
                onChange={(e) => set("assignee", e.target.value)}
                placeholder="Empty"
                className="w-full bg-transparent text-[12px] text-zinc-300 placeholder:text-zinc-600 outline-none px-2 py-1 rounded-md hover:bg-zinc-800 focus:bg-zinc-800/60 transition-colors"
              />
            </PropertyRow>

            {/* — Project — */}
            <PropertyRow
              icon={<Folder size={13} className="text-zinc-500" />}
              label="Project"
            >
              <input
                value={form.project}
                onChange={(e) => set("project", e.target.value)}
                placeholder="Empty"
                className="w-full bg-transparent text-[12px] text-zinc-300 placeholder:text-zinc-600 outline-none px-2 py-1 rounded-md hover:bg-zinc-800 focus:bg-zinc-800/60 transition-colors"
              />
            </PropertyRow>

            {/* — Label color — circular swatch picker — */}
            <PropertyRow
              icon={<Tag size={13} className="text-zinc-500" />}
              label="Label color"
            >
              <div className="flex items-center gap-2.5 px-2 py-1">
                {EVENT_COLORS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => set("color", c.key)}
                    className={cn(
                      "w-4 h-4 rounded-full border-2 transition-all shrink-0",
                      c.dot,
                      form.color === c.key
                        ? "border-white scale-125 shadow-md"
                        : "border-transparent hover:border-zinc-400 hover:scale-110",
                    )}
                  />
                ))}
              </div>
            </PropertyRow>
          </div>
        </div>

        {/* ── Section 3: Footer — delete / cancel / save ── */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-zinc-800/60 bg-[#161616]">
          {/* Delete — only shown when editing an existing event */}
          {form.id && onDelete ? (
            <button
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-[12px] text-red-400/60 hover:text-red-400 transition-colors font-medium"
            >
              Delete task
            </button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 px-3 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg text-[12px]"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!form.title.trim()}
              className="h-8 px-4 rounded-lg bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-30 text-[12px] font-semibold shadow-sm"
            >
              {form.id ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CALENDAR PAGE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Top-level page component.
 *
 * State:
 *   view           — "day" | "4day" | "week" | "month"
 *   showWeekends   — toggle Sat/Sun columns in week view
 *   viewOpen       — view-switcher popover visibility
 *   events         — in-memory array of all event objects
 *   dialogOpen     — create/edit modal visibility
 *   editingEvent   — null (new) or event object (edit)
 *   currentMinutes — live clock, minutes since midnight (updates every 60 s)
 *
 * URL state:
 *   ?date=YYYY-MM-DD — anchor date, shared with the sidebar mini-calendar.
 *   Navigating calls router.replace() to keep it bookmarkable.
 */
export default function CalendarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ── View & UI state ──────────────────────────────────────────────────────
  const [view, setView] = useState("week");
  const [showWeekends, setShowWeekends] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);

  // ── Events (in-memory; swap for API calls later) ─────────────────────────
  const [events, setEvents] = useState([]);

  // ── Dialog state ─────────────────────────────────────────────────────────
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // ── Live clock ───────────────────────────────────────────────────────────
  const [currentMinutes, setCurrentMinutes] = useState(0);

  // Anchor date comes from the URL, defaulting to today
  const anchorDate = paramToDate(searchParams.get("date"));

  // Tick the clock on mount and every 60 seconds thereafter
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────

  /**
   * Move forward or backward by one "view unit":
   *   day → ±1 day,  4day → ±4 days,  week → ±7,  month → ±30
   */
  const navigate = useCallback(
    (delta) => {
      const step =
        view === "month" ? 30 : view === "week" ? 7 : view === "4day" ? 4 : 1;
      const next = addDays(anchorDate, delta * step);
      router.replace(`${pathname}?date=${dateToParam(next)}`);
    },
    [anchorDate, view, router, pathname],
  );

  /** Reset to today */
  const goToToday = () =>
    router.replace(`${pathname}?date=${dateToParam(new Date())}`);

  // ── Visible day columns ──────────────────────────────────────────────────

  /**
   * Build the ordered array of Date objects that appear as columns in
   * the time grid.  Month view doesn't use this (it has its own grid).
   */
  const visibleDays = (() => {
    if (view === "day") return [anchorDate];
    if (view === "4day")
      return Array.from({ length: 4 }, (_, i) => addDays(anchorDate, i));
    if (view === "week") {
      const sun = startOfWeek(anchorDate);
      return Array.from({ length: showWeekends ? 7 : 5 }, (_, i) =>
        addDays(sun, i),
      );
    }
    return [];
  })();

  // ── Header text ──────────────────────────────────────────────────────────

  /**
   * Large title shown beneath/beside the date badge.
   * Examples: "January 2025", "April 2026", "Sunday, April 12, 2026"
   */
  const headerTitle = (() => {
    if (view === "month")
      return anchorDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    if (view === "day")
      return anchorDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    if (visibleDays.length > 0) {
      const first = visibleDays[0];
      const last = visibleDays[visibleDays.length - 1];
      return first.getMonth() === last.getMonth()
        ? first.toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : first.toLocaleDateString("en-US", { month: "short" }) +
            " – " +
            last.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
    }
    return "";
  })();

  /**
   * Smaller subtitle showing the full date range.
   * Example: "Apr 6, 2026 – Apr 12, 2026"
   */
  const headerSubtitle = (() => {
    const fmt = { month: "short", day: "numeric", year: "numeric" };
    if (view === "month") {
      const first = new Date(
        anchorDate.getFullYear(),
        anchorDate.getMonth(),
        1,
      );
      const last = new Date(
        anchorDate.getFullYear(),
        anchorDate.getMonth() + 1,
        0,
      );
      return `${first.toLocaleDateString("en-US", fmt)} – ${last.toLocaleDateString("en-US", fmt)}`;
    }
    if (view === "day") return anchorDate.toLocaleDateString("en-US", fmt);
    if (visibleDays.length > 0) {
      return `${visibleDays[0].toLocaleDateString("en-US", fmt)} – ${visibleDays[visibleDays.length - 1].toLocaleDateString("en-US", fmt)}`;
    }
    return "";
  })();

  // ── Dialog openers ────────────────────────────────────────────────────────

  /** Open create dialog pre-filled with the slot's date + hour */
  const openCreate = (date, hour) => {
    setEditingEvent({
      ...EMPTY_EVENT,
      date: dateToParam(date),
      startHour: hour,
      endHour: Math.min(hour + 1, 23),
    });
    setDialogOpen(true);
  };

  /** Open edit dialog for an existing event */
  const openEdit = (ev) => {
    setEditingEvent(ev);
    setDialogOpen(true);
  };

  /** Called from the "Add event" button — defaults to 9 AM on anchor date */
  const openAddEvent = () => openCreate(anchorDate, 9);

  // ── Event CRUD handlers ───────────────────────────────────────────────────

  /** Upsert: update existing event by id, or append if new */
  const handleSave = (ev) =>
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === ev.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = ev;
        return next;
      }
      return [...prev, ev];
    });

  /** Remove event by id */
  const handleDelete = (id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  // ── Today's badge values (always reflects real today, not anchorDate) ────
  const today = new Date();
  const todayMonth = today
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const todayDay = today.getDate();

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden bg-[#0e0e0e]">
      {/*
       * ══════════════════════════════════════════════════════════════════
       * TOP BAR
       *
       * Left:  [ date badge ]  [ title / subtitle ]
       * Right: [ 🔍 ] [ ← Today → ] [ Week view ▾ ] [ + Add event ]
       * ══════════════════════════════════════════════════════════════════
       */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/70 shrink-0 bg-[#111111]">
        {/* ── Left: date badge + heading ── */}
        <div className="flex items-center gap-4">
          {/*
           * Mini date badge — always shows TODAY's month + day number,
           * styled like a tiny physical calendar tear-off.
           */}
          <div className="flex flex-col items-center border border-zinc-700/50 rounded-lg overflow-hidden  w-11 shrink-0 select-none">
            {/* Month strip — red accent */}
            <div className="w-full text-center text-[9px] font-bold tracking-widest px-2 text-red-400 bg-zinc-900 py-1">
              {todayMonth}
            </div>
            {/* Day number */}
            <div className="text-[18px] font-bold text-zinc-100 leading-none py-2">
              {todayDay}
            </div>
          </div>

          {/* Title + subtitle text */}
          <div className="flex flex-col select-none">
            <h1 className="text-[15px] font-bold text-zinc-100 leading-tight">
              {headerTitle}
            </h1>
            <p className="text-[11px] text-zinc-500 mt-0.5">{headerSubtitle}</p>
          </div>
        </div>

        {/* ── Right: controls ── */}
        <div className="flex items-center gap-2">
          {/* Search icon — placeholder for future search functionality */}
          <button className="p-2 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Search size={15} />
          </button>

          {/*
           * Prev / Today / Next navigation group.
           * Grouped in a single pill with shared border.
           */}
          <div className="flex items-center rounded-lg border border-zinc-700/50 overflow-hidden">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors border-r border-zinc-700/50"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-[12px] font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigate(1)}
              className="px-3 py-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors border-l border-zinc-700/50"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* View switcher dropdown */}
          <Popover open={viewOpen} onOpenChange={setViewOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-[12px] font-medium text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
                {VIEWS.find((v) => v.key === view)?.label ?? "Week view"}
                <ChevronDown size={12} className="text-zinc-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={6}
              className="w-48 p-1.5 bg-[#1c1c1c] border-zinc-800 rounded-xl shadow-2xl"
            >
              {/* View options */}
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  onClick={() => {
                    setView(v.key);
                    setViewOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px] transition-colors",
                    view === v.key
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
                  )}
                >
                  <span>{v.label}</span>
                  {view === v.key && (
                    <Check size={12} className="text-zinc-400" />
                  )}
                </button>
              ))}

              {/* Divider */}
              <div className="my-1 border-t border-zinc-800" />

              {/* Weekends toggle — affects week view column count */}
              <button
                onClick={() => setShowWeekends((s) => !s)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px] text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors"
              >
                <span>Show weekends</span>
                {/* Pill toggle */}
                <div
                  className={cn(
                    "w-7 h-4 rounded-full relative transition-colors",
                    showWeekends ? "bg-zinc-300" : "bg-zinc-700",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all",
                      showWeekends ? "left-3.5" : "left-0.5",
                    )}
                  />
                </div>
              </button>
            </PopoverContent>
          </Popover>

          {/* Add event — primary CTA button */}
          <Button
            onClick={openAddEvent}
            className="flex items-center gap-1.5 !px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-900 text-[12px] font-semibold hover:bg-white transition-colors shadow-sm"
          >
            <Plus size={14} />
            Add event
          </Button>
        </div>
      </div>

      {/*
       * ══════════════════════════════════════════════════════════════════
       * CALENDAR GRID
       *
       * Switches between:
       *   MonthGrid  — for "month" view
       *   TimeGrid   — for "day", "4day", "week" views
       * ══════════════════════════════════════════════════════════════════
       */}
      <div className="flex-1 min-h-0 flex flex-col">
        {view === "month" ? (
          <MonthGrid
            anchorDate={anchorDate}
            events={events}
            onSlotClick={openCreate}
            onEditEvent={openEdit}
          />
        ) : (
          <TimeGrid
            days={visibleDays}
            events={events}
            currentMinutes={currentMinutes}
            onSlotClick={openCreate}
            onEditEvent={openEdit}
          />
        )}
      </div>

      {/*
       * ══════════════════════════════════════════════════════════════════
       * EVENT DIALOG
       * Controlled by dialogOpen + editingEvent.
       * ══════════════════════════════════════════════════════════════════
       */}
      <EventDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initial={editingEvent}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
