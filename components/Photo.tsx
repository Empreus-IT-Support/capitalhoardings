import Image from "next/image";

/**
 * Every photo on the site is a licensed stock placeholder (see README) standing
 * in for the client's own project photography. `note` records the shot the
 * client is expected to supply so the swap is obvious later.
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
  const wash =
    overlay === "bottom" ? "photo-wash" : overlay === "side" ? "photo-wash-side" : "";

  return (
    <div
      className={`relative overflow-hidden bg-navy-ink ${wash} ${className}`}
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
