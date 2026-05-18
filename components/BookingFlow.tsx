"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  Eye,
  Crown,
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

const ACCENT = "oklch(64% 0.07 8)";
const WA_GREEN = "oklch(52% 0.16 148)";
const CARD_BG = "oklch(99% 0.003 65)";
const BORDER = "oklch(88% 0.006 65)";
const TEXT = "oklch(22% 0.012 65)";
const MUTED = "oklch(54% 0.008 65)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TREATMENTS = [
  { id: "makeup", label: "איפור", Icon: Sparkles },
  { id: "facial", label: "טיפולי פנים", Icon: Heart },
  { id: "brows", label: "גבות וריסים", Icon: Eye },
  { id: "bridal", label: "איפור כלות", Icon: Crown },
] as const;

const COSMETICIANS = [
  {
    id: "noa",
    name: "נועה לוי",
    specialty: "טיפולי עור ופנים",
    location: "תל אביב",
    price: "החל מ-₪280",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&fit=crop&q=85",
  },
  {
    id: "shir",
    name: "שיר אבידן",
    specialty: "עיצוב גבות וריסים",
    location: "רמת גן",
    price: "החל מ-₪180",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=85",
  },
  {
    id: "mia",
    name: "מיה כהן",
    specialty: "איפור כלות וערב",
    location: "תל אביב",
    price: "החל מ-₪450",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&fit=crop&q=85",
  },
  {
    id: "lior",
    name: "ליאור שמש",
    specialty: "טיפולי גוף וספא",
    location: "הרצליה",
    price: "החל מ-₪320",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&fit=crop&q=85",
  },
] as const;

type TreatmentId = (typeof TREATMENTS)[number]["id"];
type CosmeticianId = (typeof COSMETICIANS)[number]["id"];

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-14">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center">
          <motion.div
            className="h-2 w-2 rounded-full"
            animate={{ backgroundColor: i <= step ? ACCENT : BORDER }}
            transition={{ duration: 0.25 }}
          />
          {i < 2 && (
            <div
              className="mx-3 h-px w-20 relative overflow-hidden rounded-full"
              style={{ backgroundColor: BORDER }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: ACCENT, transformOrigin: "right" }}
                animate={{ scaleX: step > i ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h2
        className="font-display font-light leading-tight"
        style={{
          fontSize: "clamp(1.7rem, 4vw, 2.1rem)",
          fontStyle: "italic",
          letterSpacing: "-0.02em",
          color: TEXT,
        }}
      >
        {title}
      </h2>
      <p className="font-body text-sm mt-2 font-light" style={{ color: MUTED }}>
        {sub}
      </p>
    </div>
  );
}

function TreatmentCard({
  t,
  selected,
  onSelect,
  index,
}: {
  t: (typeof TREATMENTS)[number];
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: EASE }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="relative rounded-2xl p-6 text-right cursor-pointer"
      style={{
        backgroundColor: selected ? ACCENT : CARD_BG,
        border: `1px solid ${selected ? "transparent" : hov ? ACCENT : BORDER}`,
        color: selected ? "oklch(98% 0.002 65)" : TEXT,
        transition: "background-color 0.18s, border-color 0.18s, color 0.18s",
      }}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.22)" }}
        >
          <Check size={11} />
        </motion.span>
      )}
      <t.Icon size={32} className="mb-3" style={{ opacity: selected ? 0.9 : 0.6 }} />
      <p className="font-body font-medium text-sm">{t.label}</p>
    </motion.button>
  );
}

function CosmeticianCard({
  c,
  selected,
  onSelect,
  index,
}: {
  c: (typeof COSMETICIANS)[number];
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: EASE }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="relative rounded-2xl overflow-hidden text-right cursor-pointer"
      style={{
        border: `1.5px solid ${selected ? ACCENT : hov ? ACCENT : BORDER}`,
        backgroundColor: CARD_BG,
        transition: "border-color 0.18s",
      }}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: ACCENT }}
        >
          <Check size={12} color="white" />
        </motion.span>
      )}
      <div className="relative aspect-square">
        <Image
          src={c.img}
          alt={c.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 280px"
        />
      </div>
      <div className="p-4">
        <p
          className="font-display font-light text-lg leading-snug mb-1"
          style={{ fontStyle: "italic", color: TEXT }}
        >
          {c.name}
        </p>
        <p className="font-body text-xs mb-0.5" style={{ color: MUTED }}>
          {c.specialty}
        </p>
        <p className="font-body text-xs mb-2" style={{ color: MUTED }}>
          {c.location}
        </p>
        <p className="font-body text-xs font-semibold" style={{ color: ACCENT }}>
          {c.price}
        </p>
      </div>
    </motion.button>
  );
}

