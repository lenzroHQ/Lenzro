"use client";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import BlackboardInput from "@/components/blackboard/blackboard-input";
import { TextAnimate } from "@/components/ui/text-animate";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function BlackboardPage() {
  const [timeOfDay, SetTime] = useState("Morning , ");
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = [
    "Thinking...",
    "Connecting pages",
    "Analyzing pages",
    "Preparing todays plan",
    "Completed",
  ];
  const isCompleted = statusIndex === statuses.length - 1;

  useEffect(() => {
    if (statusIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setStatusIndex(statusIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [statusIndex]);
  return (
    /* Added overflow-hidden to ensure the floating input stays relative to this viewport */
    <div className="relative rounded-md border bg-black h-full w-full min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
        )}
      /> */}

      {/* Blackboard canvas logic goes here */}
      <div className="p-5 z-50">
        <h1 className="flex items-center text-xl gap-2">
          <AnimatedGradientText
            speed={2}
            colorFrom="#4ade80"
            colorTo="#06b6d4"
            className="font-semibold  font-agrandir tracking-tight"
          >
            {timeOfDay}
          </AnimatedGradientText>
          <p>Abdiaziz Mohamed</p>
        </h1>
        <AnimatedShinyText className="inline-flex items-center justify-center gap-2 ">
          <p>Let’s plan today.</p>
        </AnimatedShinyText>
      </div>

      <BlackboardInput />
    </div>
  );
}
