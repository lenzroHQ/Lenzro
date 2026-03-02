// components/layout/library-sidebar.tsx
"use client";
import React, { useState } from "react";
import SidebarSection from "./sidebar-section";
import SidebarRow from "./sidebar-row";
import {
  BarChart3,
  CreditCard,
  Globe,
  Home,
  Palette,
  Users2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LibrarySidebar = () => {
  return (
    <div className="flex flex-col h-full gap-5 justify-between px-2 py-2">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 px-2">
          <h1 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider opacity-60">
            Your Library
          </h1>
        </div>

        <SidebarSection title="Tools" showPlus defaultOpen={true}>
          <SidebarRow
            icon={<Home />}
            label="Point of Sale"
            textColor="text-cyan-500"
          />
          <SidebarRow
            icon={<Users2 />}
            label="CRM"
            textColor="text-purple-500"
          />
          <SidebarRow
            icon={<CreditCard />}
            label="Excel Sheets"
            textColor="text-emerald-500"
          />
          <SidebarRow
            icon={<Globe />}
            label="Canva"
            textColor="text-orange-500"
          />
        </SidebarSection>
      </div>

      {/* The Triggered Dialog */}
      {/* <ToolDialog
        trigger={
        }
      /> */}
          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 flex gap-2">
            <Plus size={16} />
            Add New Tool
          </Button>
    </div>
  );
};

export default LibrarySidebar;
