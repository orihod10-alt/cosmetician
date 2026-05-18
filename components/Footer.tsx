import { Footer } from "@/components/ui/modem-animated-footer";
import { MessageCircle, Mail } from "lucide-react";

function IconInstagram() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FooterSection() {
  const socialLinks = [
    {
      icon: <IconInstagram />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      href: "https://wa.me/972501234567",
      label: "WhatsApp",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:contact@cosmetician.co.il",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "קוסמטיקאיות", href: "#cosmeticians" },
    { label: "שירותים", href: "#services" },
    { label: "איך זה עובד", href: "#how-it-works" },
    { label: "צור קשר", href: "https://wa.me/972501234567" },
  ];

  return (
    <Footer
      brandName="קוסמטיקאית"
      brandDescription="יופי אישי. מקצועיות אמיתית. אצלך בבית."
      socialLinks={socialLinks}
      navLinks={navLinks}
    />
  );
}
