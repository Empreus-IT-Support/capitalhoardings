"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

/**
 * Reveals a headline word by word.
 *
 * Deliberately animates opacity only. An earlier version slid each word up from
 * behind an overflow-hidden mask, which meant every word became its own
 * transformed compositing layer — on the dark heroes that reliably knocked out
 * the whole headline (and sometimes the photo behind it). A staggered fade
 * reads almost the same and composites as ordinary text.
 *
 * `highlight` words are tinted sky — used for the second line of the hero.
 */
export default function WordReveal({
  text,
  as: Tag = "h1",
  className = "",
  highlightFrom,
  delay = 0,
  step = 70,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Index of the first word to tint sky, if any. */
  highlightFrom?: number;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const tinted = highlightFrom !== undefined && i >= highlightFrom;
        const breakAfter = word.endsWith("\n");
        return (
          <span key={`${word}-${i}`}>
            <span
              className={`word-rise ${tinted ? "text-sky" : ""}`}
              style={{
                transitionDelay: `${delay + i * step}ms`,
                opacity: shown ? 1 : 0,
              }}
            >
              {word.replace("\n", "")}
            </span>
            {breakAfter ? <br /> : " "}
          </span>
        );
      })}
    </Tag>
  );
}
