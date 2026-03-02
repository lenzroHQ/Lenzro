// components/library/tool-dialog.tsx
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Search,
  Figma,
  Github,
  Chrome,
  Cloud,
  Calendar,
  Mail,
} from "lucide-react";

const APPS = [
  {
    name: "Figma",
    desc: "View Figma designs, create new files...",
    icon: <Figma className="text-pink-500" />,
    category: "Featured",
  },
  {
    name: "GitHub",
    desc: "Easily view and link GitHub PRs...",
    icon: <Github />,
    category: "Featured",
  },
  {
    name: "Google Drive",
    desc: "Attach, create, and search for files...",
    icon: <Cloud className="text-blue-500" />,
    category: "Featured",
  },
  {
    name: "Google Calendar",
    desc: "Sync between Calendar and ClickUp...",
    icon: <Calendar className="text-green-500" />,
    category: "All Apps",
  },
  {
    name: "Gmail",
    desc: "Search all your emails to get latest updates...",
    icon: <Mail className="text-red-500" />,
    category: "All Apps",
  },
];

export function ToolDialog({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#111111] border-zinc-800 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-1.5 h-1.5 bg-zinc-500 rounded-sm" />
              ))}
            </div>
            All Apps
          </DialogTitle>
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={16}
            />
            <Input
              placeholder="Search..."
              className="bg-zinc-900/50 border-zinc-800 pl-9 focus-visible:ring-zinc-700"
            />
          </div>
        </DialogHeader>

        <div className="p-6 h-[500px] overflow-y-auto scrollbar-pill space-y-8">
          {["Featured", "All Apps"].map((cat) => (
            <div key={cat} className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-400">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {APPS.filter((app) => app.category === cat).map((app) => (
                  <div
                    key={app.name}
                    className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-800/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-zinc-700">
                        {app.icon}
                      </div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">{app.name}</h4>
                    <p className="text-[11px] text-zinc-500 leading-tight line-clamp-2">
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
