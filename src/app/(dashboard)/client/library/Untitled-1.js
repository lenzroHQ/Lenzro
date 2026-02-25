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
} from "lucide-react";
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

// Import your custom file components
import {
  FileItem,
  FolderItem,
  FolderTrigger,
  FolderContent,
  Files,
  SubFiles,
} from "@/components/animate-ui/components/radix/files";

const Separator = () => <div className="h-px bg-zinc-800/60 mx-2 my-2" />;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-60 rounded-xl flex flex-col border border-zinc-800 bg-black text-white py-3 px-2 max-h-[92vh] overflow-y-auto scrollbar-pill">
        {/* SECTION: Pages */}
        <SidebarSection title="Pages" showPlus defaultOpen={true}>
          <SidebarRow
            icon={<Home />}
            label="Dashboard"
            glowColor="bg-blue-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<Users2 />}
            label="Clients"
            glowColor="bg-purple-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<CreditCard />}
            label="Payments"
            glowColor="bg-emerald-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </SidebarSection>

        <Separator />

        {/* SECTION: Favorites */}
        <SidebarSection title="Favorites" showPlus defaultOpen={true}>
          <SidebarRow
            icon={<Star />}
            label="Branding Pinned"
            glowColor="bg-yellow-500"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </SidebarSection>

        <Separator />

        {/* SECTION: Files (The New Integrated Section) */}
        <SidebarSection title="Files" showPlus={true} defaultOpen={true}>
          <div className="px-1 py-1">
            <Files className="w-full text-[13px]" defaultOpen={["app"]}>
              <FolderItem value="app">
                <FolderTrigger className="hover:bg-zinc-900/40 rounded px-2 py-1 transition-colors">
                  app
                </FolderTrigger>
                <FolderContent>
                  <SubFiles defaultOpen={["(home)"]}>
                    <FolderItem value="(home)">
                      <FolderTrigger className="px-2 py-1 hover:text-white transition-colors text-zinc-400">
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
                <FolderTrigger className="hover:bg-zinc-900/40 rounded px-2 py-1 transition-colors">
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

        {/* SECTION: Settings/Last Section */}
        <nav className="space-y-0.5">
          <SidebarRow
            icon={<Settings />}
            label="Settings"
            glowColor="bg-zinc-400"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<ShoppingBag />}
            label="Marketplace"
            glowColor="bg-amber-600"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarRow
            icon={<Trash2 />}
            label="Bin"
            glowColor="bg-red-800"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </nav>
      </aside>
    </TooltipProvider>
  );
};

/* --- SHARED COMPONENTS (Section & Row) --- */

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
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover/section:opacity-100 transition-opacity">
          <button className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded">
            <MoreHorizontal size={14} />
          </button>
          {showPlus && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded">
                  <Plus size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-zinc-800 text-white border-zinc-700 text-[10px] px-2 py-1"
              >
                Add a file
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

const SidebarRow = ({ icon, label, glowColor, activeItem, setActiveItem }) => {
  const isActive = activeItem === label;
  return (
    <div
      onClick={() => setActiveItem(label)}
      className={`group flex items-center gap-3 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all ${
        isActive
          ? "text-white bg-zinc-900/40"
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
      }`}
    >
      <div className="relative flex items-center justify-center h-5 w-5">
        {isActive && (
          <div
            className={`absolute inset-0 ${glowColor} blur-xl rounded-full scale-125 opacity-30`}
          />
        )}
        <div
          className={`relative z-10 flex items-center justify-center transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
        >
          {React.cloneElement(icon, { size: 16 })}
        </div>
      </div>
      <span
        className={`text-[13px] font-medium transition-all ${isActive ? "translate-x-0.5" : ""}`}
      >
        {label}
      </span>
    </div>
  );
};

export default Sidebar;
