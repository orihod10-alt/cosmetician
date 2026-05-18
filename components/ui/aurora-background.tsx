"use client";

import React from "react";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className = "",
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: "oklch(96.5% 0.008 65)" }}
    >
      {/* Aurora layer — sits below content, above the flat background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-[10px] animate-aurora"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg," +
              " oklch(85% 0.06 8) 10%," +
              " oklch(90% 0.04 50) 15%," +
              " oklch(93% 0.03 80) 20%," +
              " oklch(88% 0.05 20) 25%," +
              " oklch(92% 0.02 60) 30%)",
            backgroundSize: "400% 400%",
            backgroundPosition: "50% 50%",
            filter: "blur(12px)",
            opacity: 0.45,
            willChange: "background-position",
            ...(showRadialGradient && {
              maskImage:
                "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
            }),
          }}
        />
      </div>

      {/* Content renders above aurora layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
