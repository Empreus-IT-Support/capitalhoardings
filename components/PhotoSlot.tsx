import { LogoMark } from "./Logo";

/**
 * Placeholder for client photography. The brief marks several sections
 * "Add photos on this page – to be provided", so every image position is
 * stubbed here — drop an <Image> in place of this component once supplied.
 */
export default function PhotoSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`photo-slot flex flex-col items-center justify-center gap-3 rounded border border-line p-8 text-center ${className}`}
    >
      <LogoMark className="h-10 w-auto opacity-30" />
      <p className="max-w-[26ch] text-xs font-medium uppercase tracking-[0.18em] text-navy/55">
        {label}
      </p>
    </div>
  );
}
