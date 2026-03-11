"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Settings, Video } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";

const CalendarPage = () => {
  return (
    /* Changed to relative and removed border for a cleaner "full-page" look */
    <div className="relative h-full w-full bg-black text-zinc-100 flex flex-col items-center justify-center px-10 overflow-hidden">
      {/* Optimized Grid Pattern */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          /* Updated mask for better blending and coverage */
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "fixed inset-0 h-full bg-black w-full skew-y-12",
        )}
      />

      <div className="z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content: Hero Text */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] text-white">
            Organize Your Business Workflow
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            Connect your calendar to manage events, time block your work, and
            take meeting notes – powered by Lenzro AI.
          </p>

          <div className="pt-8 space-y-4">
            <p className="text-zinc-500 text-sm font-medium">
              Get started with
            </p>
            <div className="flex flex-wrap gap-3">
              <RainbowButton>Google calender</RainbowButton>
              <RainbowButton>Microsoft outlook</RainbowButton>
            </div>
          </div>
        </div>

        {/* Right Content: Feature Card Visual */}
        <div className="lg:col-span-7 relative flex justify-end">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[540px] bg-[#161616] rounded-[32px] border border-zinc-800/50 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border border-purple-500/20">
                <Video size={14} /> NOTETAKER: ON
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#161616]" />
                  <div className="w-7 h-7 rounded-full bg-yellow-500 border-2 border-[#161616]" />
                </div>
                <span className="text-xs font-medium">8 Calendars</span>
                <Settings
                  size={16}
                  className="hover:text-zinc-300 cursor-pointer transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-zinc-800/50 mb-8">
              <p className="text-[11px] text-zinc-500 mb-4 flex items-center gap-2 font-semibold">
                <ChevronLeft size={12} /> TUE, MAR 14 <ChevronRight size={12} />
              </p>
              <div className="bg-purple-600/10 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <h4 className="font-bold text-sm text-zinc-100">
                  Calendar Squad Sync
                </h4>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  9:00 - 9:30 AM
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Automate your meeting notes
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lenzro Notetaker transcribes, summarizes, and creates action items
              automatically for any meeting.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ServiceButton = ({ label, icon }) => (
  <button className="flex items-center gap-3 bg-[#161616] border border-zinc-800/80 hover:border-zinc-500 hover:bg-[#1c1c1c] px-6 py-3.5 rounded-2xl transition-all group shadow-sm">
    <img
      src={icon}
      alt={label}
      className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300"
    />
    <span className="text-sm font-bold text-zinc-300 group-hover:text-white">
      {label}
    </span>
  </button>
);

export default CalendarPage;
