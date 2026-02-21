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
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const lenzrouser = localStorage.getItem("lenzrouser");
    if (lenzrouser) {
      router.replace("/client");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return null;
  }

  // Public landing page content here
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
