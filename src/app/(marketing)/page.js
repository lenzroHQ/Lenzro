"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check for lenzrouser in cookies or localStorage
    let found = false;
    // Check cookies
    if (typeof document !== "undefined") {
      found = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("lenzrouser="));
    }
    // Check localStorage
    if (!found && typeof window !== "undefined") {
      found = !!window.localStorage.getItem("lenzrouser");
    }
    if (!found) {
      router.replace("/");
      return;
    }
    // If found, show loading then redirect
    setShowLoading(true);
    const timeout = setTimeout(() => {
      router.replace("/client");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [router]);

  if (showLoading) {
    // Use Spinner component (no navbar/footer)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="!w-2 text-primary" />
      </div>
    );
  }
  return null;
}
