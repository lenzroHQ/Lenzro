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

import {motion} from 'framer-motion'

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Section Separator
const Separator = () => <div className="h-px bg-zinc-800/60 mx-2 my-2" />;

const Sidebar = () => {
  // Set default active page to 'Get Started' if on /client route, else 'Dashboard'
  let defaultActive = "Get Started";
  if (typeof window !== "undefined" && window.location.pathname === "/client") {
    defaultActive = "Get Started";
  }
  const [activeItem, setActiveItem] = useState(defaultActive);

   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-60 rounded-xl flex flex-col border border-zinc-800 bg-black text-white py-3 px-2 max-h-[92vh] overflow-y-auto scrollbar-pill">


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
          <SidebarRow
            icon={<Inbox />}
            label="Inbox"
            glowColor="bg-indigo-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<LayoutGrid />}
            label="Library"
            glowColor="bg-rose-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<Calendar />}
            label="Calendar"
            glowColor="bg-red-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
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
      </aside>
    </TooltipProvider>
  );
};

/* --- SHARED COMPONENTS --- */

const SidebarSection = ({ title, children, showPlus, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/section"
    >
      <div className="flex items-center justify-between px-2 py-1.5 hover:bg-zinc-900/40 rounded-md transition-colors cursor-default">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <button className="text-zinc-600 hover:text-white transition-all duration-200">
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${!isOpen && "-rotate-90"}`}
              />
            </button>
          </CollapsibleTrigger>
          <h3 className="text-[11px] font-Semibold tracking-widest text-zinc-500 ">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover/section:opacity-100 transition-opacity">
          {/* Popover for MoreHorizontal menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded">
                <MoreHorizontal size={14} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              sideOffset={10}
              className="bg-background text-white border-zinc-800 w-[250px] p-1.5 shadow-2xl rounded-lg"
            >
              <div className="flex flex-col gap-0.5">
                {/* Sort Option */}
                <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800/80 transition-colors text-left w-full">
                  <ArrowUpDown
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-200">
                    Sort
                  </span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[12px]">
                      Last edited
                    </span>
                    <ChevronRight size={14} className="text-zinc-600" />
                  </div>
                </button>

                {/* Show Option */}
                <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800/80 transition-colors text-left w-full">
                  <Hash
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-200">
                    Show
                  </span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[12px]">10</span>
                    <ChevronRight size={14} className="text-zinc-600" />
                  </div>
                </button>

                {/* Move Up */}
                <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800/80 transition-colors text-left w-full">
                  <ArrowUp
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-200">
                    Move up
                  </span>
                </button>

                {/* Move Down */}
                <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800/80 transition-colors text-left w-full">
                  <ArrowDown
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-200">
                    Move down
                  </span>
                </button>

                <div className="h-px bg-zinc-800/50 my-1 mx-1" />

                {/* Hide Section */}
                <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded-md hover:bg-zinc-800/80 transition-colors text-left w-full">
                  <EyeOff
                    size={14}
                    className="text-zinc-400 group-hover:text-zinc-200"
                  />
                  <span className="text-[13px] font-medium text-zinc-200">
                    Hide section
                  </span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
          {showPlus && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded">
                  <Plus size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-zinc-800 text-white border-zinc-700 ml-2 text-[10px] px-2 py-1"
              >
                {title === "Files" ? "Add file" : "Add a page"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <CollapsibleContent className="space-y-0.5 mt-0.5 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const SidebarRow = ({ icon, label, textColor, activeItem, setActiveItem }) => {
  const isActive = activeItem === label;

  return (
    <div
      onClick={() => setActiveItem(label)}
      className={`group/row flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
        isActive
          ? `${textColor} bg-zinc-900/40`
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="relative flex items-center justify-center h-5 w-5 shrink-0">
          <div className="relative z-10 flex items-center justify-center transition-colors">
            <div className="group-hover/row:hidden flex items-center justify-center transition-all duration-200">
              {React.cloneElement(icon, {
                size: 16,
                className: isActive
                  ? `${textColor}`
                  : "text-zinc-500 group-hover:text-zinc-300",
              })}
            </div>
            <div className="hidden group-hover/row:flex items-center justify-center animate-in fade-in zoom-in-75 duration-200">
              <ChevronRight size={14} className="text-zinc-500" />
            </div>
          </div>
        </div>

        <span className="text-[13px] font-medium transition-all truncate">
          {label}
        </span>
      </div>

      <div className="flex items-center opacity-0 group-hover/row:opacity-100 transition-opacity">
        {/* PAGE ACTIONS POPOVER */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={10}
            className="bg-[#1A1A1A] text-white border-zinc-800 w-[240px] p-1 shadow-2xl rounded-lg overflow-hidden"
          >
            <div className="px-2 py-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Page
            </div>

            <div className="flex flex-col gap-0.5">
              <MenuButton icon={<Star size={14} />} label="Add to Favorites" />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton icon={<Link2 size={14} />} label="Copy link" />
              <MenuButton
                icon={<Copy size={14} />}
                label="Duplicate"
                shortcut="Ctrl+D"
              />
              <MenuButton
                icon={<PencilLine size={14} />}
                label="Rename"
                shortcut="Ctrl+Shift+R"
              />
              <MenuButton
                icon={<ArrowRightLeft size={14} />}
                label="Move to"
                shortcut="Ctrl+Shift+P"
              />
              <MenuButton icon={<Trash2 size={14} />} label="Move to Trash" />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton
                icon={<RefreshCcw size={14} />}
                label="Turn into wiki"
              />

              <div className="h-px bg-zinc-800/60 my-1 mx-1" />

              <MenuButton
                icon={<ArrowUpRight size={14} />}
                label="Open in new tab"
                shortcut="Ctrl+Shift+Enter"
              />
              <MenuButton
                icon={<PanelLeft size={14} />}
                label="Open in side peek"
                shortcut="Alt+Click"
              />
            </div>

            {/* METADATA FOOTER */}
            <div className="mt-2 px-3 py-2 border-t border-zinc-800 bg-zinc-900/30 text-[11px] text-zinc-500">
              Last edited by Abdiaziz Mohamed
              <br />
              Today at 2:42 PM
            </div>
          </PopoverContent>
        </Popover>

        {/* ADD PAGE BUTTON */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Plus size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-zinc-800 text-white ml-2 border-zinc-700 text-[10px] px-2 py-1"
          >
            Add a page inside
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

/* Helper component for menu items to maintain consistent styling */
const MenuButton = ({ icon, label, shortcut }) => (
  <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded hover:bg-zinc-800 transition-colors text-left w-full text-zinc-200">
    <span className="text-zinc-400 group-hover:text-zinc-200">{icon}</span>
    <span className="text-[13px]">{label}</span>
    {shortcut && (
      <span className="ml-auto text-zinc-500 text-[10px]">{shortcut}</span>
    )}
  </button>
);

export default Sidebar;
