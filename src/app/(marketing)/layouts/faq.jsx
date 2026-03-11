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
      question: "What exactly does Lenzro do?",
      answer: "Lenzro runs your business operations in one system.",
      description: [
        "Instead of switching between Notion, Canva, CRMs, payment tools, calendars, analytics, and AI chat tools, Lenzro connects everything into a single operational workspace.",
        "Your data, tasks, clients, payments, designs, files, and decisions all live on the Blackboard, where AI actively manages and prioritizes work — not just documents it.",
      ],
    },
    {
      id: 2,
      question:
        "How is Lenzro different from Notion or other productivity tools?",
      answer: "Notion organizes information. Lenzro executes operations.",
      comparison: [
        "Notion shows data → Lenzro manages it",
        "Notion stores tasks → Lenzro prioritizes and acts on them",
        "Notion needs manual setup → Lenzro adapts to your business automatically",
      ],
      closing:
        "Lenzro is built for running a business day-to-day, not just writing things down.",
    },
    {
      id: 3,
      question: "Do I need to set everything up manually?",
      answer: "No. Lenzro is designed to reduce setup, not increase it.",
      description: [
        "When you create pages, widgets, or upload files:",
        "The AI understands what they are",
        "Suggests where they belong",
        "Connects them to clients, payments, tasks, or deadlines automatically",
        "You can customize everything — but you’re never starting from zero.",
      ],
    },
    {
      id: 4,
      question: "What kind of businesses is Lenzro built for?",
      answer:
        "Lenzro adapts to how you run your business, not the other way around.",
      list: [
        "Freelancers & consultants",
        "Agencies & studios",
        "E-commerce brands",
        "Startups & small teams",
        "Service-based businesses",
      ],
      closing:
        "Because pages, schemas, and widgets are flexible, Lenzro molds itself to your workflow instead of forcing templates on you.",
    },
    {
      id: 5,
      question: "What does the AI actually do day to day?",
      answer:
        "The AI in Lenzro doesn’t just answer questions — it takes responsibility.",
      list: [
        "Organize your Blackboard automatically",
        "Highlight overdue tasks or missed follow-ups",
        "Prioritize what matters today",
        "Suggest next actions based on real data",
        "Notify you when something needs attention",
      ],
      closing:
        "Think of it as an operations manager living inside your workspace.",
    },
    {
      id: 6,
      question: "Is my business data safe and private?",
      answer: "Yes. You own your data — always.",
      list: [
        "Your workspace is isolated and secure",
        "AI actions are permission-based and auditable",
        "You control what the AI can see and do",
        "No data is shared across accounts",
      ],
      closing: "Lenzro is built for businesses, not experiments.",
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
          <Button
            variant="ghost"
            className="md:w-full px-5 py-2 text-sm h-10 rounded-sm cursor-pointer transition-all duration-300 border"
          >
            View Docs
          </Button>
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
