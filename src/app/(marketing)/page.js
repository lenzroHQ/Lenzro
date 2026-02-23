"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "./layouts/hero";
import Trusted from "./layouts/trusted";
import Tour from "./layouts/tour";
import Solutions from "./layouts/solutions";
import BlackBoard from "./layouts/blackboard";
import Community from "./layouts/community";
import FAQ from "./layouts/faq";
import LenzroDemo from "./layouts/lenzrodemo";

export default function Home() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check for lenzrouser in cookies or localStorage
    let found = false;

    // Check cookies (ensure we are on the client side)
    if (typeof document !== "undefined") {
      found = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("lenzrouser="));
    }

    // Check localStorage
    if (!found && typeof window !== "undefined") {
      found = !!window.localStorage.getItem("lenzrouser");
    }

    if (found) {
      // If user is logged in: Navigate to loading page
      router.replace("/loading");
    }
  }, [router]);

  // Render the Public Landing Page
  return (
    <div className="pt-10 flex flex-col gap-10 md:gap-14">
      <Hero />
      <Trusted />
      <Tour />
      <Solutions />
      <BlackBoard />
      <Community />
      <FAQ />
      <LenzroDemo />
    </div>
  );
}
