import React from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Palette,
  Keyboard,
  Download,
  HelpCircle,
  PlusCircle,
  Briefcase,
  Clock,
  FileText,
  Video,
  Bell,
  StickyNote,
  Presentation,
  Users,
  LayoutDashboard,
  Sparkles,
  Trash2,
  LogOut,
  Star,
  Volume2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useAuthContext } from "@/lib/auth-provider";
import { useParams } from "next/navigation";

const SidePopover = () => {
  const { user, signOut } = useAuthContext();
  const router = useRouter();
  const { workspaceId: workspace } = useParams() ?? {};

  const handleLogout = async () => {
    // signOut() in auth-provider clears Firebase + server cookie + localStorage
    // and performs a hard window.location.replace("/auth") — no need to
    // call router.replace here.
    await signOut();
  };

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const displayName = user?.displayName || user?.email || "User";
  const initials = getInitials(displayName);
  return (
    <div className="w-70 rounded-xl shadow-2xl border border-zinc-800 bg-black py-2 font-sans animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-pill">
      {/* Top Header Section */}
      <div className="px-2 pb-2 mb-2">
        {/* Profile Container */}
        <div className="flex items-center justify-between p-2  rounded-xl  group hover:bg-zinc-900 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            {/* Avatar with Online Status */}
            <div className="relative">
              <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-sm  text-white">{initials}</span>
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-black" />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <span className="text-[12px] text-white leading-tight">
                {displayName}
              </span>
              <span className="text-[12px] text-zinc-500">Online</span>
            </div>
          </div>

          {/* Profile Badge/Button */}
          <div className="px-3 py-1 bg-zinc-800  rounded-full group-hover:bg-zinc-200 transition-colors duration-300">
            <span className="text-[12px] font-medium text-zinc-400 group-hover:text-black">
              Profile
            </span>
          </div>
        </div>
      </div>
      <Separator className="my-1" />

      {/* Settings Section */}
      <div className="px-2 space-y-0.5 pb-2 mb-2">
        <MenuAction icon={<Volume2 size={18} />} label="Mute notifications" />
        <MenuAction
          icon={<Settings size={18} />}
          label="Settings"
          onClick={() => workspace && router.push(`/${workspace}/settings`)}
        />
        <MenuAction icon={<Palette size={18} />} label="Themes" />
        <MenuAction icon={<Keyboard size={18} />} label="Keyboard shortcuts" />
        <MenuAction
          icon={<Download size={18} />}
          label="Download ClickUp"
          extra={<ExternalLink size={14} />}
        />
        <MenuAction icon={<HelpCircle size={18} />} label="Help" />
      </div>
      <Separator className="my-1" />

      {/* Utilities Section */}
      <div className="px-2 pb-2 mb-2">
        <div className="px-3 py-2 text-[12px] text-zinc-500 tracking-wider">
          Utilities
        </div>
        <div className="space-y-0.5">
          {/* Added showPin to all items in this section */}
          <MenuAction
            icon={<PlusCircle size={18} />}
            label="Create task"
            showPin
          />
          <MenuAction icon={<Briefcase size={18} />} label="My Work" showPin />
          <MenuAction icon={<Clock size={18} />} label="Track Time" showPin />
          <MenuAction icon={<FileText size={18} />} label="Notepad" showPin />
          <MenuAction
            icon={<Video size={18} />}
            label="Record a Clip"
            showPin
          />
          <MenuAction
            icon={<Bell size={18} />}
            label="Create Reminder"
            showPin
          />
          <MenuAction
            icon={<StickyNote size={18} />}
            label="Create Doc"
            showPin
          />
          <MenuAction
            icon={<Presentation size={18} />}
            label="Create Whiteboard"
            showPin
          />
          <MenuAction icon={<Users size={18} />} label="View People" showPin />
          <MenuAction
            icon={<LayoutDashboard size={18} />}
            label="Create Dashboard"
            showPin
            isActive
          />
          <MenuAction icon={<Sparkles size={18} />} label="AI Chat" showPin />
        </div>
      </div>
      <Separator className="my-1" />

      {/* Footer Section */}
      <div className="px-2 space-y-0.5">
        <MenuAction icon={<Trash2 size={18} />} label="Trash" />
        <MenuAction
          icon={<LogOut size={18} />}
          label="Log out"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

const MenuAction = ({ icon, label, extra, showPin, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center justify-between px-2 py-1.5 hover:text-black rounded-md transition-all relative
        ${isActive ? "bg-zinc-100 text-black" : "hover:bg-zinc-50 text-zinc-400 hover:text-black"}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icon color inherits group-hover */}
        <span
          className={`${isActive ? "text-black" : "text-zinc-500 group-hover:text-black"}`}
        >
          {icon}
        </span>
        <span className="text-[13px] font-medium transition-colors">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="group-hover:text-black">{extra}</span>
        {showPin && (
          <Star
            size={16}
            className={`transition-opacity 
              ${
                isActive
                  ? "opacity-100 fill-black text-black"
                  : "opacity-0 group-hover:opacity-100 text-zinc-400 hover:fill-black hover:text-black"
              }
            `}
          />
        )}
      </div>
    </button>
  );
};

export default SidePopover;
