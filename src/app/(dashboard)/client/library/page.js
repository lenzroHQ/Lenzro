"use client";

import React, { useState } from "react";
import {
  Building2,
  Clock,
  Star,
  Users2,
  Lock,
  Search,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

const Library = () => {
  const [activeTab, setActiveTab] = useState("Teamspaces");

  const tabs = [
    { name: "Teamspaces", icon: <Building2 size={14} /> },
    { name: "Recents", icon: <Clock size={14} /> },
    { name: "Favorites", icon: <Star size={14} /> },
    { name: "Shared", icon: <Users2 size={14} /> },
    { name: "Private", icon: <Lock size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full  text-zinc-100">
      {/* Topbar Container */}
      <div className="flex flex-col px-8 pt-8 pb-4 gap-4 shrink-0">
        {/* Upper Row: Title and New Teamspace Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl tracking-tight">Library</h1>
          <button className="bg-[#2383e2] hover:bg-[#3391ee] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            New teamspace
          </button>
        </div>

        {/* Lower Row: Navigation Pills and Search */}
        <div className="flex items-center border-b pb-2 justify-between">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                  activeTab === tab.name
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {tab.icon}
                {tab.name}
                {/* Optional: subtle layout transition for the pill selection */}
                {activeTab === tab.name && (
                  <motion.div
                    layoutId="activeLibraryPill"
                    className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right-aligned Search Icon */}
          <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {/* Library items will go here */}
        
      </div>
    </div>
  );
};

export default Library;
