"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function DeviceShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Glow behind devices */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#3B82F6]/8 via-[#8B5CF6]/6 to-[#06B6D4]/8 blur-[120px] pointer-events-none opacity-40 dark:opacity-100" />

      <div className="max-w-6xl mx-auto">
        {/* Devices container with perspective */}
        <div
          className="relative flex items-end justify-center mb-16"
          style={{ perspective: "1200px" }}
        >
          {/* iPad — left */}
          <div
            className="relative z-10 -mr-8 md:-mr-12 lg:-mr-16 self-center transition-all ease-out"
            style={{
              transitionDuration: "1.2s",
              transitionDelay: "200ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateZ(0) translateX(0) scale(1)"
                : "translateZ(-300px) translateX(-60px) scale(0.8)",
            }}
          >
            <div className="w-[200px] md:w-[280px] lg:w-[340px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/pad.png"
                alt="B2B платформа на планшете"
                width={680}
                height={510}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Laptop — center */}
          <div
            className="relative z-20 transition-all ease-out"
            style={{
              transitionDuration: "1.2s",
              transitionDelay: "0ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateZ(0) translateY(0) scale(1)"
                : "translateZ(-400px) translateY(40px) scale(0.7)",
            }}
          >
            <div className="w-[300px] md:w-[440px] lg:w-[540px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src="/laptop-hero.png"
                alt="B2B платформа на ноутбуке"
                width={1080}
                height={720}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Phone — right */}
          <div
            className="relative z-10 -ml-8 md:-ml-12 lg:-ml-16 self-center transition-all ease-out"
            style={{
              transitionDuration: "1.2s",
              transitionDelay: "400ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateZ(0) translateX(0) scale(1)"
                : "translateZ(-300px) translateX(60px) scale(0.8)",
            }}
          >
            <div className="w-[90px] md:w-[130px] lg:w-[160px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/phone.png"
                alt="B2B платформа на смартфоне"
                width={320}
                height={640}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text below */}
        <div className="text-center">
          <p
            className="font-heading font-bold text-[clamp(48px,8vw,72px)] tracking-[-0.03em] mb-4 transition-all duration-1000 ease-out"
            style={{
              transitionDelay: "600ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <span className="gradient-text-animated">3 месяца</span>
          </p>
          <p
            className="text-xl md:text-2xl text-body mb-10 transition-all duration-1000 ease-out"
            style={{
              transitionDelay: "700ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            и у вас готовый к использованию магазин
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 border border-overlay-8 text-subheading text-base font-medium rounded-2xl hover:bg-overlay-4 hover:border-border-default transition-all duration-300"
            style={{
              transitionDelay: "800ms",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  )
}
