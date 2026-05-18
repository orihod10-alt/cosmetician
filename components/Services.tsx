"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ACCENT = "oklch(64% 0.07 8)";
const FG = "oklch(15% 0.012 65)";
const FG_NUM = "oklch(15% 0.012 65 / 0.08)";
const FG_NUM_HOVER = "oklch(15% 0.012 65 / 0.2)";
const FG_MUTED = "oklch(15% 0.012 65 / 0.65)";
const FG_PLUS = "oklch(15% 0.012 65 / 0.3)";
const FG_DIVIDER = "oklch(15% 0.012 65 / 0.08)";
const BG_OPEN = "oklch(93% 0.012 65)";
const BG_HOVER = "oklch(95.5% 0.009 65)";

const SERVICES = [
  {
    number: "01",
    name: "איפור",
    description:
      "טכניקות איפור מקצועיות שמדגישות את הטבעיות שלך ומתאימות בדיוק לסגנון שלך. כל מוצר נבחר בקפידה עבורך.",
    price: "החל מ-₪250",
  },
  {
    number: "02",
    name: "טיפולי פנים",
    description:
      "טיפול שמתחיל בשיחה ומסתיים בעור שאת לא מפסיקה לגעת בו. מותאם לסוג העור שלך עם מוצרים מהמותגים המובילים.",
    price: "החל מ-₪280",
  },
  {
    number: "03",
    name: "גבות וריסים",
    description:
      "עיצוב גבות מדויק ועיבוי ריסים שמסגרים את המבט שלך — בלי שיראו שעשית כלום.",
    price: "החל מ-₪180",
  },
  {
    number: "04",
    name: "איפור כלות וערב",
    description:
      "ביום הכי חשוב — חוויה בלתי נשכחת שנשארת יפה לאורך כל היום.",
    price: "החל מ-₪450",
  },
  {
    number: "05",
    name: "טיפולי גוף",
    description:
      "שעה אחת שכל המחשבות עוצרות. מגיעים אליך הביתה עם מגע מקצועי ואווירה של ספא פרטי.",
    price: "החל מ-₪320",
  },
  {
    number: "06",
    name: "ייעוץ יופי אישי",
    description:
      "שיחה אחת עם מקצוענית שתבנה לך שגרת טיפוח נכונה שתעשי בפועל.",
    price: "החל מ-₪150",
  },
];

type Service = (typeof SERVICES)[number];

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();

  const bgColor = isOpen ? BG_OPEN : isHovered ? BG_HOVER : "transparent";

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      style={{
        position: "relative",
        borderTop: `1px solid ${FG_DIVIDER}`,
        backgroundColor: bgColor,
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Row trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-between py-7 px-2 cursor-pointer"
      >
        {/* Number — DOM first = visual right in RTL */}
        <span
          className="font-['Frank_Ruhl_Libre'] italic leading-none w-20 text-right flex-shrink-0"
          style={{
            fontSize: "3.75rem",
            color: isHovered || isOpen ? FG_NUM_HOVER : FG_NUM,
            transition: "color 0.3s ease",
          }}
          aria-hidden
        >
          {service.number}
        </span>

        {/* Service name — center */}
        <motion.span
          animate={{ x: isHovered && !isOpen ? -6 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-['Frank_Ruhl_Libre'] italic text-2xl md:text-3xl flex-1 px-6"
          style={{ color: FG }}
        >
          {service.name}
        </motion.span>

        {/* Plus icon — DOM last = visual left in RTL */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex-shrink-0"
        >
          <Plus size={20} style={{ color: FG_PLUS }} />
        </motion.div>
      </div>

      {/* Hover/open accent underline — grows from right (RTL) */}
      <motion.div
        animate={{ scaleX: isHovered || isOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: ACCENT,
          transformOrigin: "right",
          pointerEvents: "none",
        }}
      />

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: EASE },
              opacity: { duration: 0.3 },
            }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pb-10 pr-20 pl-4"
            >
              <p
                className="font-['Heebo'] font-light text-base leading-relaxed max-w-lg mb-5"
                style={{ color: FG_MUTED }}
              >
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="font-['Frank_Ruhl_Libre'] italic text-2xl"
                  style={{ color: FG }}
                >
                  {service.price}
                </span>
                <a
                  href="https://wa.me/972501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-['Heebo'] rounded-full px-5 py-2"
                  style={{
                    border: `1px solid ${ACCENT}`,
                    color: ACCENT,
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = ACCENT;
                    el.style.color = "oklch(97% 0.005 65)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = ACCENT;
                  }}
                >
                  הזמיני תור ←
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden py-32 md:py-40"
      style={{ background: "oklch(96.5% 0.008 65)" }}
    >
      {/* Watermark number */}
      <span
        className="font-['Frank_Ruhl_Libre'] italic absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none"
        style={{ fontSize: "160px", color: "oklch(15% 0.012 65 / 0.03)" }}
        aria-hidden
      >
        06
      </span>

      <div className="max-w-5xl mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className="font-['Heebo'] text-[11px] tracking-[0.25em] uppercase mb-6"
            style={{ color: "oklch(15% 0.012 65 / 0.4)" }}
          >
            השירותים שלנו
          </p>

          <motion.h2
            ref={headingRef}
            initial={
              reduced ? false : { opacity: 0, y: 30, filter: "blur(10px)" }
            }
            animate={
              headingInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 0.9, ease: EASE }}
            className="font-['Frank_Ruhl_Libre'] italic text-4xl md:text-5xl"
            style={{ color: FG }}
          >
            מה שגוף ונפש צריכים
          </motion.h2>
        </div>

        {/* Accordion list */}
        <div style={{ borderBottom: `1px solid ${FG_DIVIDER}` }}>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
