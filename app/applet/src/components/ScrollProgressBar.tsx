import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressBarProps {
  isVisible?: boolean;
}

/**
 * Subtle gold horizontal progress bar fixed at the very top of the screen
 * tracking the page scroll progress smoothly with subtle ambient glow.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ isVisible = true }) => {
  const { scrollYProgress } = useScroll();

  // Smooth physics spring for organic, silky tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Background track (nearly invisible dark gold line for subtle depth) */}
      <div className="absolute inset-0 bg-[#D4AF37]/10" />

      {/* Dynamic gold scroll progress fill with gradient and luxury ambient glow */}
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#FFF0B3] shadow-[0_0_10px_rgba(212,175,55,0.7),0_0_4px_rgba(255,240,179,0.9)]"
        style={{ scaleX }}
      />
    </div>
  );
};
