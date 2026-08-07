"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ContactDialog } from "@/app/(marketing)/layouts/contact-dialog";

const Hero = () => {
  return (
    <div className="px-4 py- flex flex-col gap-2 justify-center">
      <p className="uppercase text-sm md:text-xl font-semibold text-zinc-600">
        Your Brand or Business Development team
      </p>
      <h1 className="md:text-5xl display-lg md:display-2xl">
        We make you the software you need <br /> to run your business and
        evolve.
      </h1>

      {/* cta */}
      <div className="flex flex-col  md:flex-row items-center gap-4 mt-5">
        <ContactDialog
          trigger={
            <Button className="h-12 w-full md:w-50 text-lg bg-green-500 display-lg">
              Contact Us <ChevronRight />
            </Button>
          }
        />
        <Button className="h-12 w-full md:w-50  text-lg display-lg">
          Our Projects <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Hero;

// import { BackgroundBoxesDemo } from "@/components/shared/backgroundboxesdemo";
// import { BentoDemo } from "@/components/shared/bentodemo";
// import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
// import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

// import { ShinyButton } from "@/components/ui/shiny-button";
// import { cn } from "@/lib/utils";
// import { ArrowRightIcon, Bot, Brain, Star } from "lucide-react";