"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

/**
 * Fades content in once as it scrolls into view. The transform is set inline so
 * each instance can move from a different direction; `.reveal` in globals.css
 * neutralises all of it under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 22,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Safety net: if the observer never fires — some embedded browsers and
    // headless renderers never report intersection — the content would stay
    // invisible for good. Reveal it on a timer regardless.
    const fallback = window.setTimeout(() => setShown(true), 1200);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          window.clearTimeout(fallback);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  const from: Record<Direction, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    scale: "scale(0.94)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? undefined : from[direction],
      }}
    >
      {children}
    </div>
  );
}
