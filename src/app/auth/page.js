"use client";
import { LoginForm } from "@/components/forms/login-form";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const AnimatedTooltip = dynamic(
  () =>
    import("@/components/ui/animated-tooltip").then(
      (mod) => mod.AnimatedTooltip,
    ),
  { ssr: false },
);
const AuroraText = dynamic(
  () => import("@/components/ui/aurora-text").then((mod) => mod.AuroraText),
  { ssr: false },
);
const GridPattern = dynamic(
  () => import("@/components/ui/grid-pattern").then((mod) => mod.GridPattern),
  { ssr: false },
);
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const Auth = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Senior Software Engineer",
      body: "Lenzro changed how I work day to day. Having everything—tasks, files, and data—on one board with AI handling the busywork lets me focus on building, not juggling tools.",
      image: "https://avatars.githubusercontent.com/u/16860528",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      body: "What I love about Lenzro is clarity. The boards, views, and AI insights make it easy to align teams, track progress, and move from ideas to execution without friction.",
      image: "https://avatars.githubusercontent.com/u/20110627",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Lead Data Scientist",
      body: "Lenzro gives structure to complex data. I can organize, visualize, and explore insights in one place while the AI helps surface patterns I might’ve missed.",
      image: "https://avatars.githubusercontent.com/u/106103625",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      body: "The flexibility is what sold me. Lenzro lets me design workflows visually, customize views, and collaborate with teams in a way that feels natural and intuitive.",
      image: "https://avatars.githubusercontent.com/u/59228569",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Product Builder",
      body: "Lenzro feels like a command center. Widgets, automations, and AI all working together means less chaos and more momentum when building products.",
      image: "https://avatars.githubusercontent.com/u/59442788",
    },
    {
      id: 6,
      name: "Dora",
      designation: "Explorer & Innovator",
      body: "Lenzro helps me turn ideas into action fast. I can experiment, organize thoughts spatially, and let the AI guide priorities without losing creative freedom.",
      image: "https://avatars.githubusercontent.com/u/89768406",
    },
  ];

  return (
    <div className="grid min-h-svh items-center lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className=" flex size-8 items-center justify-center rounded-md">
              <img
                src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
                className=" z-50 m-auto  rounded-xl"
              />
            </div>
            Lenzro.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* switch between login form and signup form */}
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center h-screen  overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-10 gap-5 w-full relative z-10">
          <AnimatedTooltip items={people} />
          <p className="text-center space-x-2">
            <AuroraText> 100,000+</AuroraText>designers & developers have used{" "}
            <br />
            Lenzro Marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
