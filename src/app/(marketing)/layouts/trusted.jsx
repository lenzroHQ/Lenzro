"use client";
import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "500M+", label: "investments raised by our clients" },
  { value: "x2", label: "avg projects per client — most come back" },
  { value: "5.0", label: "on clutch — 40+ reviews" },
  { value: "35%", label: "conversion lift — klickex case" },
];

const Trusted = () => {
  return (
    <div className="grid gap-8 rounded-2xl  p-4 sm:p-6 md:grid-cols-2 md:items-stretch md:gap-6 md:p-8">
      <div className="relative overflow-hidden rounded-xl">
        <video
          preload="metadata"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1.33" }}
          src="https://phenomenonstudio.com/wp-content/uploads/2026/04/showreel_homepage_2_tiny-2.mp4"
          autoPlay
          playsInline
          muted
          loop
        />
      </div>

      <div className="flex flex-col justify-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Our performance
        </p>
        <div className="mt-4 grid grid-cols-2 border-t border-white/15">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={cn(
                "flex flex-col items-center justify-center gap-2 border-white/15 px-6 py-10 text-center",
                i % 2 === 0 && "border-r",
                i < 2 && "border-b"
              )}
            >
              <h3 className="text-5xl font-semibold">{stat.value}</h3>
              <p className="max-w-[18ch] text-sm text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
