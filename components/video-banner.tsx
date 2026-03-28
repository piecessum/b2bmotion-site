"use client"

import { useEffect, useRef } from "react"
import { Play } from "lucide-react"
import Link from "next/link"

export function VideoBanner() {
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
    <section ref={sectionRef} className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/video"
          className="reveal group relative block rounded-3xl overflow-hidden glass-card"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-[#8B5CF6]/8 to-[#06B6D4]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-page/60 to-transparent" />

          {/* Animated glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-[#3B82F6]/15 to-[#8B5CF6]/15 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-8 sm:p-12">
            {/* Play button */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#3B82F6]/30 animate-ping" />
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] mb-2">
                Видео · 3 минуты
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-heading mb-2">
                Увидеть платформу в деле
              </h3>
              <p className="text-subtle text-sm sm:text-base">
                Как выглядит B2B-портал изнутри и почему клиенты выбирают нас
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
