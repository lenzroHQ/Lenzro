"use client";

import React from "react";
import {
  Users,
  UserPlus,
  ArrowUpCircle,
  Cpu,
  ShieldCheck,
  FileText,
  Trash2,
  ExternalLink,
  LayoutTemplate,
  Zap,
  PenTool,
  Box,
  CheckSquare,
  Calendar,
  Grid,
  Download,
  Code,
  Mail,
  Settings2,
  Bell,
  Monitor,
  MessageSquare,
} from "lucide-react";

const SettingsSidebar = () => {
  const menuGroups = [
    {
      items: [
        { label: "People", icon: <Users size={16} /> },
        { label: "Teams", icon: <UserPlus size={16} /> },
        {
          label: "Upgrade",
          icon: <ArrowUpCircle size={16} />,
          color: "text-orange-400",
        },
        { label: "AI Usage", icon: <Cpu size={16} /> },
        { label: "Security & Permissions", icon: <ShieldCheck size={16} /> },
        { label: "Audit Logs", icon: <FileText size={16} /> },
        { label: "Trash", icon: <Trash2 size={16} /> },
      ],
    },
    {
      title: "Features",
      items: [
        { label: "Custom Field Manager", icon: <ExternalLink size={16} /> },
        { label: "Template Center", icon: <LayoutTemplate size={16} /> },
        { label: "Automations Manager", icon: <Zap size={16} /> },
        { label: "AI Notetaker", icon: <PenTool size={16} /> },
        { label: "Spaces", icon: <Box size={16} /> },
        { label: "Task Types", icon: <CheckSquare size={16} /> },
        { label: "Work Schedule", icon: <Calendar size={16} /> },
      ],
    },
    {
      title: "Integrations & ClickApps",
      items: [
        { label: "App Center", icon: <Grid size={16} />, isMultiColor: true },
        { label: "Imports / Exports", icon: <Download size={16} /> },
        { label: "ClickUp API", icon: <Code size={16} /> },
        { label: "Email Integration", icon: <Mail size={16} /> },
      ],
    },
    {
      title: "My Settings",
      items: [
        { label: "Preferences", icon: <Settings2 size={16} /> },
        { label: "Notifications", icon: <Bell size={16} /> },
        { label: "Workspaces", icon: <Monitor size={16} /> },
        { label: "Chat", icon: <MessageSquare size={16} /> },
      ],
    },
  ];

  return (
    <aside className="w-[260px] h-screen bg-[#0f0f10] border-r border-zinc-800/50 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto !py-4 scrollbar-thin scrollbar-thumb-zinc-800">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="!mb-6">
            {group.title && (
              <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider !px-4 !mb-2">
                {group.title}
              </h3>
            )}
            <nav className="!space-y-[2px]">
              {group.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  className="w-full flex items-center gap-3 !px-4 !py-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 transition-colors group"
                >
                  <span
                    className={`${item.color || "text-zinc-500 group-hover:text-zinc-300"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-medium leading-none">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SettingsSidebar;
