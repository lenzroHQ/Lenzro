"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Monitor,
  Search,
  Eye,
  Scissors,
  Copy,
  Clipboard,
  CaseSensitive,
  Share2,
  Trash2,
  ArrowUpDown,
  LayoutGrid,
  MoreHorizontal,
} from "lucide-react";

const TABS = ["Home", "Secured", "Assets", "Archived"];

const DEFAULT_FOLDERS = [
  { name: "Invoices" },
  { name: "Contracts" },
  { name: "Closet" },
  { name: "Assets" },
  { name: "Reports" },
  { name: "Templates" },
];

/** /app/[workspace]/files */
export default function FilesPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [openFolder, setOpenFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const clickTimers = useRef({});

  const handleFolderClick = (name) => {
    // Double-click detection
    if (clickTimers.current[name]) {
      clearTimeout(clickTimers.current[name]);
      delete clickTimers.current[name];
      // Double click → open
      setOpenFolder(name);
      setSelectedFolder(null);
    } else {
      clickTimers.current[name] = setTimeout(() => {
        delete clickTimers.current[name];
        // Single click → select
        setSelectedFolder((prev) => (prev === name ? null : name));
      }, 250);
    }
  };

  const hasSelection = !!selectedFolder;

  const selectionActions = [
    { icon: Scissors, title: "Cut" },
    { icon: Copy, title: "Copy" },
    { icon: Clipboard, title: "Paste" },
    { icon: CaseSensitive, title: "Rename" },
    { icon: Share2, title: "Share" },
    { icon: Trash2, title: "Delete" },
  ];

  return (
    <div
      className="flex flex-col h-full text-zinc-400"
      onClick={() => setSelectedFolder(null)}
    >
      {/* Topbar */}
      {openFolder ? (
        <div className="relative flex items-center border-b border-zinc-800 px-4 h-12 shrink-0">
          <div className="flex items-center gap-1.5 text-[13px] text-zinc-400 min-w-0">
            <Monitor size={14} className="shrink-0 text-zinc-500" />
            <ChevronRight size={12} className="shrink-0 text-zinc-600" />
            <button
              onClick={() => {
                setOpenFolder(null);
                setSearchQuery("");
              }}
              className="hover:text-zinc-100 transition-colors shrink-0"
            >
              Home
            </button>
            <ChevronRight size={12} className="shrink-0 text-zinc-600" />
            <span className="text-zinc-100 font-medium truncate">
              {openFolder}
            </span>
            <ChevronRight size={12} className="shrink-0 text-zinc-600" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 h-7 w-56">
            <Search size={13} className="text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder={`Search ${openFolder}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-zinc-300 placeholder:text-zinc-600 outline-none w-full"
            />
          </div>
          <div className="ml-auto flex items-center bg-zinc-100 hover:bg-white text-black rounded-sm overflow-hidden transition-colors h-6">
            <button className="flex items-center justify-center px-1.5 border-r border-zinc-300 h-full">
              <Plus size={16} />
            </button>
            <button className="flex items-center justify-center px-1 h-full">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 h-12 shrink-0">
          <div className="flex items-center h-full gap-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 h-full text-[13px] font-medium transition-colors relative px-1 ${
                  activeTab === tab ? "text-zinc-100" : "hover:text-zinc-200"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="filesTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-zinc-100 hover:bg-white text-black rounded-sm overflow-hidden transition-colors h-6">
            <button className="flex items-center justify-center px-1.5 border-r border-zinc-300 h-full">
              <Plus size={16} />
            </button>
            <button className="flex items-center justify-center px-1 h-full">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Body: content + right toolbar */}
      <div className="flex flex-1 min-h-0">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto scrollbar-pill">
          {openFolder ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-zinc-600">
                <img
                  src="/folder.png"
                  alt="folder"
                  className="w-14 h-14 opacity-30"
                />
                <p className="text-sm">"{openFolder}" is empty</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {DEFAULT_FOLDERS.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFolderClick(folder.name);
                    }}
                    className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all group text-left ${
                      selectedFolder === folder.name
                        ? "border-blue-500 bg-blue-950/40 ring-2 ring-blue-500/30"
                        : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    {/* Selection checkmark badge */}
                    {selectedFolder === folder.name && (
                      <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-blue-500">
                        <svg
                          viewBox="0 0 10 10"
                          className="w-2.5 h-2.5"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="1.5,5 4,7.5 8.5,2.5" />
                        </svg>
                      </span>
                    )}
                    <img
                      src="/folder.png"
                      alt="folder"
                      className="w-10 h-10 group-hover:scale-105 transition-transform"
                    />
                    <span
                      className={`text-[13px] font-medium transition-colors ${selectedFolder === folder.name ? "text-white" : "text-zinc-300 group-hover:text-white"}`}
                    >
                      {folder.name}
                    </span>
                    <span className="text-[11px] text-zinc-600">0 items</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right action toolbar */}
        <div className="flex flex-col items-center gap-1 w-12 border-l border-zinc-900 py-3 px-1 shrink-0">
          {/* Selection-dependent actions */}
          {selectionActions.map(({ icon: Icon, title }) => (
            <button
              key={title}
              disabled={!hasSelection}
              title={title}
              onClick={
                title === "Delete"
                  ? (e) => {
                      e.stopPropagation();
                      setDeleteTarget(selectedFolder);
                    }
                  : undefined
              }
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                hasSelection
                  ? "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  : "text-zinc-700 cursor-not-allowed"
              }`}
            >
              <Icon size={15} />
            </button>
          ))}

          {/* Divider */}
          <div className="my-1 w-5 border-t border-zinc-800" />

          {/* Always-active: Sort */}
          <button
            title="Sort"
            className="flex items-center justify-center gap-1 w-8 h-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <ArrowUpDown size={15} />
          </button>

          {/* Always-active: View */}
          <button
            title="View"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LayoutGrid size={15} />
          </button>

          {/* Always-active: More */}
          <button
            title="More"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              folder from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer: storage info */}
      <div className="px-6 py-3 border-t border-zinc-900 bg-zinc-950 flex gap-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
          <span>
            You have <span className="text-zinc-300">128GB</span> of storage
            left
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: "0%" }} />
          </div>
          <span className="text-xs text-zinc-400 whitespace-nowrap">
            0% of 128GB unused
          </span>
          <button
            className="ml-2 p-1 rounded hover:bg-zinc-800 transition-colors"
            title="View storage settings"
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
