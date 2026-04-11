"use client";

import React, { useState } from "react";
import { Camera, Trash2, ExternalLink, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const [brandingEnabled, setBrandingEnabled] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10 text-zinc-200">
      {/* SECTION: General */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-zinc-400">General</h2>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Avatar</p>
            </div>
            <div className="h-10 w-10 bg-emerald-600 rounded flex items-center justify-center font-bold text-white cursor-pointer hover:opacity-80 transition-opacity">
              A
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Name</p>
            </div>
            <Input
              className="max-w-xs bg-zinc-950 border-zinc-800"
              defaultValue="Abdlaziz Mohamed's Work"
            />
          </div>
        </div>
      </section>

      {/* SECTION: Custom Branding */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-zinc-400">
            Custom branding
          </h2>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded">
            Enterprise
          </span>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
          {/* Toggle Header */}
          <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
            <p className="text-sm font-medium">Enable custom branding</p>
            <Switch
              checked={brandingEnabled}
              onCheckedChange={setBrandingEnabled}
            />
          </div>

          {/* Branding Content */}
          <div
            className={`p-6 space-y-8 transition-opacity ${!brandingEnabled ? "opacity-40 pointer-events-none" : "opacity-100"}`}
          >
            {/* Logo Uploads */}
            {[
              { label: "Round logo", desc: "Recommended 72 x 72 px PNG." },
              {
                label: "Rectangle logo",
                desc: "Recommended 232 x 48 px PNG. Used on emails and login screens.",
              },
              {
                label: "Social media graphic",
                desc: "Recommended 1200 x 630 px PNG for link previews.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-zinc-500 max-w-sm">{item.desc}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs"
                >
                  Add
                </Button>
              </div>
            ))}

            {/* Color Scheme */}
            <div className="space-y-4">
              <p className="text-sm font-medium">Color scheme</p>
              <div className="flex flex-wrap gap-3">
                {[
                  "#10b981",
                  "#3b82f6",
                  "#8b5cf6",
                  "#ec4899",
                  "#f43f5e",
                  "#f97316",
                  "#eab308",
                  "#71717a",
                ].map((color) => (
                  <div
                    key={color}
                    className="h-6 w-6 rounded-full cursor-pointer border border-white/10 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className="h-6 w-6 rounded-full border border-dashed border-zinc-600 flex items-center justify-center cursor-pointer">
                  <span className="text-[10px] text-zinc-500">Custom</span>
                </div>
              </div>
            </div>

            {/* Custom URL */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm font-medium">Custom URL</p>
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5">
                <span className="text-xs text-zinc-500">app.</span>
                <input
                  className="bg-transparent border-none outline-none text-xs w-24"
                  placeholder="workspace"
                />
                <span className="text-xs text-zinc-500">.clickup.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Danger Zone */}
      <section className="space-y-6 pb-20">
        <h2 className="text-lg font-semibold text-red-500/80">Danger zone</h2>
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-red-500/10">
            <div className="space-y-1">
              <p className="text-sm font-medium">Transfer ownership</p>
              <p className="text-xs text-zinc-500">
                Transfer this workspace to another person.
              </p>
            </div>
            <Button variant="outline" className="text-xs border-zinc-800">
              Select new owner
            </Button>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete Workspace</p>
              <p className="text-xs text-zinc-500">
                Once deleted, all data is gone forever.
              </p>
            </div>
            <Button
              variant="destructive"
              className="text-xs bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border-red-500/20"
            >
              Delete Workspace
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
