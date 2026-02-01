"use client";
import React from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { SlackIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const Community = () => {
  const avatars = [
    { imageUrl: "https://avatars.githubusercontent.com/u/16860528" },
    { imageUrl: "https://avatars.githubusercontent.com/u/20110627" },
    { imageUrl: "https://avatars.githubusercontent.com/u/106103625" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59228569" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59442788" },
    { imageUrl: "https://avatars.githubusercontent.com/u/89768406" },
  ];

  const reviews = [
    {
      name: "Riley Johnson",
      username: "@rileyj_s",
      role: "E-commerce Founder",
      body: "The Blackboard is pure 🔥. I can finally stick my live revenue charts right next to my to-do list and move them around like a physical desk. The spatial awareness it gives me over my daily operations is something I didn't know I was missing until now.",
      img: "https://avatars.githubusercontent.com/u/16860531",
    },
    {
      name: "Bryant",
      username: "@brryant",
      role: "Startup Consultant",
      body: "This is the most exciting business OS I've seen. Having the Lenzro AI manage my client list while I focus on branding is a total game changer. The 'sticky' widgets mean my most important metrics are always exactly where I left them on the canvas.",
      img: "https://avatars.githubusercontent.com/u/16860528",
    },
    {
      name: "Karim Ardalan",
      username: "@KarimArdalan",
      role: "Digital Agency Owner",
      body: "The AI organizes my files and updates my website directly from the blackboard. I dragged a product widget onto the board and it was live on my domain in seconds. It’s a tool that actually understands how business owners think—visually and fast!",
      img: "https://avatars.githubusercontent.com/u/20110627",
    },
    {
      name: "Adam Mura",
      username: "@AdamMura",
      role: "Creative Director",
      body: "We needed a space where branding assets and live analytics lived together. The Blackboard makes it easy to see my color palettes right next to my real-time conversion rates. Resizing widgets on the fly helps me prioritize focus without switching tabs.",
      img: "https://avatars.githubusercontent.com/u/106103625",
    },
    {
      name: "Jack Rabrot",
      username: "@rrabrot",
      role: "Shopify Developer",
      body: "I asked the AI to prioritize my daily ops and it literally rearranged my workspace to highlight the orders needing shipping first. It’s like having a digital COO that never sleeps. The integration between payments and tasks is absolutely seamless.",
      img: "https://avatars.githubusercontent.com/u/59228569",
    },
    {
      name: "Jill",
      username: "@jill",
      role: "UX Researcher",
      body: "The Samsung-style edge panel for tools is incredibly clean. It stays out of the way when I'm in deep work, but it's right there the second I need to drop a new widget. It’s Notion-level power with zero of the traditional document clutter.",
      img: "https://avatars.githubusercontent.com/u/59442788",
    },
    {
      name: "Sanjay Mali",
      username: "@sanjay",
      role: "Business Architect",
      body: "The 'Sticky' logic is addictive. I have my daily revenue reports pinned to the top right and they never move, making the workspace feel permanent and reliable. Using the edge panel to summon Lenzro AI has saved me hours of manual data entry.",
      img: "https://avatars.githubusercontent.com/u/89768406",
    },
    {
      name: "Arghya Das",
      username: "@arghya",
      role: "Product Designer",
      body: "Essential to my daily workflow. I use the branding widget to swap logos across my entire board in a single click, and it propagates everywhere instantly. The AI agent’s morning reports tell me exactly which clients are waiting before I even start my day.",
      img: "https://avatars.githubusercontent.com/u/16860531",
    },
    {
      name: "Dillion Verma",
      username: "@dillion",
      role: "Creative Technologist",
      body: "I gave the AI one prompt and it built my entire client CRM and order pipeline on the blackboard in under a minute. The speed is unreal and the visual quality of the widgets is top-tier. Seeing my whole business on one infinite canvas is a relief.",
      img: "https://avatars.githubusercontent.com/u/16860532",
    },
    {
      name: "Nia Carter",
      username: "@nia",
      role: "Digital Nomad",
      body: "Lenzro helped me move from messy spreadsheets to a fully automated business board. My website status, payments, and messages are finally gathered in one cohesive spatial environment. I can't imagine going back to folders after using this canvas.",
      img: "https://avatars.githubusercontent.com/u/16860533",
    },
    {
      name: "Leo Tan",
      username: "@leo",
      role: "Freelance Developer",
      body: "I’ve tried every productivity app out there, but nothing compares to this spatial freedom. Being able to resize my invoice tracker right next to my project notes is exactly what I needed. It feels like the app is working for me, not against me.",
      img: "https://avatars.githubusercontent.com/u/16860534",
    },
    {
      name: "Maya Singh",
      username: "@maya",
      role: "UI Designer",
      body: "The AI agent is genius. It keeps my dashboard up to date and even replies to basic client inquiries for me while I sleep. I can iterate on my business strategy faster than ever because all my data is visually linked on the Blackboard.",
      img: "https://avatars.githubusercontent.com/u/16860535",
    },
    {
      name: "Lucas Hertz",
      username: "@hertz_dev",
      role: "SaaS Founder",
      body: "The infinite canvas is a game changer for system mapping. I have my server logs sticky-noted right next to my user feedback widgets. Lenzro AI keeps the mess organized so I can focus on scaling my code instead of cleaning my workspace.",
      img: "https://avatars.githubusercontent.com/u/16860536",
    },
    {
      name: "Elena Rossi",
      username: "@elena_biz",
      role: "Marketing Head",
      body: "I love how the Edge Panel hides all my heavy tools until I'm ready to use them. It keeps the UI minimal but extremely powerful. Managing our global campaign assets on a sticky blackboard has made our team syncs 10x more productive.",
      img: "https://avatars.githubusercontent.com/u/16860537",
    },
    {
      name: "Marcus Thorne",
      username: "@m_thorne",
      role: "Retail Owner",
      body: "Finally, a tool that handles physical inventory and digital presence in one view. The AI tracks my stock levels and automatically updates the website widget when we run low. It’s the first software that feels like it actually manages the business.",
      img: "https://avatars.githubusercontent.com/u/16860538",
    },
  ];

  const rows = [
    reviews.slice(0, 4),
    reviews.slice(4, 8),
    reviews.slice(8, 12),
    reviews.slice(12, 15),
  ];

  const truncate = (str, n) => (str.length > n ? str.slice(0, n) + "..." : str);
  const ReviewCard = ({ img, name, username, body, truncateText }) => (
    <figure
      className={cn(
        // Smaller card for mobile
        truncateText
          ? "relative w-40 max-w-full rounded-xl border p-3 bg-background flex flex-col justify-between min-h-[160px]"
          : "relative w-80 max-w-full rounded-2xl border p-6 bg-background flex flex-col justify-between min-h-[260px]",
        // light styles
        "border-gray-200 bg-white hover:bg-gray-50",
        // dark styles
        "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        // transition
        "transition-colors duration-200",
      )}
    >
      <blockquote
        className={
          truncateText
            ? "mb-2 text-xs font-normal leading-snug text-zinc-800 dark:text-zinc-100"
            : "mb-4 text-base font-normal leading-relaxed text-zinc-800 dark:text-zinc-100"
        }
      >
        {truncateText ? truncate(body, 80) : body}
      </blockquote>
      <div className="flex items-end justify-between mt-auto pt-2">
        <div className="flex flex-col">
          <span
            className={
              truncateText
                ? "font-semibold text-zinc-900 dark:text-zinc-100 text-xs"
                : "font-semibold text-zinc-900 dark:text-zinc-100 text-sm"
            }
          >
            {username}
          </span>
          <figcaption
            className={
              truncateText
                ? "text-[10px] text-zinc-500 dark:text-zinc-400 font-normal"
                : "text-xs text-zinc-500 dark:text-zinc-400 font-normal"
            }
          >
            {name}
          </figcaption>
        </div>
        <img
          className={
            truncateText
              ? "rounded-md w-7 h-7 object-cover border border-zinc-200 dark:border-zinc-700"
              : "rounded-md w-9 h-9 object-cover border border-zinc-200 dark:border-zinc-700"
          }
          alt={name}
          src={img}
        />
      </div>
    </figure>
  );

  return (
    <section className="w-full min-h-screen flex flex-col gap-8 items-center justify-center px-4 py-16 md:px-10">
      <div className="flex gap-2">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src.imageUrl}
            alt=""
            className="w-10 h-10 rounded-full"
            style={{ marginLeft: i === 0 ? 0 : -10 }}
          />
        ))}
      </div>

      <div className="text-gray-500 text-center font-medium">
        700k+ Businesses & startups trust Lenzro
      </div>
      <h2 className="text-xl md:text-5xl font-bold text-center leading-tight">
        Helping you Streamline your Operations <br /> and Deliver{" "}
        <AnimatedGradientText
          speed={2}
          colorFrom="#4ade80"
          colorTo="#06b6d4"
          className="font-semibold tracking-tight"
        >
          Faster
        </AnimatedGradientText>
      </h2>

      <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-10">
        <Button
          variant="outline"
          className="md:w-[25%] text-sm px-6 py-2 rounded-md"
        >
          <SlackIcon /> Join our community
        </Button>
        <Button
          variant="outline"
          className="md:w-[25%] text-sm px-6 py-2 rounded-md"
        >
          Read more reviews
        </Button>
      </div>

      {/* 2-row grid for small screens, medium speed horizontal marquee */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden gap-2 md:hidden">
        <Marquee pauseOnHover className="[--duration:20s] w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
            {reviews.slice(0, 4).map((review, i) => (
              <div key={review.username} className="flex justify-center">
                <ReviewCard {...review} truncateText={true} />
              </div>
            ))}
          </div>
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>

      {/* Marquee for medium and up (vertical, untouched) */}
      <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden gap-2 hidden md:flex">
        {rows.map((row, i) => (
          <Marquee
            key={i}
            vertical
            pauseOnHover
            reverse={i % 2 !== 0}
            className="[--duration:25s] w-1/4"
          >
            {row.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    </section>
  );
};

export default Community;
