import Hero from "@/components/Hero";
import FeaturedCosmeticians from "@/components/FeaturedCosmeticians";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
// import HowItWorks from "@/components/HowItWorks";
import BookingFlow from "@/components/BookingFlow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedCosmeticians />
        <Services />
        <Testimonials />
        <BookingFlow />
      </main>
      <Footer />
    </>
  );
}
