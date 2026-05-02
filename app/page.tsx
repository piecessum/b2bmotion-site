import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { ClientsGlobe } from "@/components/clients-globe";
import { FeaturesBento } from "@/components/features-bento";
import { HowItWorks } from "@/components/how-it-works";
import { ScrollShowcase } from "@/components/scroll-showcase";
import { IndustryCases } from "@/components/industry-cases";
import { Testimonials } from "@/components/testimonials";
import { VideoBanner } from "@/components/video-banner";
import { Pricing } from "@/components/pricing";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollSaver } from "@/components/scroll-saver";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <ScrollSaver storageKey="home_scroll" urlKey="home_back_url" />
      <Navbar />
      <Hero />
      <LogoCloud />
      <ClientsGlobe />
      <FeaturesBento />
      <HowItWorks />
      <ScrollShowcase />
      <IndustryCases />
      <Testimonials />
      <VideoBanner />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
