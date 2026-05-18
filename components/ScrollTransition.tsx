"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollTransition() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -30]);

  return (
    <motion.div
      style={{
        y,
        height: "160px",
        background:
          "linear-gradient(to bottom, oklch(8% 0.008 65), oklch(35% 0.025 65))",
        marginTop: "-1px",
      }}
    />
  );
}
