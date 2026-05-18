import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-frank",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmetician | טיפוח יוקרתי",
  description: "מצאי את הקוסמטיקאית שלך לחוויה אישית ויוקרתית של טיפוח ויופי",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${heebo.variable}`}>
      <body className="font-body antialiased bg-bg-base text-text-primary">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
