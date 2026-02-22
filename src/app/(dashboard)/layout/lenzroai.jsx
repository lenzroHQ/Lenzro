import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageSquareText,
  Languages,
  Zap,
  Plus,
  Settings2,
  ArrowUp,
  SquareTerminal,
  FilePlus,
  ChevronDown,
  Maximize,
  Minus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const LenzroAi = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* --- TRIGGER BUTTON --- */
          <motion.div
            key="trigger"
            initial={{ scale: 0, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => setIsOpen(true)}
                  className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full bg-gray-200 p-px shadow-xl dark:bg-gray-900 cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="absolute inset-0 scale-[1] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]"></div>
                  <div className="via-brand absolute inset-0 scale-[1] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]"></div>
                  <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900">
                    <img
                      src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
                      className="size-9.5 rounded-full object-contain"
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="mb-2">
                Lenzro AI
              </TooltipContent>
            </Tooltip>
          </motion.div>
        ) : (
          /* --- CHAT WINDOW --- */
          <motion.div
            key="chat"
            initial={{ scale: 0.8, y: 40, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, y: 40, opacity: 0, filter: "blur(10px)" }}
            className="w-[380px] bg-background border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-2">
              <button className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                New chat <ChevronDown className="w-4" />
              </button>
              <div className="flex items-center gap-1 text-zinc-400">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={"w-5 h-5 dark:hover:bg-neutral-800 rounded-sm"}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>New chat</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={"w-5 h-5 dark:hover:bg-neutral-800 rounded-sm"}
                    >
                      <Maximize className="size-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Full screen</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={"w-5 h-5 dark:hover:bg-neutral-800 rounded-sm"}
                      onClick={() => setIsOpen(false)}
                    >
                      <Minus className="size-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close chat</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Content */}
            <div className="px-3 py-4 space-y-6">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
                <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]"></div>
                <div className="via-brand absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]"></div>
                <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900">
                  <img
                    src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
                    className="absolute inset-0 z-50 m-auto size-9 w-full h-full rounded-md"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg text-white">Your improved Lenzro AI</h2>
                <p className="text-xs text-zinc-400">
                  Here are a few things I can do, or ask me anything!
                </p>
              </div>

              {/* Action List */}
              <motion.div
                className="space-y-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ActionItem
                    icon={<MessageSquareText size={16} />}
                    label="Summarize this page"
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ActionItem
                    icon={<Languages size={16} />}
                    label="Translate this page"
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ActionItem
                    icon={<Zap size={16} />}
                    label="Analyze for insights"
                  />
                </motion.div>
              </motion.div>

              {/* Input Box */}
              <div
                className="relative mt-4 p-3 bg-zinc-900/50 
               rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="group flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-[11px] text-zinc-300 relative">
                    <FilePlus size={12} /> New page
                  </div>
                </div>
                <input
                  autoFocus
                  placeholder="Do anything with AI..."
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 pb-8"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-3 text-zinc-500">
                    <Plus
                      size={18}
                      className="cursor-pointer hover:text-white"
                    />
                    <Settings2
                      size={18}
                      className="cursor-pointer hover:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500">
                      Auto
                    </span>
                    <div className="p-1 bg-zinc-800 rounded-full text-zinc-600">
                      <ArrowUp size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Helper Component for the list */
const ActionItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors group">
    <span className="text-zinc-500 group-hover:text-zinc-200">{icon}</span>
    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
      {label}
    </span>
  </div>
);

export default LenzroAi;
