"use client";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BotMessageSquare,
  ChartNoAxesCombined,
  CircleCheck,
  Clock,
  Component,
  Earth,
  FilePlusCorner,
  HandCoins,
  LayoutDashboard,
  Mails,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AnimatedList } from "@/components/ui/animated-list";
import {
  GripVertical,
  Move,
  Palette,
  Table,
  LayoutGrid,
  StickyNote,
} from "lucide-react";
import { AnimatedListDemo } from "@/components/ui/notifications";
import { motion } from "framer-motion";
import { AnalyticsOverviewChart } from "./analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast, Toaster } from "sonner";

const Solutions = () => {
  const solutions = [
    {
      title: "The Home Board",
      href: "/app/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      description:
        "Your central mission control. A high-level overview of your entire workspace, providing seamless navigation and spatial organization for all your business modules.",
    },
    {
      title: "Digital Storefront",
      href: "/app/website",
      icon: <Earth className="w-5 h-5" />,
      description:
        "Launch a professional presence instantly. We provide the domain and the engine to sell products, update inventory, and connect with global clients directly from your board.",
    },
    {
      title: "Brand Identity",
      href: "/app/brand",
      icon: <Sparkles className="w-5 h-5" />,
      description:
        "A dedicated space for your visual DNA. Manage logos, palettes, and typography. Access a curated market of templates to keep your business aesthetics elite.",
    },
    {
      title: "Client CRM",
      href: "/app/clients",
      icon: <Users className="w-5 h-5" />,
      description:
        "Master your relationships. Track leads, visualize customer journeys, schedule meetings, and analyze client feedback to refine your user experience.",
    },
    {
      title: "Revenue Engine",
      href: "/app/payments",
      icon: <HandCoins className="w-5 h-5" />,
      description:
        "Beyond just payments. Access sticky widgets for POS, revenue forecasting, expense tracking, and automated invoicing for both one-time and subscription models.",
    },
    {
      title: "Secure Vault",
      href: "/app/files",
      icon: <FilePlusCorner className="w-5 h-5" />,
      description:
        "The definitive reference point for your assets. Store contracts, design source files, and business logic in a secure, encrypted environment accessible only to you.",
    },
    {
      title: "Smart Comms",
      href: "/app/email",
      icon: <Mails className="w-5 h-5" />,
      description:
        "Professional mailing on your own domain. Integrated notifications keep you updated on order tracking and payment statuses without ever leaving the Blackboard.",
    },
    {
      title: "Lenzro AI Agent",
      href: "/app/agent",
      icon: <BotMessageSquare className="w-5 h-5" />,
      description:
        "The orchestrator of your business. Lenzro automates page updates, prioritizes your daily tasks, replies to clients, and generates deep-dive reports so you never lose momentum.",
    },
  ];

  // Animated features for Customizable Pages
  const customizableFeatures = [
    {
      icon: <Table className="w-4 h-4 text-green-500" />,
      text: "Add and resize tables",
    },
    {
      icon: <Move className="w-4 h-4 text-blue-500" />,
      text: "Rearrange your data",
    },
    {
      icon: <LayoutGrid className="w-4 h-4 text-purple-500" />,
      text: "Add your cards",
    },
    {
      icon: <GripVertical className="w-4 h-4 text-orange-500" />,
      text: "Move your content around",
    },
    {
      icon: <Palette className="w-4 h-4 text-pink-500" />,
      text: "Change colors",
    },
    {
      icon: <StickyNote className="w-4 h-4 text-yellow-500" />,
      text: "Use our sticky widgets",
    },
  ];

  // Custom cycling logic for 4 visible items
  const [cycleIndex, setCycleIndex] = useState(0);
  const cycleLength = customizableFeatures.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleLength);
    }, 1800);
    return () => clearInterval(interval);
  }, [cycleLength]);

  // Always show 4, cycling through the array in a "wheel" fashion
  const visibleFeatures = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => {
      const idx = (cycleIndex + i) % cycleLength;
      return customizableFeatures[idx];
    });
  }, [cycleIndex, customizableFeatures, cycleLength]);

  const customizable = [
    {
      background: (
        <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
      ),
    },
  ];

  // Fix: correct useState for date
  const [date, setDate] = React.useState(new Date());
  return (
    <section className="w-full px-2 sm:px-4 md:px-8 py-10 flex flex-col items-center">
      <Toaster position="top-center" richColors theme="dark" />
      <div className="w-full max-w-7xl flex flex-col gap-10">
        {/* header */}
        <header className="flex flex-col items-center text-center w-full gap-2">
          <AnimatedGradientText
            speed={2}
            colorFrom="#4ade80"
            colorTo="#06b6d4"
            className="text-2xl md:text-4xl font-semibold tracking-tight"
          >
            What&apos;s in Lenzro?
          </AnimatedGradientText>
          <span className="text-sm md:text-lg text-zinc-500 dark:text-zinc-400">
            Everything you need to launch your business and products on the web.
          </span>
        </header>
        {/* content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Customizable Pages */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between items-start gap-2 transition-colors">
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
              <DotPattern
                glow={true}
                className={cn(
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
              />
              <div className="w-full">
                {/* Header section (unaffected by cycling) */}
                <div
                  className="flex items-center justify-between dark:bg-white/10 text-white
                bg-black backdrop-blur-xl gap-4 rounded-sm p-2 mb-6"
                >
                  {/* Left side dots */}
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-red-400" />
                    <div className="size-2 rounded-full bg-yellow-400" />
                    <div className="size-2 rounded-full bg-green-400" />
                  </div>
                  {/* Right side badge */}
                  <div
                    className="shadow-aceternity mr-2 flex items-center gap-1 rounded-sm px-2 py-1 text-xs "
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <span>Client page</span>
                  </div>
                </div>
                {/* Effortless wheel-like cycling animated list */}
                <div className="flex flex-col items-center justify-center gap-4 h-[120px] relative overflow-hidden">
                  <motion.div
                    key={cycleIndex}
                    initial={false}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {visibleFeatures.map((feature, idx) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center gap-2 justify-center"
                        style={{ height: 30 }}
                      >
                        {feature.icon}
                        <span className="text-sm">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900  mx-auto">
                  <LayoutDashboard className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                  Customizable Pages
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total spatial freedom. Arrange, resize, and filter your business
                data on an infinite canvas. Keep your modules organized exactly
                how you work, with components that snap into place.
              </p>
            </div>
          </div>
          {/* Widgets and Elements */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800  bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between items-start gap-2 transition-colors">
            <div className="bg-background relative flex size-full h-[40vh]  overflow-hidden  ">
              <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
              />
              <div className="flex flex-col gap-2 p-5">
                <Badge
                  className={
                    "bg-green-300/20 text-green-500 border dark:border-white border-gray-300"
                  }
                >
                  <CircleCheck className="" />
                  order completed
                </Badge>
                <Button
                  className={"text-xs h-7 rounded-sm"}
                  onClick={() => toast.success("User created successfully")}
                >
                  <Plus className="size-4" /> new user
                </Button>
              </div>
              <div className="absolute top-25 md:top-25 left-35 md:left-30 origin-top">
                <Badge
                  className={
                    "bg-blue-300/20 text-blue-500 absolute border dark:border-white border-gray-300"
                  }
                >
                  <Clock />
                  Schedule meeting now
                </Badge>
                <Calendar
                  mode="single"
                  selected={new Date(2022, 4, 11, 0, 0, 0)}
                  className="scale-70 md:scale-65 rounded-md border border-gray-400 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900  mx-auto">
                  <Component className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                  Widgets and Elements
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Powerful, reusable tools for your board. Fully editable and
                resizable widgets designed for elite functionality. Access our
                market for specialized templates built to scale your workflow.
              </p>
            </div>
          </div>
          {/* Analytics and Direction */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between items-start gap-2 transition-colors">
            <AnalyticsOverviewChart />
            <div className="flex flex-col items-start gap-2 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900  mx-auto">
                  <ChartNoAxesCombined className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                  Analytics and Direction
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Real-time intelligence and AI-driven growth. Monitor visitors,
                conversions, and revenue with live insights. Lenzro AI analyzes
                your metrics to provide clear direction for your next move.
              </p>
            </div>
          </div>
          {/* Dynamic Solutions */}
          {solutions.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col items-start gap-2 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900  mx-auto">
                  {item.icon}
                </div>
                <h2 className="text-lg text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
