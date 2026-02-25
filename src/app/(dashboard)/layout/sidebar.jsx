import React, { useState } from "react";
import {
  Home,
  Users2,
  CreditCard,
  Globe,
  BarChart3,
  Palette,
  Star,
  Plus,
  Inbox,
  LayoutGrid,
  Calendar,
  Settings,
  ShoppingBag,
  Trash2,
  ChevronDown,
  MoreHorizontal,
  FileJson,
  EyeOff,
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Hash,
  ArrowUpDown,
  Copy,
  Link2,
  PencilLine,
  ArrowRightLeft,
  RefreshCcw,
  ArrowUpRight,
  PanelLeft,
  Search,
  ListFilter,
  ChevronsLeft,
} from "lucide-react";

// Radix Files Components
import {
  FileItem,
  FolderItem,
  FolderTrigger,
  FolderContent,
  Files,
  SubFiles,
} from "@/components/animate-ui/components/radix/files";

import { motion } from "framer-motion";

// Shadcn UI Components
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import SidebarSection from "./sidebar-section";
import SidebarRow from "./sidebar-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import TopBar from "./topbar";

// Section Separator

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state
  const [activeItem, setActiveItem] = useState("Dashboard");
  // Set default active page to 'Get Started' if on /client route, else 'Dashboard'

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "0px" : "240px",
          opacity: isCollapsed ? 0 : 1,
          marginRight: isCollapsed ? "-10px" : "0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative h-[92vh] flex flex-col border border-zinc-800 bg-black text-white py-3 px-2 overflow-hidden rounded-xl"
      >
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsCollapsed(false)}
            className="fixed top-6 left-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-white"
          >
            <PanelLeft size={18} />
          </motion.button>
        )}
        {/* Fixed Topbar */}
        <TopBar onCollapse={() => setIsCollapsed(true)} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-pill">
          {/* SECTION: Pages */}
          <SidebarSection title="Pages" showPlus defaultOpen={true}>
            <SidebarRow
              icon={<Home />}
              label="Dashboard"
              textColor="text-cyan-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<Users2 />}
              label="Clients"
              textColor="text-purple-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<CreditCard />}
              label="Payments"
              textColor="text-emerald-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<Globe />}
              label="Website"
              textColor="text-orange-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<BarChart3 />}
              label="Analytics"
              textColor="text-red-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<Palette />}
              label="Branding"
              textColor="text-pink-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </SidebarSection>

          <Separator />

          {/* SECTION: Favorites */}
          <SidebarSection title="Favorites" showPlus defaultOpen={true}>
            <SidebarRow
              icon={<Star />}
              label="Branding"
              glowColor="bg-yellow-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SidebarRow
              icon={<Star />}
              label="Get Started"
              glowColor="bg-yellow-500"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </SidebarSection>

          <Separator />

          {/* SECTION: Workspace */}
          <SidebarSection title="Workspace" showPlus={false} defaultOpen={true}>
            <Link href={"/client/inbox"}>
              <Button
                className={
                  "rounded-lg w-full flex items-center justify-start px-0 cursor-pointer text-zinc-400 gap-3"
                }
                variant="ghost"
              >
                <Inbox size={16} />
                <span className="text-[13px] font-medium">Inbox</span>
              </Button>
            </Link>

            <Link href={"/client/library"}>
              <Button
                className={
                  "rounded-lg w-full flex items-center justify-start px-0 cursor-pointer text-zinc-400 gap-3"
                }
                variant="ghost"
              >
                <LayoutGrid size={16} />
                <span className="text-[13px] font-medium">Library</span>
              </Button>
            </Link>

            <Link href={"/client/calender"}>
              <Button
                className={
                  "rounded-lg w-full flex items-center justify-start px-0 cursor-pointer text-zinc-400 gap-3"
                }
                variant="ghost"
              >
                <Calendar size={16} />
                <span className="text-[13px] font-medium">Calender</span>
              </Button>
            </Link>
          </SidebarSection>

          <Separator />

          {/* SECTION: Files Section */}
          <SidebarSection title="Files" showPlus={true} defaultOpen={true}>
            <div className="">
              <Files className="w-full text-[13px]" defaultOpen={["app"]}>
                <FolderItem value="app">
                  <FolderTrigger className="w-full flex items-center gap-2 hover:bg-zinc-900/40 rounded  py-1 transition-colors text-zinc-400 hover:text-white">
                    contracts
                  </FolderTrigger>
                  <FolderContent>
                    <SubFiles defaultOpen={["(home)"]}>
                      <FolderItem value="(home)">
                        <FolderTrigger className="px-2 py-1 hover:text-white transition-colors text-zinc-500">
                          (home)
                        </FolderTrigger>
                        <FolderContent>
                          <FileItem className="pl-4 py-1 text-zinc-500 hover:text-zinc-200 cursor-pointer">
                            page.tsx
                          </FileItem>
                          <FileItem className="pl-4 py-1 text-zinc-500 hover:text-zinc-200 cursor-pointer">
                            layout.tsx
                          </FileItem>
                        </FolderContent>
                      </FolderItem>
                      <FileItem className="py-1 text-zinc-500 hover:text-zinc-200 cursor-pointer">
                        global.css
                      </FileItem>
                    </SubFiles>
                  </FolderContent>
                </FolderItem>

                <FolderItem value="components">
                  <FolderTrigger className="w-full flex items-center gap-2 hover:bg-zinc-900/40 rounded  py-1 transition-colors text-zinc-400 hover:text-white">
                    components
                  </FolderTrigger>
                  <FolderContent>
                    <SubFiles>
                      <FileItem className="py-1 text-zinc-500 hover:text-zinc-200 cursor-pointer">
                        button.tsx
                      </FileItem>
                    </SubFiles>
                  </FolderContent>
                </FolderItem>

                <FileItem
                  icon={FileJson}
                  className="py-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  package.json
                </FileItem>
              </Files>
            </div>
          </SidebarSection>

          <Separator />

          {/* SECTION: Plain Bottom Navigation */}
          <nav className="flex flex-col gap-1 mt-2">
            <button
              className={`flex items-center gap-3 px-2 py-1.5  rounded-lg transition-all text-zinc-200 font-medium text-[13px] ${activeItem === "Settings" ? "bg-zinc-800" : "hover:bg-zinc-900/60"}`}
              onClick={() => setActiveItem("Settings")}
            >
              <Settings size={16} className="shrink-0" />
              Settings
            </button>
            <button
              className={`flex items-center gap-3 px-2 py-1.5  rounded-lg transition-all text-zinc-200 font-medium text-[13px] ${activeItem === "Marketplace" ? "bg-zinc-800" : "hover:bg-zinc-900/60"}`}
              onClick={() => setActiveItem("Marketplace")}
            >
              <ShoppingBag size={16} className="shrink-0" />
              Marketplace
            </button>
            <button
              className={`flex items-center gap-3 px-2 py-1.5  rounded-lg transition-all text-zinc-200 font-medium text-[13px] ${activeItem === "Bin" ? "bg-zinc-800" : "hover:bg-zinc-900/60"}`}
              onClick={() => setActiveItem("Bin")}
            >
              <Trash2 size={16} className="shrink-0" />
              Trash
            </button>
          </nav>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};
export default Sidebar;



