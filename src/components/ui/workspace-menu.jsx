"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Settings,
  Users,
  AppWindow,
  List,
  Zap,
  Plus,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useState } from "react";

export default function WorkspaceMenu() {
  const [user, setUser] = useState({ displayName: "", photoURL: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          const stored = window.localStorage.getItem("lenzrouser");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser({
              displayName: parsed.displayName || "",
              photoURL: parsed.photoURL || "",
            });
          }
        } catch {}
        setLoading(false);
      }, 5000); // 5 seconds delay
    }
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {loading ? (
          <Skeleton className="h-7 w-[230px] rounded-sm" />
        ) : (
          <Button
            variant="outline"
            className="flex items-center w-fit px-1 pr-2 gap-2 h-7.5 rounded-sm text-xs"
          >
            <Avatar className="size-6">
              <AvatarImage
                className={"rounded-sm"}
                src={user.photoURL}
                alt={user.displayName}
              />
              <AvatarFallback>
                {user.displayName
                  ? user.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "JD"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">
              {user.displayName ? `${user.displayName}'s Business` : "John Doe Business"}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ display: "inline-flex" }}
            >
              <ChevronDown />
            </motion.span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-background">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="size-8">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback>
              {user.displayName
                ? user.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">
              {user.displayName
                ? `${user.displayName}'s Workspace`
                : "Workspace"}
            </div>
            <div className="text-xs text-muted-foreground">
              Free Forever • <span className="text-purple-500">Upgrade</span>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <Settings className="size-4" /> Settings
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <Users className="size-4" /> People
          </Button>
        </div>
        <div className="mb-2 text-xs font-semibold text-muted-foreground">
          Manage
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <Button variant="ghost" size="sm" className="justify-start gap-2">
            <AppWindow className="size-4" /> Pages
          </Button>
          <Button variant="ghost" size="sm" className="justify-start gap-2">
            <List className="size-4" /> Templates
          </Button>
          <Button variant="ghost" size="sm" className="justify-start gap-2">
            <Zap className="size-4" /> Ai
          </Button>
        </div>
        <Separator className="my-2" />
        <Button variant="default" className="w-full gap-2">
          <Plus className="size-4" /> Create Workspace
        </Button>
      </PopoverContent>
    </Popover>
  );
}
