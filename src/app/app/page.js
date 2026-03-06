"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getStoredWorkspace,
  getStoredUser,
  workspaceSlugFromUser,
  storeWorkspace,
} from "@/lib/workspace";
import { Spinner } from "@/components/ui/spinner";

export default function AppIndexPage() {
  const router = useRouter();

  useEffect(() => {
    let workspace = getStoredWorkspace();

    // Fallback: derive workspace from lenzrouser if the new key isn't set yet
    if (!workspace) {
      const user = getStoredUser();
      if (user) {
        workspace = workspaceSlugFromUser(user);
        storeWorkspace(workspace); // persist so next visit is instant
      }
    }

    if (workspace) {
      router.replace(`/app/${workspace}`);
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Spinner className="size-5 text-zinc-400" />
      <p className="text-sm text-zinc-500">Loading your workspace…</p>
    </div>
  );
}
