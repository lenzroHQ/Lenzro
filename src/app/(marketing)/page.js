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
import Cookies from "js-cookie";

export default function Home() {
   const router = useRouter();

   useEffect(() => {
     const userCookie = Cookies.get("lenzrouser");
     const userLocal = localStorage.getItem("lenzrouser");

     if (userCookie && userLocal) {
       router.push("/client");
     }
   }, []);



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
