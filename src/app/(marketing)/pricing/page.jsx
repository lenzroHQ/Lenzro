"use client";
import { AuroraText } from "@/components/ui/aurora-text";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircleCheck, Dot } from "lucide-react";
import { HyperText } from "@/components/ui/hyper-text";
import { CapabilityTable } from "@/components/ui/capability-table";

const Pricing = () => {
  // Pricing toggle (monthly/yearly)
  const [billing, setBilling] = useState("monthly");

  // Pricing data array
  const plans = [
    {
      name: "Starter",
      color: "green",
      subtitle: "For individuals & early builders",
      highlight: false,
      description: "Replace Notion + basic task tools",
      price: { monthly: 19, yearly: 182, yearlyLabel: "save $46 — 20% off" },
      includes: [
        "Single Blackboard workspace",
        "Notes, Todos, Tables, Calendar widgets",
        "Files & Docs",
        "Basic client list",
        "Manual dashboards",
        "AI suggestions (non-autonomous)",
        "Email & Google auth",
        "Notifications",
        "1–2 users",
      ],
    },
    {
      name: "Growth",
      color: "blue",
      subtitle: "For small teams & startups",
      highlight: true,
      highlightLabel: "Most popular",
      description: "Replace Notion + CRM + basic analytics",
      price: { monthly: 49, yearly: 470, yearlyLabel: "save $118" },
      includes: [
        "Everything in Starter, plus",
        "Multiple pages & schemas",
        "Clients & CRM widgets",
        "Orders & payments tracking",
        "Analytics widgets",
        "Branding canvas (Canva-like)",
        "Edge Panel (quick tools & actions)",
        "AI-assisted organization",
        "Smart reminders & alerts",
        "Up to 5 users",
      ],
    },
    {
      name: "Operations",
      color: "purple",
      subtitle: "For serious businesses",
      highlight: false,
      description: "Replace dashboards, ops tools, AI assistants",
      price: { monthly: 99, yearly: 950, yearlyLabel: "save $238" },
      includes: [
        "Everything in Growth, plus",
        "AI Workspace Director",
        "Auto-layout on the Blackboard",
        "Smart priority engine",
        "Semantic search across all data",
        "Advanced calendar (meetings, clients, tasks)",
        "Multiple payment methods per client",
        "Website & page management",
        "Role-based access (Admin / Ops / Viewer)",
        "Up to 15 users",
        "This is where Lenzro starts running things for you.",
      ],
    },
    {
      name: "Company",
      color: "orange",
      subtitle: "For multi-team organizations",
      highlight: false,
      description: "Replace internal tools + coordination software",
      price: { monthly: 249, yearly: 2390, yearlyLabel: "save $598" },
      includes: [
        "Everything in Operations, plus",
        "Multiple workspaces (departments)",
        "Shared & private Blackboards",
        "Cross-team analytics",
        "Advanced permissions",
        "Custom schemas & workflows",
        "AI-driven restructuring & cleanup",
        "Activity logs & auditing",
        "Up to 50 users",
      ],
    },
    {
      name: "Enterprise",
      color: "red",

      subtitle: "For complex & regulated systems",
      highlight: false,
      description: "Custom operations at scale",
      price: {
        monthly: "Custom",
        yearly: "Custom",
        yearlyLabel: "20%+ negotiated",
      },
      includes: [
        "Custom AI behavior & rules",
        "Dedicated infrastructure",
        "Private cloud / on-prem options",
        "Advanced security & compliance",
        "SLA & priority support",
        "Custom integrations",
        "AI action approval flows",
        "Unlimited users",
      ],
    },
  ];

  // Card button text by plan
  const getButton = (plan) => {
    if (plan.name === "Enterprise")
      return (
        <button className="w-full mt-6 rounded-lg border border-neutral-700 bg-black text-white py-2 font-medium">
          Contact sales
        </button>
      );
    if (plan.name === "Growth")
      return (
        <button className="w-full mt-6 rounded-lg bg-brand/80 text-white py-2 font-medium">
          Start for free
        </button>
      );
    if (plan.name === "Starter")
      return (
        <button className="w-full mt-6 rounded-lg border border-neutral-700 bg-black text-white py-2 font-medium">
          Start building
        </button>
      );
    return (
      <button className="w-full mt-6 rounded-lg border border-neutral-700 bg-black text-white py-2 font-medium">
        Get started
      </button>
    );
  };

  // Pricing toggle (monthly/yearly)
  return (
    <div className="pt-25 px-5 flex relative flex-col gap-10 items-center">
      <div className="flex flex-col relative items-center justify-center gap-5">
        <div className="text-center  space-y-2 w-full">
          <h1 className=" text-3xl md:text-4xl lg:text-5xl">
            Choose The Perfect Plan That Fits <br /> Your{" "}
            <span className="gradient-text">Business Goals</span>
          </h1>
          <p className="text-center MPlusOne text-xs md:text-sm  text-neutral-300 relative z-20">
            Whether you&apos;re just a startup or an Enterprise business ,
            Lenzro offers flexible <br /> pricing plans tailored to your needs.
          </p>
        </div>
        <div className="relative mt-5 flex items-center gap-4 w-fit rounded-xl bg-gray-50 p-2 dark:bg-neutral-800">
          <div
            style={{
              "--pattern-fg":
                "color-mix(in oklab, var(--color-neutral-400) 30%, transparent)",
              backgroundImage:
                "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
            }}
            className="absolute inset-0 z-10 m-auto h-full w-full rounded-lg border border-(--pattern-fg) bg-gray-500 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] dark:bg-neutral-900 opacity-50"
          ></div>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute z-20 h-[80%] w-32 sm:w-40 rounded-md bg-black dark:bg-neutral-950"
            style={{
              left: billing === "monthly" ? 8 : "calc(50% + 8px)",
              top: "10%",
            }}
          />

          <button
            className="relative z-30 flex w-32 justify-center py-1 text-center sm:w-40"
            onClick={() => setBilling("monthly")}
          >
            <span
              className={`relative z-20 flex items-center gap-2 text-sm sm:text-base ${
                billing === "monthly" ? "text-white" : "text-neutral-100"
              }`}
            >
              Monthly
            </span>
          </button>
          <button
            className="relative z-30 flex w-32 justify-center py-1 text-center sm:w-40"
            onClick={() => setBilling("yearly")}
          >
            <span
              className={`relative z-20 flex items-center gap-2 text-sm sm:text-base ${
                billing === "yearly" ? "text-white" : "text-neutral-100"
              }`}
            >
              Yearly
              <span className="bg-green-500/10 text-green-500 rounded-full px-2 py-1 text-xs font-medium">
                Save 20%
              </span>
            </span>
          </button>
        </div>
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
        />
      </div>

      {/* Pricing Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mt-10">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={
              `relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 shadow-sm transition-all duration-300` +
              (plan.highlight ? "border border-green-500" : "")
            }
          >
            {/* Highlight badge */}
            {plan.highlight && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                {plan.highlightLabel}
              </span>
            )}
            {/* Icon & Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-semibold tracking-wide text-neutral-900 dark:text-white">
                {plan.name}
              </span>
            </div>
            <div className="text-sm text-neutral-500 mb-1">
              {plan.subtitle}
            </div>
            <div className="text-xs text-neutral-400 mb-4">
              {plan.description}
            </div>
            {/* Pricing */}
            <div className="my-6 flex items-center gap-2">
              <HyperText
                key={billing + plan.name} // re-mounts on billing switch only
                className="text-xl font-bold text-neutral-900 dark:text-white"
                duration={1400} // slower animation
                delay={0}
                startOnView={false}
                animateOnHover={false}
              >
                {plan.price[billing] === "Custom"
                  ? "Custom"
                  : `$${plan.price[billing]}`}
              </HyperText>
              {plan.price[billing] !== "Custom" && (
                <span className="text-sm text-neutral-500 font-medium">
                  / {billing === "monthly" ? "month" : "year"}
                </span>
              )}
              {plan.price[billing] === "Custom" && (
                <span className="ml-2 text-xs text-green-600 font-medium">
                  {plan.price.yearlyLabel}
                </span>
              )}
            </div>
            {/* Button */}
            <div className="mt-3">
              {plan.name === "Enterprise" ? (
                <button className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white py-2 font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  Contact sales
                </button>
              ) : plan.name === "Growth" ? (
                <button className="w-full rounded-lg bg-green-500/30 border border-green-500 text-white py-2 font-medium transition-300 duration-500 hover:bg-green-600">
                  Start for free
                </button>
              ) : plan.name === "Starter" ? (
                <button className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white py-2 font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  Start building
                </button>
              ) : (
                <button className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white py-2 font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  Get started
                </button>
              )}
            </div>
            {/* Features */}
            <ul className="mt-5 space-y-3 text-base text-neutral-800 dark:text-neutral-200">
              {plan.includes.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Dot className="size-4" />
                  <span className="text-xs">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-full px-5 mt-5">
        <CapabilityTable />
      </div>
    </div>
  );
};

export default Pricing;
