import Image from "next/image";

/**
 * Every photo on the site is a licensed stock placeholder (see README) standing
 * in for the client's own project photography. `note` records the shot the
 * client is expected to supply so the swap is obvious later.
 *
 * `fill` needs a positioned ancestor, so the wrapper is `relative` by default —
 * but a caller that positions the wrapper itself (`absolute inset-0`) would end
 * up with two competing `position` utilities and a zero-height box, so in that
 * case we leave the positioning to them.
 */
export default function Photo({
  src,
  alt,
  note,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  overlay = "none",
}: {
  src: string;
  alt: string;
  /** What the client should replace this with. Rendered as a title attribute. */
  note?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: "none" | "bottom" | "side";
}) {
  const selfPositioned = /\b(absolute|fixed|sticky)\b/.test(className);
  const wash =
    overlay === "bottom"
      ? "photo-wash"
      : overlay === "side"
        ? "photo-wash-side"
        : "";

  return (
    <div
      className={`${selfPositioned ? "" : "relative"} overflow-hidden bg-navy-ink ${wash} ${className}`}
      title={note}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
