"use client";
import { useRouter } from "next/navigation";
import {
  getStoredWorkspace,
  getStoredUser,
  workspaceSlugFromUser,
  storeWorkspace,
} from "@/lib/workspace";
import { LoadingSequence } from "@/components/animation/loadingsequence";

export default function LoadingPage() {
  const router = useRouter();

  const handleFinished = () => {
    let workspace = getStoredWorkspace();

    if (!workspace) {
      const user = getStoredUser();
      if (user) {
        workspace = workspaceSlugFromUser(user);
        storeWorkspace(workspace);
      }
    }

    if (workspace) {
      router.replace(`/app/${workspace}`);
    } else {
      router.replace("/app");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSequence onFinished={handleFinished} />
    </div>
  );
}
