import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks } from "../animate-ui/icons/blocks";
import { Clock } from "../animate-ui/icons/clock";
import { Paperclip } from "../animate-ui/icons/paperclip";
import { Send } from "../animate-ui/icons/send";

export const LoadingSequence = ({ onFinished }) => {
  const [index, setIndex] = useState(0);

  const icons = [
    {
      id: 1,
      component: <Blocks isAnimating size={64} className="text-purple-600" />,
      duration: 1500,
    },
    {
      id: 2,
      component: <Clock isAnimating size={64} className="text-amber-500" />,
      duration: 1200,
    },
    {
      id: 3,
      component: <Paperclip isAnimating size={64} className="text-sky-500" />,
      duration: 1200,
    },
    {
      id: 4,
      component: <Send isAnimating size={64} className="text-purple-500" />,
      duration: 1200,
    },
  ];

  const handleNext = () => {
    if (index === icons.length - 1) {
      // If we are at the last icon, tell the parent we are done!
      onFinished();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const current = icons[index];

  if (!current) {
    return null;
  }

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.2 } }}
          onAnimationComplete={() => {
            setTimeout(handleNext, current.duration);
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-center"
        >
          {current.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
