export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const centred = align === "center";
  return (
    <div className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            tone === "dark" ? "text-sky" : "text-navy/60"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl sm:text-4xl ${
          tone === "dark" ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed ${
            tone === "dark" ? "text-white/75" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
