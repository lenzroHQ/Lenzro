import React from "react";
import { Plus, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "../ui/border-beam";


const BlackboardInput = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center p-8 z-50 pointer-events-none">
      <div className="pointer-events-auto group relative flex items-center justify-between w-full max-w-3xl  backdrop-blur-md border border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-1.5 transition-all pl-2 focus-within:border-white/20">
        {/* Start Section: Text Input */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg bg-white hover:bg-white/10 text-black">
            <Plus size={18} />
          </button>
          <input
            type="text"
            placeholder="Ask, create, search, @ to mention"
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 px-2 py-1 w-96 text-sm"
          />
        </div>

        {/* End Section: Toolbar */}
        <div className="flex items-center justify-between ">
          {/* AI Selector */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-gray-300 transition-colors">
              <img
                src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
                className="size-5 rounded-full object-contain"
                style={{ display: "block" }}
              />
              <span className="text-sm font-medium">Lenzro AI</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Submit Button */}
          <button className="p-2 rounded-full bg-white/5 text-gray-600 cursor-not-allowed">
            <ArrowRight size={18} />
          </button>
        </div>
        <BorderBeam duration={8} size={100} />
      </div>
    </div>
  );
};

export default BlackboardInput;
