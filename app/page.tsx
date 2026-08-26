import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Platforms />
      <Features />
      <ShowcaseCarousel />
      <Comparison />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
