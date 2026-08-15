"use client";

import React from "react";

const SERVICES = [
  {
    number: "01",
    title: "Website Redesign",
    description:
      "Modernize outdated websites with improved UX/UI, performance, and conversion-focused design.",
    imgSrc: "/red.png",
    videoSrc:
      "https://phenomenonstudio.com/wp-content/uploads/2025/03/Website-redesign.mp4",
  },
  {
    number: "02",
    title: "Online Presence",
    description:
      "Get discovered — Google Maps, social profiles, business email, and targeted ads set up right.",
    imgSrc: "/presence.png",
    videoSrc: "/onlinepresence.mp4",
  },
  {
    number: "03",
    title: "Website Development",
    description:
      "Design and build high-performing marketing sites, web apps, and SaaS platforms.",
    imgSrc: "/eas.png",
    videoSrc:
      "https://phenomenonstudio.com/wp-content/uploads/2025/02/Website-development.mp4",
  },
  {
    number: "04",
    title: "SaaS Application Creation",
    description:
      "Turn your idea into a scalable SaaS product, from architecture to polished UI.",
    imgSrc: "/saas.png",
    videoSrc:
      "https://phenomenonstudio.com/wp-content/uploads/2025/03/tinyvid_optimized_4_273c0b39593e094d9f8cc0a654963dd3.mp4",
  },
  {
    number: "05",
    title: "Mobile Development",
    description:
      "Ship responsive Android and iOS apps that feel native across every device.",
    imgSrc: "/mobile.jpg",
    videoSrc:
      "https://phenomenonstudio.com/wp-content/uploads/2025/03/tinyvid_optimized_3_991b1abdaf86fca5400630dcdf446984.mp4",
  },
];

const Tour = () => {
  return (
    <div id="services" className="relative w-full overflow-clip p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="header space-y-4">
          <h1 className="display-lg">
            Move on to Our tech <br /> to elevate your business{" "}
          </h1>
          <p className="hidden md:flex md:text-lg">
            Great products don't happen by accident. As a digital product design
            and development agency, <br /> we partner with venture-backed
            startups and established market leaders alike, <br /> combining
            product strategy, UX/UI design, and scalable web and mobile
            development under one roof.
          </p>
        </div>
        <div className="font-semibold text-4xl mt-4 md:mt-0 md:text-5xl text-green-500">
          <p>OUR SERVICES</p>
        </div>
      </div>

      {/* Our Services */}
      <div className="mt-16 rounded-2xl  sm:p-8 md:p">
        {/* Grid matching the UI layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-r border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {SERVICES.map((card) => (
            <div
              key={card.number}
              className="group relative p-6 md:p-8 flex flex-col justify-between  min-h-[360px] transition-colors duration-300 md:hover:bg-neutral-100/40 overflow-hidden  border border-transparent md:hover:border-neutral-900"
            >
              {/* Card Header Number */}
              <div className="text-sm font-mono text-neutral-500 mb-6 relative z-20">
                {card.number}
              </div>

              {/* Video background layer with gradient overlay */}
              <div className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <video
                  src={card.videoSrc}
                  poster={card.imgSrc}
                  className="w-full h-full object-cover scale-105 md:group-hover:scale-100 transition-transform duration-700 ease-out"
                  autoPlay
                  playsInline
                  muted
                  loop
                  preload="none"
                />
                {/* Dark Vignette/Gradient overlay to make text pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
              </div>

              {/* Text overlay & Floating Arrow Button */}
              <div className="relative z-10 mt-auto pt-12 flex items-end justify-between gap-4">
                <div className="max-w-[80%]">
                  <h3 className="display-md text-2xl mb-2 text-white tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tour;
