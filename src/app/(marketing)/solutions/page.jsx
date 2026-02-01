"use client";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Calendar } from "@/components/ui/calendar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  BellIcon,
  Brain,
  CircleCheckBig,
  FileTextIcon,
  GlobeIcon,
  LayoutDashboard,
  Network,
  Layers,
  Users,
  BarChart3,
  Video,
  Code,
  Phone,
  Zap,
  Building,
  CalendarDays,
  TrendingUp,
  UserCheck,
  Palette,
  Settings,
} from "lucide-react";
import React, { useRef, forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import ConnectedWorkflow from "./connectedworkflow";
import { AnalyticsOverviewChart } from "../layouts/analytics";
import { AnimatedListDemo } from "@/components/ui/notifications";

const Solutions = () => {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // Refs for connected workflow
  const meetingRef = useRef(null);
  const codeReviewRef = useRef(null);
  const supportRef = useRef(null);
  const centerRef = useRef(null);
  const notionRef = useRef(null);
  const zapRef = useRef(null);
  const slackRef = useRef(null);
  const aiRef = useRef(null);

  const problems = [
    {
      Icon: Network,
      name: "Too many disconnected tools",
      description:
        "Businesses rely on multiple apps for branding, design, communication, storage, analytics, and management — none of which truly work together.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      Icon: Layers,
      name: "Work is scattered and context is lost",
      description:
        "Information lives in different places, making it hard to understand what matters, what's urgent, and what needs action.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      Icon: Users,
      name: "Manual coordination drains teams",
      description:
        "People spend more time reminding, checking, updating, and chasing than actually building or growing the business.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      Icon: BarChart3,
      name: "Data without action",
      description:
        "Dashboards show numbers, but nothing happens automatically. Insights don't turn into decisions or execution.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  const features = [
    {
      Icon: LayoutDashboard,
      name: "Run daily operations",
      description:
        "Tasks, orders, clients, payments — all in one dashboard. AI monitors progress automatically.",
      href: "/",
      cta: "Learn more",
      className:
        "row-span-2 md:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-5",
      background: (
        <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-8 md:left-20 origin-top scale-90 sm:scale-95 md:scale-90 rounded-md w-full transition-all duration-300 ease-out group-hover:scale-100">
          <FieldGroup className="max-w-sm flex flex-col">
            <Field orientation="horizontal">
              <CircleCheckBig className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Label htmlFor="terms-checkbox" className="text-xs sm:text-sm">
                Tasks, orders, clients, payments
              </Label>
            </Field>
            <Field orientation="horizontal">
              <LayoutDashboard className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Label htmlFor="terms-checkbox" className="text-xs sm:text-sm">
                No dashboards to maintain
              </Label>
            </Field>
            <Field orientation="horizontal">
              <Brain className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Label htmlFor="terms-checkbox" className="text-xs sm:text-sm">
                AI monitors progress
              </Label>
            </Field>
          </FieldGroup>
        </div>
      ),
    },
    {
      Icon: TrendingUp,
      name: "Understand what's happening",
      description:
        "Live analytics, revenue tracking, and smart summaries — see the whole business in one place.",
      href: "/",
      cta: "Learn more",
      className:
        "row-span-2 md:col-span-1 lg:row-start-1 lg:row-end-6 lg:col-start-2 lg:col-end-3",
      background: (
        <AnalyticsOverviewChart className="absolute top-4 sm:top-6 md:top-10 left-0 origin-top scale-[0.6] sm:scale-[0.65] md:scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
      ),
    },
    {
      Icon: Users,
      name: "Work as a team without friction",
      description:
        "Shared workspace, role-based access, and AI keeps everyone aligned. Built for remote teams.",
      href: "/",
      cta: "Learn more",
      className:
        "md:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-5 lg:row-end-7",
    },
    {
      Icon: Palette,
      name: "Brand, design, and publish",
      description:
        "Canva-style branding canvas, website management, and assets in one place. Built for creators.",
      href: "/",
      cta: "Learn more",
      className:
        "md:col-span-1 lg:col-start-3 lg:col-end-3 lg:row-start-5 lg:row-end-7",
      background: <div></div>,
    },
    {
      Icon: BellIcon,
      name: "Business Alerts",
      description:
        "Get important business notifications and automated updates that matter.",
      href: "/",
      cta: "Learn more",
      className:
        "row-span-2 md:col-span-1 lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-5",
      background: (
        <AnimatedListDemo className="absolute top-4 right-2 h-[250px] sm:h-[280px] md:h-[300px] w-full scale-[0.65] sm:scale-[0.7] md:scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
      ),
    },
    {
      Icon: UserCheck,
      name: "Manage clients & relationships",
      description:
        "Client pages with history, files, and payments. AI handles follow-ups and context-aware replies.",
      href: "/",
      cta: "Learn more",
      className:
        "md:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-7 lg:row-end-9",
      background: <div></div>,
    },
    {
      Icon: CalendarDays,
      name: "Organize tasks & meetings",
      description:
        "Calendar-driven workflow. Deadlines, meetings, and follow-ups managed automatically.",

      href: "/",
      cta: "Learn more",
      className:
        "row-span-2 md:col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-6 lg:row-end-9",
      background: (
        <Calendar
          mode="single"
          selected={new Date(2022, 4, 11, 0, 0, 0)}
          className="absolute top-4 sm:top-6 md:top-10 left-0 sm:left-4 md:left-8 origin-top scale-[0.6] sm:scale-[0.7] md:scale-80 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-85"
        />
      ),
    },
    {
      Icon: Settings,
      name: "Automate without losing control",
      description:
        "AI actions with clear boundaries. Manual + automated steps with full visibility on decisions.",
      href: "/",
      cta: "Learn more",
      className:
        "md:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-7 lg:row-end-9",
      background: <div></div>,
    },
  ];
  return (
    <div className="pt-25 px-5 flex flex-col  items-center">
      <div className="text-center space-y-2 w-full">
        <div className="relative space-y-4 px-4">
          <h1 className="text-4xl md:text-4xl lg:text-5xl">
            Most businesses today don't have a{" "}
            <br className="hidden sm:block" />
            <AnimatedGradientText
              speed={2}
              colorFrom="#4ade80"
              colorTo="#06b6d4"
              className="font-semibold tracking-tight"
            >
              software problem.
            </AnimatedGradientText>{" "}
          </h1>
          <p className="text-center MPlusOne text-xs md:text-sm text-neutral-300 relative z-20 px-4">
            They have a coordination problem.
            <br />
          </p>
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
      </div>

      {/* Problems visualization */}
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((item, idx) => (
            <Card
              className={`bg-transparent flex flex-col justify-between shadow-none hover:${item.bgColor} p-3`}
              key={idx}
            >
              <div className="border  flex items-center justify-center rounded-full w-fit p-2">
                <item.Icon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg">{item.name}</h1>
                <p className="text-xs mt-2 text-gray-500 font-light">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Solution visulaitons */}
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="text-center md:mb-10 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            How We Solve Coordination Problems
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base px-4">
            Our platform brings everything together in one place, so your team
            can focus on what matters.
          </p>
        </div>

        {/* the image details should go there  */}

        <div className="relative w-full overflow-x-auto custom-scrollbar">
          <div className="relative" style={{ minWidth: "1200px" }}>
            <ConnectedWorkflow />
            <GridPattern
              width={20}
              height={20}
              x={-1}
              y={-1}
              strokeDasharray={"2 2"}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              )}
            />
          </div>
        </div>

        {/* solution cards */}
        {/* card one: Run daily operations */}
        <div className="mt-10 grid w-full auto-rows-[8rem] sm:auto-rows-[8rem] md:auto-rows-[10rem] lg:auto-rows-[5rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const {
              name,
              description,
              Icon,
              background,
              className,
              href,
              cta,
            } = feature;
            return (
              <div
                key={name}
                className={cn(
                  "group relative col-span-1 flex flex-col justify-end overflow-hidden rounded-lg",
                  // light styles
                  "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_1px_2px_rgba(0,0,0,.05),0_6px_12px_rgba(0,0,0,.05)]",
                  // dark styles
                  "dark:bg-background transform-gpu dark:[box-shadow:0_-10px_40px_-10px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
                  className,
                )}
              >
                {background && (
                  <div className="absolute inset-0">{background}</div>
                )}
                <div className="relative z-10 p-4 sm:p-5 md:p-6">
                  <div className="pointer-events-none flex transform-gpu flex-col gap-1.5 sm:gap-2 transition-all duration-300">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 origin-left transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      {name}
                    </h3>
                    <p className="max-w-md text-xs sm:text-sm text-neutral-400">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-7xl mx-auto pt-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-neutral-900 to-black p-8 md:p-16 overflow-hidden">
          {/* Background Pattern */}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
            )}
          />

          <div className="relative z-10 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-purple-500/10 border border-purple-500/50 text-purple-400 hover:border-purple-500 transition-colors cursor-pointer">
                Starter
              </span>
              <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-green-500/10 border border-green-500/50 text-green-400 hover:border-green-500 transition-colors cursor-pointer">
                Growth
              </span>
              <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-orange-500/10 border border-orange-500/50 text-orange-400 hover:border-orange-500 transition-colors cursor-pointer">
                Operations
              </span>
              <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-blue-500/10 border border-blue-500/50 text-blue-400 hover:border-blue-500 transition-colors cursor-pointer">
                Company
              </span>
              <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-violet-500/10 border border-violet-500/50 text-violet-400 hover:border-violet-500 transition-colors cursor-pointer">
                Enterprise
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Ready to transform your business?
            </h2>

            {/* Description */}
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl">
              Join teams that are already running smarter with Lenzro. Start
              with any plan and scale as you grow.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 px-6 sm:px-8 text-sm"
            >
              Get Started Free
            </Button>
          </div>

          {/* Optional: Add decorative element on the right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-900 to-purple-800 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* cta section */}
      <div></div>
    </div>
  );
};

export default Solutions;
