"use client";

import { Pen, Home, PenTool, PaintBucket, Ruler, Building2 } from "lucide-react";
import { AboutUsSection } from "./ui/about-us-section";

const ACCENT = "oklch(64% 0.07 8)";

export default function FeaturedCosmeticians() {
  return (
    <div style={{ position: "relative" }}>
    <AboutUsSection
      id="cosmeticians"
      eyebrow="מי אנחנו"
      title="לא סלון. לא רשת. רק מקצוענית שמגיעה אליך."
      description="מצאנו את הקוסמטיקאיות הכי טובות בתל אביב — כאלה שעובדות לבד, אוהבות את מה שהן עושות, ויוצרות חוויה שלא מרגישה כמו תור אצל קוסמטיקאית. מרגישה כמו זמן לעצמך."
      imageUrl="https://videos.pexels.com/video-files/6813067/6813067-uhd_1440_2496_30fps.mp4"
      imageAlt=""
      imageButtonText="הכירי אותן"
      onImageButtonClick={() => {
        const el = document.getElementById("how-it-works");
        el?.scrollIntoView({ behavior: "smooth" });
      }}
      servicesRight={[
        {
          Icon: PaintBucket,
          title: "איפור כלות וערב",
          description:
            "ביום הכי חשוב — את לא רוצה לחשוב על האיפור. את רוצה להרגיש את עצמך, רק יפה יותר. אנחנו על זה.",
        },
        {
          Icon: Ruler,
          title: "טיפולי גוף וספא",
          description:
            "שעה אחת שכל המחשבות עוצרות. עיסוי, טיפול, נשימה. הקוסמטיקאית מגיעה אליך — הכל כבר מוכן.",
        },
        {
          Icon: Building2,
          title: "ייעוץ יופי אישי",
          description:
            "לא יודעת מה מתאים לך? אנחנו כן. שיחה אחת עם מקצוענית שתבנה לך שגרת טיפוח שתעשי בפועל.",
        },
      ]}
      servicesLeft={[
        {
          Icon: Pen,
          title: "איפור יומי ועורפי",
          description:
            "איפור שנראה כאילו לא עשית כלום, ומרגיש כמו הגרסה הכי טובה של עצמך. לא מסכה — אופי.",
        },
        {
          Icon: Home,
          title: "טיפולי עור ופנים",
          description:
            "טיפול שמתחיל בשיחה ומסתיים בעור שאת לא מפסיקה לגעת בו. כל מוצר, כל תנועה — בשבילך.",
        },
        {
          Icon: PenTool,
          title: "גבות וריסים",
          description:
            "מסגרת שמשנה הכל. גבה שנולדת איתו, ריסים שפותחים את המבט — בלי שיראו שעשית כלום.",
        },
      ]}
      stats={[
        { value: "50+", label: "קוסמטיקאיות נבחרות" },
        { value: "500+", label: "לקוחות שחזרו" },
        { value: "98%", label: "ממליצות לחברה" },
        { value: "4.9", label: "דירוג ממוצע" },
      ]}
      accentColor={ACCENT}
      bgGradientFrom="oklch(35% 0.025 65)"
      bgGradientTo="oklch(30% 0.02 65)"
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40px",
        background:
          "linear-gradient(to bottom, transparent, oklch(96.5% 0.008 65) 80%)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
    </div>
  );
}
