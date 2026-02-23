"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Kbd } from "@/components/ui/kbd";
import { Input } from "@/components/ui/input";
import { CommandDialog } from "../ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FileText } from "lucide-react";
import { useSearchStore } from "@/app/store/searchStore";

import { docs } from "@/lib/constants";

// Example documentation structure

// Utility to flatten nested docs
function flattenDocs(docs) {
  return docs.flatMap(
    (section) =>
      section.children?.map((child) => ({
        section: section.title,
        title: child.title,
        route: child.route,
      })) || [],
  );
}

// Example usage in your component
const flatDocs = flattenDocs(docs);

export function SearchBarWithShortcut({ mobileTrigger = false }) {
  const {
    desktopOpen,
    mobileOpen,
    query,
    setDesktopOpen,
    setMobileOpen,
    setQuery,
    reset,
  } = useSearchStore();
  const router = useRouter();

  // Ctrl+K only for large screens
  useEffect(() => {
    const down = (e) => {
      if (window.innerWidth >= 1024) {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setDesktopOpen(!desktopOpen);
        }
      }
      if (e.key === "Escape") {
        reset();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [desktopOpen, setDesktopOpen, reset]);

  // Show only parent sections if query is empty
  const showParents = query.trim() === "";

  // For scrolling, show at least 7 items, rest scrollable
  const maxVisible = 7;

  // Parent section rendering
  const parentResults = (
    <div className="mt-4 px-2 max-h-72 overflow-y-auto">
      {docs.length === 0 ? (
        <div className="p-2 text-sm text-gray-500">No sections found.</div>
      ) : (
        docs.slice(0, maxVisible).map((section) => (
          <button
            key={section.title}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted rounded text-sm"
            // Optionally, you can expand/collapse or show children on click
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{section.title}</span>
          </button>
        ))
      )}
      {/* Show rest if more than maxVisible */}
      {docs.length > maxVisible &&
        docs.slice(maxVisible).map((section) => (
          <button
            key={section.title}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted rounded text-sm"
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{section.title}</span>
          </button>
        ))}
    </div>
  );

  // Child (filtered) rendering
  const filteredDocs = flatDocs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.section.toLowerCase().includes(query.toLowerCase()),
  );

  const childResults = (
    <div className="mt-4 px-2 max-h-72 overflow-y-auto">
      {filteredDocs.length === 0 ? (
        <div className="p-2 text-sm text-gray-500">No results found.</div>
      ) : (
        filteredDocs.slice(0, maxVisible).map((doc) => (
          <button
            key={doc.route}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted rounded text-sm"
            onClick={() => {
              reset();
              router.push(doc.route);
            }}
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{doc.title}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {doc.section}
            </span>
          </button>
        ))
      )}
      {/* Show rest if more than maxVisible */}
      {filteredDocs.length > maxVisible &&
        filteredDocs.slice(maxVisible).map((doc) => (
          <button
            key={doc.route}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted rounded text-sm"
            onClick={() => {
              reset();
              router.push(doc.route);
            }}
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{doc.title}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {doc.section}
            </span>
          </button>
        ))}
    </div>
  );

  return (
    <>
      {/* Desktop trigger */}
      {!mobileTrigger && (
        <button
          onClick={() => setDesktopOpen(true)}
          className="flex items-center justify-between w-[300px] px-4 py-2 text-sm text-muted-foreground border rounded-md bg-background"
        >
          <span>Search documentation...</span>
          <Kbd>⌘K</Kbd>
        </button>
      )}

      {/* Desktop CommandDialog */}
      <div className="hidden lg:block">
        <CommandDialog open={desktopOpen} onOpenChange={setDesktopOpen}>
          {/* Custom header with tags and Esc only */}
          <div className="flex items-center justify-between  px-4 pt-4 pb-2 border-b">
            <div className="flex gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded
               px-2 py-1">
                Search our Documentation
              </span>
            </div>
          </div>

          {/* Search input */}
          <div className="relative px-4 pt-4">
            <Input
              placeholder="What are you searching for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm placeholder:text-sm placeholder:text-gray-400 pr-16"
            />
          </div>

          {/* Results list: show parents or children */}
          <div className="mt-4 px-4 pb-4">
            {showParents ? parentResults : childResults}
          </div>
        </CommandDialog>
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Search Docs</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <Input
                placeholder="What are you searching for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm placeholder:text-sm placeholder:text-gray-400"
              />
              {showParents ? parentResults : childResults}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
