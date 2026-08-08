"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const CASES = [
  {
    tags: ["SaaS", "Web Development", "Product Design"],
    title:
      "Lenzro Car Hire – the all-in-one platform for car rental businesses",
    image: "/car.png",
    url: "https://car-hire-two.vercel.app",
    badges: [{ label: "Lenzro" }, { label: "SaaS Platform" }],
    techStack: "Next.js, Supabase",
    timeline: "Ongoing",
    results: [
      "One dashboard to manage fleets, bookings & payments",
      "Built for any car hire business, from solo to fleet",
    ],
  },
  {
    tags: ["Web Development", "Student System", "PostgreSQL"],
    title: "Barsita – become a world-class barista at Nairobi's Coffee Academy",
    image: "/aa.png",
    badges: [
      { label: "Barsita" },
      { label: "Eastleigh, Nairobi, Kenya", flag: "🇰🇪" },
    ],
    techStack: "Next.js, PostgreSQL",
    timeline: "Ongoing",
    results: [
      "Real students, real certificates, real jobs behind the bar",
      "A certification-day gallery showcasing every graduating class",
    ],
  },
  {
    tags: ["Web Development", "Community", "Nonprofit"],
    title: "Anchor Point Initiative – building community by helping the youth",
    image: "/api.png",
    url: "https://anchor-point-initiative.vercel.app/",
    badges: [
      { label: "Anchor Point Initiative" },
      { label: "Community Mental Health" },
    ],
    techStack: "Next.js, Tailwind CSS",
    timeline: "Ongoing",
    results: [
      "A safe, supportive space for youth mental health group programs",
      "Community hub for events, resources & donations",
    ],
  },
  {
    tags: ["SaaS", "Web Development", "Healthcare"],
    title: "Mayo – book appointments with trusted doctors",
    image: "/amaya.png",
    url: "https://healthyfeeling.netlify.app/",
    badges: [{ label: "Mayo" }, { label: "Healthcare SaaS" }],
    techStack: "MongoDB, Express, React, Node.js",
    timeline: "Ongoing",
    results: [
      "Browse trusted doctors & book appointments hassle-free",
      "One platform connecting patients, doctors & hospitals",
    ],
  },
  {
    tags: ["SaaS", "Fleet Management", "Web Development"],
    title: "Gam Oil Trading Limited – fleet management for petroleum distribution",
    image: "/gam.png",
    url: "https://fleet-frontend-zeta.vercel.app/",
    badges: [{ label: "Gam Oil Trading Limited" }, { label: "Fleet & Petroleum" }],
    techStack: "MongoDB, Express, React, Node.js",
    timeline: "Ongoing",
    results: [
      "Authenticated dashboard to manage the entire fleet",
      "Built for real-time petroleum distribution logistics",
    ],
  },
];

const CaseCard = ({ project, progress, range }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, 0.9]);
  const opacity = useTransform(progress, range, [1, 0]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-fit bg-white items-center justify-center "
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full  p-5 border-zinc-500 origin-top bg-white"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-left"
            />
          </div>

          <div>
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {project.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </p>

            <h3 className="mt-3 text-3xl font-medium leading-tight text-black md:text-4xl">
              {project.title}
            </h3>

            {project.url && (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={project.url} target="_blank" className="w-full">
                  <Button className="h-15 md:w-100 text-lg display-lg">
                    Visit Project <ArrowTopRightIcon />
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Tech Stack
                </p>
                <p className="mt-2 text-lg text-black">{project.techStack}</p>
              </div>
              <div className="border-l border-neutral-200 pl-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Timeline
                </p>
                <p className="mt-2 text-lg text-black">{project.timeline}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Results
              </p>
              <div className="mt-2 space-y-2">
                {project.results.map((result) => (
                  <p key={result} className="text-lg text-black">
                    {result}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Solutions = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="w-full px-2 bg-white sm:px-4 md:px-8 py-10">
      <div className="px-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Featured Cases
        </p>
        <h2 className="mt-4 text-3xl leading-[1.05] mb-20 font-medium text-black">
          Discover how we&apos;re driving change through innovative projects,
          strong partnerships, and measurable outcomes.
        </h2>
      </div>

      <div ref={container} className="relative w-full">
        {CASES.map((project, i) => {
          const isLast = i === CASES.length - 1;
          const slot = 1 / CASES.length;
          return (
            <CaseCard
              key={project.title}
              project={project}
              progress={scrollYProgress}
              range={
                isLast ? [1.5, 2] : [i * slot + slot * 0.5, (i + 1) * slot]
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;
