"use client";

import { usePathname } from "next/navigation";
import LenzroAi from "./lenzroai";

export default function FloatingAi() {
  const pathname = usePathname();

  // Hide LenzroAi on blackboard page
  if (pathname.includes("/blackboard")) {
    return null;
  }

  return <LenzroAi />;
}
