import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import React from "react";

const BlackBoard = () => {
  return (
    <div className="px-10 flex flex-col gap-10">
      <div>
        <h1 className="text-xl md:text-3xl uppercase lg:text-4xl text-center">
          Introducing{" "}
          <AnimatedGradientText
            speed={2}
            colorFrom="#4ade80"
            colorTo="#06b6d4"
            className="font-semibold tracking-tight"
          >
            The BlackBoard
          </AnimatedGradientText>
        </h1>
      </div>
      <div className="md:px-10">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
};

export default BlackBoard;
