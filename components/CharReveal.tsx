"use client";

import { useEffect, useRef, useState } from "react";

/** Stat values assemble character by character when the band scrolls in. */
export default function CharReveal({
  text,
  className = "",
  delay = 0,
  step = 35,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden
          className="char-rise inline-block"
          style={{
            transitionDelay: `${delay + i * step}ms`,
            transform: shown ? "none" : "translateY(0.5em)",
            opacity: shown ? 1 : 0,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
