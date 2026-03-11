"use client"
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animatedbeammultipleoutputdemo";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

const LenzroDemo = () => {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  h-fit p-3 md:p-5 gap-[5rem] items-center">
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative w-full h-48 md:h-64 flex items-center justify-between px-4 md:px-8"
        >
          <AnimatedBeamMultipleOutputDemo
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>
      </div>
      <div className="flex flex-col relative w-full h-full gap-4 justify-center items-center">
        <h1 className="text-center text-2xl md:text-4xl">
          Manage and Automate your work using our Lenzro AI
        </h1>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
        <ShinyButton className="rounded-sm cursor-pointer transition-all duration-300 border px-4 py-2 text-base md:text-lg">
          Try our Lenzro AI
        </ShinyButton>
      </div>
    </div>
  );
};

export default LenzroDemo;
