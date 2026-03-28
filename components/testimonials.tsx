"use client"

import { useEffect, useRef } from "react"
import { Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote: "Запуск прошёл быстро и без бюрократии. Поддержка реагирует оперативно. Надёжный технологический партнёр.",
    company: "РЭЙД-21",
    industry: "FMCG",
    logo: "/raid21.svg",
  },
  {
    quote: "По удобству интерфейса мы не уступаем маркетплейсам, а в ряде сценариев превосходим их.",
    company: "ХОГАРТ",
    industry: "Сантехника",
    logo: "/hogart.svg",
  },
  {
    quote: "Платформа стала обязательным инструментом продаж. Поддержка доводит задачи до результата.",
    company: "ПРОТЭК",
    industry: "Безопасность",
    logo: "/protek.svg",
  },
  {
    quote: "Гибко управляем ассортиментом: акции, контент, обновление наличия — всё оперативно.",
    company: "Древиз",
    industry: "Мебель",
    logo: "/dreviz.svg",
  },
]

export function Testimonials() {
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
    <section ref={sectionRef} id="reviews" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
            Что говорят <span className="gradient-text">наши клиенты</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden"
            >
              {/* Left accent line */}
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#3B82F6]/[0.06] group-hover:text-[#3B82F6]/[0.1] transition-colors duration-500" />

              <blockquote className="relative z-10 pl-4">
                <p className="text-lg text-subheading leading-relaxed mb-6 font-light">
                  &quot;{testimonial.quote}&quot;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-glass-border flex items-center justify-center p-1.5">
                    <Image
                      src={testimonial.logo}
                      alt={testimonial.company}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain dark:invert opacity-70"
                    />
                  </div>
                  <div>
                    <span className="block font-heading font-semibold text-heading text-sm">
                      {testimonial.company}
                    </span>
                    <span className="text-xs text-dim">{testimonial.industry}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
