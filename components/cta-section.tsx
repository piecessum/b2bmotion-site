"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.1 }
    )
    const reveals = sectionRef.current?.querySelectorAll(".reveal")
    reveals?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="aurora-orb w-[700px] h-[400px] bg-gradient-to-r from-[#3B82F6]/12 via-[#8B5CF6]/10 to-[#06B6D4]/12 blur-[140px] opacity-40 dark:opacity-100" style={{ animationDuration: '15s' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="reveal font-heading font-bold text-[clamp(36px,6vw,56px)] tracking-[-0.02em] text-heading mb-6">
          Готовы{" "}
          <span className="gradient-text-animated">ускорить</span>
          {" "}продажи?
        </h2>

        <p className="reveal text-lg text-subtle mb-10 max-w-xl mx-auto leading-relaxed">
          Оставьте заявку — покажем платформу и обсудим ваш проект
        </p>

        <div className="reveal mb-12">
          <a
            href="mailto:hello@b2b-dvizhenie.ru"
            className="shimmer-btn inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-lg font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 hover:brightness-110"
          >
            Запросить демо
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dim">
          <a href="tel:+74951234567" className="hover:text-body transition-colors duration-300">
            +7 (495) 123-45-67
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border-subtle" />
          <a href="mailto:hello@b2b-dvizhenie.ru" className="hover:text-body transition-colors duration-300">
            hello@b2b-dvizhenie.ru
          </a>
        </div>
      </div>
    </section>
  )
}
