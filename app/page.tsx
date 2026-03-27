import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LogoCloud } from "@/components/logo-cloud"
import { FeaturesBento } from "@/components/features-bento"
import { HowItWorks } from "@/components/how-it-works"
import { IndustryCases } from "@/components/industry-cases"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06060A] noise-overlay">
      <Navbar />
      <Hero />
      <LogoCloud />
      <FeaturesBento />
      <HowItWorks />
      <IndustryCases />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  )
}
