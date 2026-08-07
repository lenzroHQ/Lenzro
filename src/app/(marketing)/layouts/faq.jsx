"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ChevronDown } from "lucide-react";
import React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const lenzroFAQ = [
    {
      id: 1,
      question: "What does Lenzro do?",
      answer:
        "We design and build custom software for real businesses — websites, SaaS platforms, and internal systems.",
      description: [
        "From your first landing page to a full production system, Lenzro handles the strategy, design, and engineering end-to-end.",
        "We've shipped car rental platforms, healthcare booking systems, nonprofit sites, and fleet management dashboards — all built to run your actual operations, not just look good.",
      ],
    },
    {
      id: 2,
      question:
        "How is working with Lenzro different from a template or no-code builder?",
      answer: "Templates get you a page. Lenzro gets you a system.",
      comparison: [
        "Template builders → a static site you outgrow fast",
        "No-code tools → limited to what the platform allows",
        "Lenzro → custom-built software that fits your business, not the other way around",
      ],
      closing:
        "Every project is built from scratch with real code, so it scales as your business does.",
    },
    {
      id: 3,
      question: "What kind of projects do you take on?",
      answer: "Anything from a marketing website to a full SaaS product.",
      list: [
        "Website Redesign",
        "Online Presence (Maps, socials, business email, ads)",
        "Website Development",
        "SaaS Application Creation",
        "Mobile Development",
      ],
      closing:
        "If it needs a website, a system, or an app to run your business — we build it.",
    },
    {
      id: 4,
      question: "What tech stack do you use?",
      answer: "Whatever's the right fit for the project — usually one of these.",
      list: [
        "Next.js with Supabase or PostgreSQL for modern web apps and SaaS",
        "MERN (MongoDB, Express, React, Node.js) for larger systems and dashboards",
        "Tailwind CSS for fast, clean, responsive design",
      ],
      closing:
        "We pick the stack based on what your business actually needs, not what's trendy.",
    },
    {
      id: 5,
      question: "How long does a project take, and what's the budget?",
      answer:
        "It depends on scope, but most projects run a few weeks to a few months.",
      description: [
        "A redesign or marketing site is usually the fastest to ship.",
        "A full SaaS platform or custom system takes longer, since it involves real architecture and testing.",
      ],
      closing:
        "Tell us your budget and timeline in the contact form and we'll scope it honestly — no inflated quotes.",
    },
    {
      id: 6,
      question: "Do you support the project after it launches?",
      answer: "Yes — we don't disappear after handoff.",
      list: [
        "Bug fixes and small updates",
        "Ongoing feature development",
        "Hosting, database, and infrastructure support",
      ],
      closing: "Most of our client relationships continue well past launch.",
    },
  ];

  return (
    <div className="flex flex-col md:gap-[5rem]  px-4 py-10 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center leading-tight">
            Frequently Asked{" "}
            <AnimatedGradientText
              speed={2}
              colorFrom="#4ade80"
              colorTo="#06b6d4"
              className="font-semibold tracking-tight"
            >
              Questions
            </AnimatedGradientText>
          </h2>
          <p className=" text-xs md:text-sm">
            Find all your doubts and questions in one place. Still couldn&apos;t
            find <br />
            what you&apos;re looking for?
          </p>
        </div>
        <div className="flex gap-5 items-center justify-center ">
          <Button className="md:w-full px-5 py-2 text-sm h-10 rounded-sm cursor-pointer transition-all duration-300 border">
            Contact Us
          </Button>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="mt-10 space-y-6 relative group">
        {/* Overlay to open FAQ from anywhere in the main div */}
        <button
          className="absolute inset-0 z-10 opacity-0 cursor-pointer group-hover:opacity-10 transition-opacity duration-300"
          aria-label="Open FAQ anywhere"
          onClick={() => setOpenIndex(0)}
        />
        {lenzroFAQ.map((item, idx) => (
          <Collapsible
            key={item.id}
            open={openIndex === idx}
            onOpenChange={(isOpen) => setOpenIndex(isOpen ? idx : null)}
            className="border-b border-zinc-800 pb-4 relative z-20"
          >
            <CollapsibleTrigger className="flex items-center cursor-pointer justify-between w-full text-left text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">
              {item.question}
              <ChevronDown
                className={`w-4 h-4 opacity-70 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
              />
            </CollapsibleTrigger>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <CollapsibleContent asChild>
                  <motion.div
                    key="faq-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden mt-3 text-sm text-zinc-400 space-y-2"
                  >
                    <p className="text-sm text-white">{item.answer}</p>
                    {item.description && (
                      <ul className="list-disc text-xs pl-5 space-y-1">
                        {item.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    )}
                    {item.comparison && (
                      <ul className="list-none text-xs pl-0 space-y-1">
                        {item.comparison.map((line, i) => (
                          <li key={i} className="text-zinc-300">
                            • {line}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.list && (
                      <ul className="list-disc text-xs pl-5 space-y-1">
                        {item.list.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {item.closing && (
                      <p className="text-sm text-zinc-500 pt-2">
                        {item.closing}
                      </p>
                    )}
                  </motion.div>
                </CollapsibleContent>
              )}
            </AnimatePresence>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
