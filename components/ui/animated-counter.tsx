"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Digit — single slot-machine column for STATIC values.
// Animates from 0 → `value` on mount (no backward wrap-around).
export function Digit({
  value,
  fontSize = 36,
}: {
  value: number;
  fontSize?: number;
}) {
  const lineH = Math.round(fontSize * 1.2);

  return (
    <span
      style={{
        display: "inline-block",
        height: lineH,
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: -(value * lineH) }}
        transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.9 }}
        style={{
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span
            key={d}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: lineH,
              fontSize,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// Number — renders each numeral of a static value as a Digit slot column.
export function Number({
  value,
  fontSize = 36,
}: {
  value: number;
  fontSize?: number;
}) {
  const chars = String(value).split("");
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {chars.map((ch, i) => (
        <Digit key={i} value={parseInt(ch, 10)} fontSize={fontSize} />
      ))}
    </span>
  );
}

// Counter — smoothly counts from 0 → `end` when scrolled into view.
// `duration` is in 0.1-second units (15 → 1.5 s, 20 → 2 s).
export function Counter({
  end,
  duration = 15,
  fontSize = 36,
  className,
}: {
  end: number;
  duration?: number;
  fontSize?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(end);
      return;
    }
    const c = animate(0, end, {
      duration: duration * 0.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, end, duration, reduced]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontSize,
        fontVariantNumeric: "tabular-nums",
        fontFamily: "inherit",
        display: "inline-block",
        minWidth: `${String(end).length}ch`,
        textAlign: "right",
      }}
    >
      {count}
    </span>
  );
}
