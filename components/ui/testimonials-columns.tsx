"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="bg-white rounded-2xl p-4 md:p-8 w-full"
      style={{
        border: "1px solid oklch(15% 0.012 65 / 0.08)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      <div
        className="font-['Frank_Ruhl_Libre'] italic leading-none mb-3"
        style={{ fontSize: "3rem", color: "oklch(64% 0.07 8)", opacity: 0.4 }}
        aria-hidden
      >
        &ldquo;
      </div>
      <p
        className="font-['Heebo'] font-light text-base leading-relaxed mb-6"
        style={{ color: "oklch(15% 0.012 65 / 0.8)" }}
      >
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full object-cover flex-shrink-0"
        />
        <div>
          <p
            className="font-['Frank_Ruhl_Libre'] italic text-base"
            style={{ color: "oklch(15% 0.012 65)" }}
          >
            {testimonial.name}
          </p>
          <p
            className="font-['Heebo'] text-xs"
            style={{ color: "oklch(15% 0.012 65 / 0.5)" }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsColumn({
  testimonials,
  duration = 18,
}: {
  testimonials: Testimonial[];
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={{ flex: "1 1 0", overflow: "hidden", minWidth: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex flex-col gap-6"
        style={
          reduced
            ? undefined
            : {
                animation: `scrollUp ${duration}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }
        }
      >
        {(reduced ? testimonials : [...testimonials, ...testimonials]).map(
          (t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          )
        )}
      </div>
    </div>
  );
}
