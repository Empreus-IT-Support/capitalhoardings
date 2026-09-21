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
    <div className={centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className={`eyebrow flex items-center gap-3 ${centred ? "justify-center" : ""} ${
            tone === "dark" ? "text-sky" : "text-navy/55"
          }`}
        >
          <span
            className={`diamond h-1.5 w-1.5 ${tone === "dark" ? "bg-sky" : "bg-navy/40"}`}
            aria-hidden
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-display-sm mt-4 ${tone === "dark" ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-white/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
