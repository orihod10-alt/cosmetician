"use client";

import { useRef, useState } from "react";

type GlowColorKey = "red" | "blue" | "green" | "purple" | "rose" | "amber";

const glowColorMap: Record<GlowColorKey, { base: number; spread: number }> = {
  red:    { base: 0,   spread: 100 },
  blue:   { base: 220, spread: 100 },
  green:  { base: 140, spread: 100 },
  purple: { base: 280, spread: 100 },
  rose:   { base: 10,  spread: 80  },
  amber:  { base: 35,  spread: 100 },
};

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: GlowColorKey;
  customSize?: boolean;
  className?: string;
}

export function GlowCard({
  children,
  glowColor = "rose",
  customSize = false,
  className = "",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const { base, spread } = glowColorMap[glowColor];

  return (
    <div
      ref={ref}
      className={`relative ${customSize ? className : "rounded-xl"}`}
      style={{
        padding: "1.5px",
        backgroundColor: "oklch(14% 0.012 65)",
      }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow gradient — tracks mouse, fades on leave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(${spread * 4}px circle at ${pos.x}px ${pos.y}px, hsl(${base} 65% 62%), transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Content */}
      <div className="relative overflow-hidden w-full h-full">
        {children}
      </div>
    </div>
  );
}
