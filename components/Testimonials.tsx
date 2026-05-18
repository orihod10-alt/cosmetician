"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "./ui/testimonials-columns";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const testimonials: Testimonial[] = [
  {
    quote:
      "חיפשתי קוסמטיקאית שתבין אותי ולא תגיד לי מה עושים. נועה הקשיבה לכל מילה ויצרה בדיוק מה שרציתי. העור שלי לא נראה כל כך טוב שנים.",
    name: "מיכל כהן",
    role: "תל אביב",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&fit=crop&q=85",
  },
  {
    quote:
      "הגעתי לאיפור כלות עם המון חרדות. שיר הרגיעה אותי, עשתה את האיפור המושלם ואני הרגשתי כמו עצמי — רק הכי יפה שהייתי.",
    name: "דנה לוי",
    role: "רמת גן",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=85",
  },
  {
    quote:
      "לא האמנתי שאיפור בבית יכול להיות יותר טוב מסלון. טעיתי. האווירה, המקצועיות, התוצאה — הכל עלה על כל ציפייה.",
    name: "שירה אברהם",
    role: "הרצליה",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&fit=crop&q=85",
  },
  {
    quote:
      "מיה עשתה לי עיצוב גבות שינה את הפנים שלי. כולם שואלים מה עשיתי — ואני לא מצליחה להסביר כמה זה פשוט היה.",
    name: "רותם שמש",
    role: "פתח תקווה",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=85",
  },
  {
    quote:
      "ליאור הגיעה אליי הביתה עם כל הציוד, הריחות, המוזיקה. שעה וחצי של ספא פרטי. זה לא מותרות — זה הכרחי.",
    name: "נועה גולן",
    role: "כפר סבא",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&fit=crop&q=85",
  },
  {
    quote:
      "קיבלתי ייעוץ יופי שבאמת שינה את השגרה שלי. לא קניתי מוצרים מיותרים — למדתי מה מתאים לי. שווה כל שקל.",
    name: "תמר בן דוד",
    role: "ירושלים",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=85",
  },
  {
    quote:
      "החלטתי לפנק את עצמי ליום הולדת. הזמנתי טיפול פנים ויצאתי עם עור אחר לגמרי. בעלי לא הפסיק להגיד שאני זוהרת.",
    name: "אורית פרידמן",
    role: "נתניה",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&fit=crop&q=85",
  },
  {
    quote:
      "הייתי סקפטית לגבי איפור בבית. אחרי הפעם הראשונה לא חזרתי לסלון. הנוחות, האישיות, התוצאה — אין השוואה.",
    name: "יעל מזרחי",
    role: "ראשון לציון",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=85",
  },
  {
    quote:
      "שיר הגיעה לאיפור ערב ויצאתי מרגישה כמו מישהי אחרת — הכי טובה של עצמי. ממליצה לכל אחת לנסות.",
    name: "הילה ששון",
    role: "חיפה",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&fit=crop&q=85",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="relative overflow-hidden py-32"
      style={{ background: "oklch(96.5% 0.008 65)" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes scrollUp { from { transform: translateY(0); } to { transform: translateY(-50%); } }`,
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col items-center text-center px-8 mb-16"
      >
        <span
          className="font-['Heebo'] text-xs tracking-widest uppercase mb-6 inline-block rounded-full px-4 py-1.5"
          style={{
            border: "1px solid oklch(15% 0.012 65 / 0.15)",
            color: "oklch(15% 0.012 65 / 0.5)",
          }}
        >
          מה אומרות הלקוחות
        </span>

        <h2
          className="font-['Frank_Ruhl_Libre'] italic text-4xl md:text-5xl text-center mb-4"
          style={{ color: "oklch(15% 0.012 65)" }}
        >
          חוויות אמיתיות. תוצאות אמיתיות.
        </h2>

        <p
          className="font-['Heebo'] font-light text-base text-center max-w-md mx-auto"
          style={{ color: "oklch(15% 0.012 65 / 0.6)" }}
        >
          כל ביקורת היא סיפור של אישה שהחליטה לתת לעצמה.
        </p>
      </motion.div>

      {/* Scrolling columns */}
      <div
        className="flex justify-center gap-6 mt-10 overflow-hidden max-w-5xl mx-auto px-8 md:px-16"
        style={{
          maxHeight: "780px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <TestimonialsColumn testimonials={firstColumn} duration={18} />
        <TestimonialsColumn testimonials={secondColumn} duration={22} />
        <TestimonialsColumn testimonials={thirdColumn} duration={16} />
      </div>

      {/* Bottom fade to next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background:
            "linear-gradient(to bottom, transparent, oklch(96.5% 0.008 65))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
