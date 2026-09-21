import Image from "next/image";
import Link from "next/link";

/**
 * Logo artwork is derived from the client's supplied JPEG with the white ground
 * knocked out, so the same files sit cleanly on white and on navy.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/mark.png"
      alt=""
      width={660}
      height={704}
      sizes="48px"
      aria-hidden
      className={className}
    />
  );
}

export default function Logo({
  variant = "light",
}: {
  /** "light" = full logo on white. "dark" = mark + white wordmark, for navy. */
  variant?: "light" | "dark";
}) {
  if (variant === "dark") {
    return (
      <Link
        href="/"
        className="flex items-center gap-3.5"
        aria-label="Capital Hoardings — home"
      >
        <LogoMark className="h-11 w-auto shrink-0" />
        <span className="font-display leading-none text-white">
          <span className="block text-2xl font-extrabold tracking-tight">
            CAPITAL
          </span>
          <span className="mt-1 block text-[0.72rem] font-medium tracking-[0.36em] text-sky">
            HOARDINGS
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="block" aria-label="Capital Hoardings — home">
      <Image
        src="/images/logo.png"
        alt="Capital Hoardings"
        width={1200}
        height={260}
        sizes="220px"
        priority
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}
