"use client";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Loading = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/client");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <div className="min-h-screen flex items-center gap-2 justify-center">
      <Spinner className="size-4 text-zinc-400" />
      <p className="text-sm text-zinc-400">Redirecting to your workspace</p>
    </div>
  );
};

export default Loading;
