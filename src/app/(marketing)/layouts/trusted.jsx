"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

const Trusted = () => {
  const solutions = [
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/4.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/7.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/1.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/2.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/8.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/5.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/10.png" },
    { icon: "https://notus-agent-marketing-template.vercel.app/logos/6.png" },
  ];

  return (
    <div className="flex flex-col items-center mt-10 md:mt-0">
      {/* Title */}
      <div className="w-full flex items-center justify-center mb-6">
        <p className="uppercase MPlusOne gradient-text text-sm">
          Trusted by Fast Growing Startups and Businesses
        </p>
      </div>

      {/* Scrolling logos */}
      <div className="relative flex w-full items-center justify-center overflow-hidden">
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={5} direction={1}>
            {solutions.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative h-[14vh] flex items-center justify-center mx-6 group will-change-transform"
                whileHover="hover"
                initial="initial"
              >
                {/* Animated overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full opacity-10 z-10 will-change-transform"
                  variants={{
                    hover: { height: "100%" },
                    initial: { height: 0 },
                  }}
                  style={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Icon */}
                <img
                  alt="logo"
                  className="relative z-20 object-contain transition-all duration-500 dark:invert dark:filter h-10 w-25 group-hover:brightness-125"
                  src={item.icon}
                  style={{ willChange: "transform, opacity" }}
                />
              </motion.div>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        {/* Gradient fade edges */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </div>
  );
};

export default Trusted;
