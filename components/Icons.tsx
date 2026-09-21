type IconProps = { className?: string };

const base = "none";
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" fill={base} className={className} aria-hidden>
      {children}
    </svg>
  );
}

export function IconLocation({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M16 28s9-7.4 9-14a9 9 0 1 0-18 0c0 6.6 9 14 9 14Z" {...stroke} />
      <circle cx="16" cy="14" r="3.4" {...stroke} />
    </Frame>
  );
}

export function IconCraft({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="m19.5 6.5 6 6-3 3-6-6 3-3Z" {...stroke} />
      <path d="m16.5 9.5-11 11V26h5.5l11-11" {...stroke} />
      <path d="m8 18 6 6" {...stroke} />
    </Frame>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="16" cy="16" r="11" {...stroke} />
      <path d="M16 9.5V16l4.5 3" {...stroke} />
    </Frame>
  );
}

export function IconPanel({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M5 8h22v16H5z" {...stroke} />
      <path d="M12.3 8v16M19.7 8v16" {...stroke} />
      <path d="M8 24v3M24 24v3" {...stroke} />
    </Frame>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M16 4.5 6.5 8.2v7.1c0 6 4 10.8 9.5 12.2 5.5-1.4 9.5-6.2 9.5-12.2V8.2L16 4.5Z" {...stroke} />
      <path d="m12 15.8 3 3 5.5-5.6" {...stroke} />
    </Frame>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="m16 5 2.6 7.4L26 15l-7.4 2.6L16 25l-2.6-7.4L6 15l7.4-2.6L16 5Z" {...stroke} />
    </Frame>
  );
}

export function IconModular({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M5 6h10v10H5zM17 16h10v10H17z" {...stroke} />
      <path d="M17 6h10v6H17zM5 20h10v6H5z" {...stroke} />
    </Frame>
  );
}

export function IconWeight({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M11 11h10l3 15H8l3-15Z" {...stroke} />
      <path d="M13 11V8.5a3 3 0 0 1 6 0V11" {...stroke} />
    </Frame>
  );
}

export function IconHeight({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M16 5v22" {...stroke} />
      <path d="m11.5 9.5 4.5-4.5 4.5 4.5M11.5 22.5 16 27l4.5-4.5" {...stroke} />
      <path d="M6 5h4M6 27h4M22 5h4M22 27h4" {...stroke} />
    </Frame>
  );
}

export function IconFlame({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M16 4s6.5 6 6.5 12.5a6.5 6.5 0 0 1-13 0C9.5 13 12 11 12 11s.5 3 2 3c2.2 0 2-6 2-10Z" {...stroke} />
    </Frame>
  );
}

export function IconBrand({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M5 7h22v14H5z" {...stroke} />
      <path d="m5 17 6-5 5 4 4-3 7 5" {...stroke} />
      <circle cx="21" cy="11.5" r="1.8" {...stroke} />
      <path d="M11 25h10" {...stroke} />
    </Frame>
  );
}

export function IconStand({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M9 5h14v18H9z" {...stroke} />
      <path d="M5 23h22M12 23v4M20 23v4" {...stroke} />
    </Frame>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" {...stroke} />
    </svg>
  );
}
