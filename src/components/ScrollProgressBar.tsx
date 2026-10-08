import React, { useEffect, useRef } from "react";

interface ScrollProgressBarProps {
  isVisible?: boolean;
}

/**
 * Zero-dependency, GPU-accelerated gold horizontal progress bar fixed at the top of the screen.
 * Avoids pulling 271 KB of motion/framer-motion into the critical initial bundle.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ isVisible = true }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      if (!barRef.current) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#D4AF37]/10" />
      <div
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#FFF0B3] shadow-[0_0_10px_rgba(212,175,55,0.7),0_0_4px_rgba(255,240,179,0.9)] transition-transform duration-150 ease-out will-change-transform"
      />
    </div>
  );
};
