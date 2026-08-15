"use client";
import React from "react";
import { Play, Quote, Star } from "lucide-react";

const RATINGS = [
  { source: "Clutch", score: "5.0", mark: "C" },
  { source: "DesignRush", score: "4.9", mark: "D" },
];

// TODO: add a real quote from each client, then this component will show it automatically.
const TESTIMONIALS = [
  {
    name: "Ali Abdalla",
    role: "Business Owner, Lenzro Car Hire",
    avatar: "/car.png",
    video: null,
    quote:
      "Working with the team was a great experience. They understood what we needed and delivered a professional solution that made a real difference for our business. Communication was smooth, and the final result exceeded our expectations.",
  },
  {
    name: "Abdirahman Muqtar",
    role: "Barista Manager, Islii",
    avatar: "/aa.png",
    video: null,
    quote:
      "The team was professional, responsive, and easy to work with throughout the project. They took the time to understand our needs and delivered quality work that we were genuinely happy with. I would definitely recommend working with them.",
  },
  {
    name: "Mohamed Shariif",
    role: "Advisor, Anchor Point Initiative",
    avatar: "/api.png",
    video: null,
    quote:
      "We appreciated the professionalism and attention to detail throughout our work together. The team was reliable, understood our goals, and delivered a solution that aligned well with our vision. It was a positive experience from start to finish.",
  },
];

const Community = () => {
  return (
    <section id="testimonials" className="w-full px-2 sm:px-4 md:px-8 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              What Our Clients Say
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium display-lg md:text-5xl lg:text-6xl">
              5.0 is our average <br /> on Clutch &amp; DesignRush
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name + item.role}
              className="flex flex-col gap-6 rounded-2xl bg-neutral-100 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="size-11 shrink-0 overflow-hidden rounded-full bg-neutral-300">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-black">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
              </div>

              {item.video ? (
                <button className="group relative aspect-4/3 w-full overflow-hidden rounded-xl">
                  <video
                    src={item.video}
                    poster={item.poster}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="none"
                  />
                  <span className="absolute bottom-3 left-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-105">
                    <Play className="size-3.5 fill-current" />
                  </span>
                </button>
              ) : item.quote ? (
                <div className="flex flex-1 flex-col justify-between">
                  <p className="text-lg leading-relaxed text-neutral-700">
                    {item.quote}
                  </p>
                  <Quote className="mt-6 size-6 text-neutral-300" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
