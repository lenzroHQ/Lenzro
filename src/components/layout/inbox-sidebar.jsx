"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  Inbox,
  Star,
  Clock,
  Send,
  FileText,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Trash2,
  Mail,
  Tag,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_FILTERS = [
  { label: "Inbox", icon: Inbox, filter: "inbox", badge: 339 },
  { label: "Starred", icon: Star, filter: "starred" },
  { label: "Snoozed", icon: Clock, filter: "snoozed" },
  { label: "Sent", icon: Send, filter: "sent" },
  { label: "Drafts", icon: FileText, filter: "draft", badge: 4 },
  { label: "Purchases", icon: ShoppingBag, filter: "purchases" },
];

const MORE_FILTERS = [
  { label: "Important", icon: Tag, filter: "important" },
  { label: "Scheduled", icon: Clock, filter: "scheduled" },
  { label: "All Mail", icon: Mail, filter: "all" },
  { label: "Spam", icon: AlertOctagon, filter: "spam", badge: 6 },
  { label: "Bin", icon: Trash2, filter: "bin" },
];

const BOTTOM_ACTIONS = [
  { label: "Manage subscriptions", icon: Mail, dot: true },
  { label: "Manage labels", icon: Tag },
  { label: "Create new label", icon: Plus },
];

function FilterRow({ icon: Icon, label, href, active, badge, dot }) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group",
          active
            ? "text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
        )}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={16}
            className={cn(
              "shrink-0 transition-colors",
              active
                ? "text-blue-400"
                : "text-zinc-500 group-hover:text-zinc-300",
            )}
          />
          <span
            className={cn(
              "text-[13px] font-medium",
              active ? "text-blue-400" : "",
            )}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {dot && (
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          )}
          {badge != null && (
            <span
              className={cn(
                "text-[11px] font-semibold tabular-nums",
                active ? "text-blue-300" : "text-zinc-500",
              )}
            >
              {badge}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

const InboxSidebar = () => {
  const { workspace } = useParams() ?? {};
  const searchParams = useSearchParams();
  const base = workspace ? `/app/${workspace}/inbox` : "/client/inbox";
  const activeFilter = searchParams?.get("filter") ?? "inbox";
  const [showMore, setShowMore] = useState(false);

  const makeHref = (filter) => `${base}?filter=${filter}`;

  return (
    <div className="p-3 w-[280px]">
      <div className="flex flex-col h-[92vh] overflow-y-auto scrollbar-pill">
        {/* Header */}
        <div className="px-2 py-3 mb-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            Inbox
          </h2>
        </div>

        {/* Main filters */}
        <div className="flex flex-col gap-0.5">
          {MAIN_FILTERS.map((item) => (
            <FilterRow
              key={item.filter}
              icon={item.icon}
              label={item.label}
              href={makeHref(item.filter)}
              active={activeFilter === item.filter}
              badge={item.badge}
            />
          ))}
        </div>

        {/* More / Less toggle */}
        <button
          onClick={() => setShowMore((s) => !s)}
          className="flex items-center gap-3 px-3 py-[6px] mt-0.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors text-[13px] font-medium"
        >
          {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showMore ? "Less" : "More"}
        </button>

        {/* More filters */}
        {showMore && (
          <div className="flex flex-col gap-0.5 mt-0.5">
            {MORE_FILTERS.map((item) => (
              <FilterRow
                key={item.filter}
                icon={item.icon}
                label={item.label}
                href={makeHref(item.filter)}
                active={activeFilter === item.filter}
                badge={item.badge}
              />
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-2 border-t border-zinc-800" />

        {/* Bottom actions */}
        <div className="flex flex-col gap-0.5">
          {BOTTOM_ACTIONS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3  px-3 py-2 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={16}
                  className="shrink-0 text-zinc-500 group-hover:text-zinc-300"
                />
                <span className="text-[13px] font-medium">{item.label}</span>
              </div>
              {item.dot && (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxSidebar;