const stepOut = { opacity: 0, y: -20 };
const stepIn = { opacity: 0, y: 20 };
const stepCenter = { opacity: 1, y: 0 };

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<TreatmentId | null>(null);
  const [cosmetician, setCosmetician] = useState<CosmeticianId | null>(null);

  const selectedT = TREATMENTS.find((t) => t.id === treatment);
  const selectedC = COSMETICIANS.find((c) => c.id === cosmetician);
  const canNext = (step === 0 && !!treatment) || (step === 1 && !!cosmetician);

  const openWA = () => {
    const msg =
      `היי! ראיתי את האתר ואני מעוניינת לתאם תור.\n` +
      `סוג טיפול: ${selectedT?.label}\n` +
      `קוסמטיקאית: ${selectedC?.name}\n` +
      `מחיר התחלתי: ${selectedC?.price}\n` +
      `מתי אפשר?`;
    window.open(`https://wa.me/972501234567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      id="how-it-works"
      dir="rtl"
      className="py-32"
      style={{ backgroundColor: "oklch(96.5% 0.008 65)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <StepDots step={step} />

        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={stepIn}
                animate={stepCenter}
                exit={stepOut}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Heading title="איזה טיפול את מחפשת?" sub="בחרי את הסוג שמדבר אליך" />
                <div className="grid grid-cols-2 gap-4">
                  {TREATMENTS.map((t, i) => (
                    <TreatmentCard
                      key={t.id}
                      t={t}
                      index={i}
                      selected={treatment === t.id}
                      onSelect={() => setTreatment(t.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={stepIn}
                animate={stepCenter}
                exit={stepOut}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Heading title="בחרי את הקוסמטיקאית שלך" sub="כל אחת עם עולם משלה" />
                <div className="grid grid-cols-2 gap-4">
                  {COSMETICIANS.map((c, i) => (
                    <CosmeticianCard
                      key={c.id}
                      c={c}
                      index={i}
                      selected={cosmetician === c.id}
                      onSelect={() => setCosmetician(c.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && selectedT && selectedC && (
              <motion.div
                key="s2"
                initial={stepIn}
                animate={stepCenter}
                exit={stepOut}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Heading
                  title="מצוין! בואי נסכם"
                  sub="הפרטים שלך מועברים ישירות לוואטסאפ"
                />
                <div
                  className="rounded-2xl p-8 border"
                  style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
                >
                  <Row label="סוג הטיפול">{selectedT.label}</Row>
                  <Divider />
                  <Row label="הקוסמטיקאית">
                    <span style={{ fontStyle: "italic", color: TEXT }} className="font-display font-light text-xl">
                      {selectedC.name}
                    </span>
                    <span className="font-body text-xs block mt-0.5" style={{ color: MUTED }}>
                      {selectedC.specialty} · {selectedC.location}
                    </span>
                  </Row>
                  <Divider />
                  <Row label="מחיר התחלתי">
                    <span
                      className="font-display font-light"
                      style={{ fontSize: "1.5rem", fontStyle: "italic", color: TEXT }}
                    >
                      {selectedC.price}
                    </span>
                  </Row>
                </div>

                <button
                  onClick={openWA}
                  className="w-full mt-6 flex items-center justify-center gap-3 rounded-full font-body font-medium text-base"
                  style={{
                    backgroundColor: WA_GREEN,
                    color: "oklch(98% 0.003 65)",
                    padding: "16px 32px",
                    cursor: "pointer",
                  }}
                >
                  <MessageCircle size={20} />
                  המשיכי לוואטסאפ ←
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex gap-3 mt-8">
          <AnimatePresence>
            {step > 0 && (
              <motion.button
                key="back"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: EASE }}
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 rounded-full font-body text-sm"
                style={{
                  padding: "12px 24px",
                  border: `1px solid ${BORDER}`,
                  color: MUTED,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <ArrowRight size={15} />
                חזרה
              </motion.button>
            )}
          </AnimatePresence>

          {step < 2 && (
            <motion.button
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className="flex-1 flex items-center justify-center gap-2 rounded-full font-body font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                padding: "12px 32px",
                backgroundColor: ACCENT,
                color: "oklch(98% 0.003 65)",
                cursor: canNext ? "pointer" : "not-allowed",
              }}
            >
              המשיכי
              <ArrowLeft size={15} />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-body text-sm shrink-0" style={{ color: MUTED }}>
        {label}
      </span>
      <div className="text-start font-display font-light text-xl" style={{ fontStyle: "italic", color: TEXT }}>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-px" style={{ backgroundColor: BORDER }} />;
}
