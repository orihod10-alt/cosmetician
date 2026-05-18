"use client";

import { useState, useEffect } from "react";

const WA_LINK =
  "https://wa.me/972501234567?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%95%D7%A2%20%D7%AA%D7%95%D7%A8";

const NAV_LINKS = [
  { href: "#cosmeticians", label: "קוסמטיקאיות" },
  { href: "#services", label: "שירותים" },
  { href: "#how-it-works", label: "איך זה עובד" },
];

const TRANSITION = "background 0.4s ease, color 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, box-shadow 0.4s ease";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pillStyle = scrolled
    ? {
        background: "rgba(245,240,232,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.06)",
      }
    : {
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      };

  return (
    <header
      dir="rtl"
      className="fixed inset-x-0 top-4 z-50 px-6 md:px-8"
      style={{ pointerEvents: "none" }}
    >
      <nav
        className="flex items-center justify-between max-w-[1440px] mx-auto"
        style={{ pointerEvents: "auto" }}
      >
        {/* Right: wordmark */}
        <a
          href="/"
          className="rounded-full font-display font-light tracking-[0.1em] text-base px-4 py-2 no-underline"
          style={{
            ...pillStyle,
            color: scrolled ? "oklch(16% 0.008 50)" : "white",
            transition: TRANSITION + ", color 0.4s ease",
          }}
        >
          קוסמטיקאית
        </a>

        {/* Center: nav links — desktop only */}
        <div
          className="hidden md:flex items-center gap-1 rounded-full"
          style={{
            padding: "6px 8px",
            ...pillStyle,
            transition: TRANSITION,
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-body text-sm px-4 py-1.5 rounded-full no-underline"
              style={{
                color: scrolled ? "oklch(30% 0.008 50)" : "rgba(255,255,255,0.9)",
                transition: "background-color 0.2s ease, color 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = scrolled
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Left: CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full font-body text-sm px-5 py-2.5 no-underline"
          style={{
            ...pillStyle,
            color: scrolled ? "oklch(16% 0.008 50)" : "rgba(255,255,255,0.9)",
            transition: TRANSITION + ", transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "";
          }}
        >
          הזמיני עכשיו
        </a>
      </nav>
    </header>
  );
}
