"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mode?: "reveal" | "stagger";
}

export default function RevealBlock({ children, className = "", style, mode = "reveal" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const containerClass = mode === "stagger" ? "stagger-container" : "reveal-container";

  return (
    <div ref={ref} className={`${containerClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
