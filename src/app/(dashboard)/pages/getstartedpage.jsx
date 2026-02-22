import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Play } from "lucide-react";

const GetStarted = () => {
  return (
    <div className="max-w-3xl mx-auto px-12 py-10 text-zinc-200 select-none">
      {/* Header Section */}
      <div className="mb-8">
        <span className="text-6xl block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          👋
        </span>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Getting Started
        </h1>
      </div>

      {/* Checklist Section */}
      <div className="space-y-4">
        {/* Item 1: Completed */}
        <div className="flex items-start gap-3 group">
          <Checkbox
            checked
            className="mt-1 border-zinc-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <p className="text-[15px] leading-relaxed text-zinc-500 line-through decoration-zinc-600">
            Create an account with Notion
          </p>
        </div>

        {/* Item 2: Active with inline code */}
        <div className="flex items-start gap-3 group">
          <Checkbox className="mt-1 border-zinc-600" />
          <p className="text-[15px] leading-relaxed">
            Click anywhere below and type{" "}
            <code className="bg-zinc-800 text-red-400 px-1.5 py-0.5 rounded text-sm mx-1">
              /
            </code>{" "}
            to see what you can create – headers, tables, to-do’s, etc.
          </p>
        </div>

        {/* Nested Item */}
        <div className="flex items-start gap-3 group ml-8">
          <Checkbox className="mt-1 border-zinc-600" />
          <p className="text-[15px] leading-relaxed">
            Type{" "}
            <code className="bg-zinc-800 text-red-400 px-1.5 py-0.5 rounded text-sm mx-1">
              /page
            </code>{" "}
            to add a{" "}
            <span className="font-semibold text-white underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:bg-zinc-800 transition-colors">
              new page
            </span>{" "}
            and nest anything, anywhere
          </p>
        </div>

        {/* Item 3: Sidebar reference */}
        <div className="flex items-start gap-3 group">
          <Checkbox className="mt-1 border-zinc-600" />
          <p className="text-[15px] leading-relaxed">
            <span className="font-semibold text-white">
              Find, organize, and add new pages
            </span>{" "}
            using the sidebar to the left 👈
          </p>
        </div>

        {/* Item 4: Todo List reference */}
        <div className="flex items-start gap-3 group">
          <Checkbox className="mt-1 border-zinc-600" />
          <p className="text-[15px] leading-relaxed">
            Check out the{" "}
            <span className="font-semibold text-white underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:bg-zinc-800 transition-colors">
              Todo List
            </span>{" "}
            on the left 👈 we added for you with some more tips and tricks to
            best use Notion
          </p>
        </div>

        {/* Toggle Block */}
        <div className="flex items-center gap-2 group cursor-pointer hover:bg-zinc-800/50 p-1 rounded -ml-1 transition-colors mt-2">
          <Play
            size={12}
            className="fill-zinc-400 text-zinc-400 rotate-0 transition-transform group-hover:fill-white group-hover:text-white"
          />
          <p className="text-[15px] text-zinc-200">
            This is a toggle block. Click the little triangle to see a few more
            useful tips!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
