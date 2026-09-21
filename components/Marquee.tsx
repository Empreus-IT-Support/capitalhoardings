const items = [
  "Construction hoarding",
  "Pedestrian protection",
  "Site screening",
  "Branded hoarding",
  "Retail fit-outs",
  "Public protection",
  "Temporary enclosures",
  "Site security",
];

/** Capability strip. Duplicated once so the -50% translate loops seamlessly. */
export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-white py-5">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 whitespace-nowrap px-8 text-sm font-semibold uppercase tracking-[0.18em] text-navy/70"
              >
                {item}
                <span className="h-1.5 w-1.5 rotate-45 bg-sky" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
