// docs-registry.js — maps each slug to its JSX content component + metadata.
// "route" is the full path; "slug" is the segment after /docs/

import IntroductionContent from "@/app/(marketing)/docs/content/intro";
import WhatIsLenzroContent from "@/app/(marketing)/docs/content/what-is-lenzro";
import WhyLenzroContent from "@/app/(marketing)/docs/content/why-lenzro";
import CoreConceptsContent from "@/app/(marketing)/docs/content/core-concepts";
import HowDifferentContent from "@/app/(marketing)/docs/content/how-lenzro-is-different";
import OurTeamContent from "@/app/(marketing)/docs/content/our-lenzro-team";
import CreateWorkspaceContent from "@/app/(marketing)/docs/content/create-workspace";
import BlackboardContent from "@/app/(marketing)/docs/content/blackboard";
import PagesStructureContent from "@/app/(marketing)/docs/content/pages-structure";
import WidgetsContent from "@/app/(marketing)/docs/content/widgets";
import EdgePanelContent from "@/app/(marketing)/docs/content/edge-panel";
import AiAssistantContent from "@/app/(marketing)/docs/content/ai-assistant";

// Ordered flat list of all docs — used for prev/next linking and routing.
const allDocs = [
  {
    slug: "introduction",
    route: "/docs",
    title: "Introduction",
    description:
      "Lenzro is an intelligent workspace designed to run your entire business from one place.",
    Component: IntroductionContent,
    toc: [
      { id: "what-is-lenzro", title: "What is Lenzro", depth: 0 },
      { id: "who-this-is-for", title: "Who This Is For", depth: 0 },
      { id: "what-youll-learn", title: "What You'll Learn", depth: 0 },
      {
        id: "how-docs-are-organized",
        title: "How the Docs Are Organized",
        depth: 0,
      },
      { id: "next-steps", title: "Next Steps", depth: 0 },
    ],
  },
  {
    slug: "what-is-lenzro",
    route: "/docs/what-is-lenzro",
    title: "What is Lenzro",
    description: "An overview of the Lenzro platform and its core vision.",
    Component: WhatIsLenzroContent,
    toc: [
      { id: "overview", title: "Overview", depth: 0 },
      { id: "key-features", title: "Key Features", depth: 0 },
      { id: "the-unified-workspace", title: "The Unified Workspace", depth: 0 },
    ],
  },
  {
    slug: "why-lenzro",
    route: "/docs/why-lenzro",
    title: "Why Lenzro",
    description: "The problems Lenzro solves and the benefits it brings.",
    Component: WhyLenzroContent,
    toc: [
      { id: "the-problem", title: "The Problem", depth: 0 },
      { id: "benefits", title: "Benefits", depth: 0 },
      { id: "use-cases", title: "Use Cases", depth: 0 },
    ],
  },
  {
    slug: "core-concepts",
    route: "/docs/core-concepts",
    title: "Core Concepts",
    description: "Fundamental principles and ideas behind the Lenzro platform.",
    Component: CoreConceptsContent,
    toc: [
      { id: "principles", title: "Principles", depth: 0 },
      { id: "workspaces", title: "Workspaces", depth: 0 },
      { id: "canvas-model", title: "Canvas Model", depth: 0 },
    ],
  },
  {
    slug: "how-lenzro-is-different",
    route: "/docs/how-lenzro-is-different",
    title: "How Lenzro is Different",
    description: "How Lenzro compares to other tools on the market.",
    Component: HowDifferentContent,
    toc: [
      { id: "comparison", title: "Comparison", depth: 0 },
      { id: "unique-advantages", title: "Unique Advantages", depth: 0 },
    ],
  },
  {
    slug: "our-lenzro-team",
    route: "/docs/our-lenzro-team",
    title: "Our Lenzro Team",
    description: "The team and culture behind building Lenzro.",
    Component: OurTeamContent,
    toc: [
      { id: "team-members", title: "Team Members", depth: 0 },
      { id: "culture", title: "Culture & Values", depth: 0 },
    ],
  },
  {
    slug: "create-workspace",
    route: "/docs/create-workspace",
    title: "Create Your Workspace",
    description: "How to set up and configure your first Lenzro workspace.",
    Component: CreateWorkspaceContent,
    toc: [
      { id: "workspace-types", title: "Workspace Types", depth: 0 },
      { id: "setup-steps", title: "Setup Steps", depth: 0 },
      { id: "inviting-members", title: "Inviting Members", depth: 0 },
    ],
  },
  {
    slug: "blackboard",
    route: "/docs/blackboard",
    title: "The Blackboard",
    description: "The infinite canvas at the heart of Lenzro.",
    Component: BlackboardContent,
    toc: [
      {
        id: "what-is-the-blackboard",
        title: "What is the Blackboard",
        depth: 0,
      },
      { id: "canvas-tools", title: "Canvas Tools", depth: 0 },
      { id: "spatial-layout", title: "Spatial Layout", depth: 0 },
    ],
  },
  {
    slug: "pages-structure",
    route: "/docs/pages-structure",
    title: "Pages & Structure",
    description: "How to create and organize pages inside your workspace.",
    Component: PagesStructureContent,
    toc: [
      { id: "creating-pages", title: "Creating Pages", depth: 0 },
      { id: "nesting-pages", title: "Nesting Pages", depth: 0 },
      { id: "schemas", title: "Schemas & Fields", depth: 0 },
    ],
  },
  {
    slug: "widgets",
    route: "/docs/widgets",
    title: "Widgets",
    description: "Reusable building blocks you place on your Blackboard.",
    Component: WidgetsContent,
    toc: [
      { id: "widget-types", title: "Widget Types", depth: 0 },
      { id: "adding-widgets", title: "Adding Widgets", depth: 0 },
      { id: "configuring-widgets", title: "Configuring Widgets", depth: 0 },
    ],
  },
  {
    slug: "edge-panel",
    route: "/docs/edge-panel",
    title: "Edge Panel",
    description:
      "The persistent side panel for quick access to tools and context.",
    Component: EdgePanelContent,
    toc: [
      { id: "panel-overview", title: "Panel Overview", depth: 0 },
      { id: "panel-features", title: "Panel Features", depth: 0 },
    ],
  },
  {
    slug: "ai-assistant",
    route: "/docs/ai-assistant",
    title: "Your AI Assistant",
    description:
      "How Lenzro's AI assistant helps manage your workspace intelligently.",
    Component: AiAssistantContent,
    toc: [
      { id: "capabilities", title: "Capabilities", depth: 0 },
      { id: "how-it-works", title: "How It Works", depth: 0 },
      { id: "ai-actions", title: "AI Actions", depth: 0 },
    ],
  },
];

// Build a lookup map: slug → enriched doc entry (with prev/next)
const registryMap = {};

allDocs.forEach((doc, index) => {
  registryMap[doc.slug] = {
    ...doc,
    prev:
      index > 0
        ? { title: allDocs[index - 1].title, route: allDocs[index - 1].route }
        : null,
    next:
      index < allDocs.length - 1
        ? { title: allDocs[index + 1].title, route: allDocs[index + 1].route }
        : null,
  };
});

/**
 * Get a single doc entry by its URL slug.
 * The "introduction" slug maps to the /docs index page.
 */
export function getDocBySlug(slug) {
  return registryMap[slug] || null;
}

/** Get all slugs (for generateStaticParams) */
export function getAllDocSlugs() {
  return allDocs
    .filter((d) => d.slug !== "introduction")
    .map((d) => ({ slug: d.slug }));
}

/** Get the introduction entry */
export function getIntroDoc() {
  return registryMap["introduction"];
}
