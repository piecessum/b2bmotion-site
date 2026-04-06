"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const images = [
  // Row 1
  { src: "/for animation/1-1.png", alt: "Заказы", row: 0, col: 0 },
  { src: "/for animation/1-2.png", alt: "Каталог товаров", row: 0, col: 1 },
  { src: "/for animation/1-3.png", alt: "Главная страница", row: 0, col: 2 },
  // Row 2 — offset like brickwork
  { src: "/for animation/2-1.png", alt: "Корзина", row: 1, col: 0 },
  { src: "/for animation/2-2.png", alt: "Карточка товара", row: 1, col: 1 },
  { src: "/for animation/2-3.png", alt: "Складская программа", row: 1, col: 2 },
]

export function ScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        const windowH = window.innerHeight
        // Progress: 0 when section top enters viewport bottom, 1 when section bottom leaves viewport top
        const sectionH = sectionRef.current.offsetHeight
        const rawProgress = (windowH - rect.top) / (windowH + sectionH)
        const progress = Math.max(0, Math.min(1, rawProgress))
        setOffset(progress)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Base movement range in px (centered around 0)
  const range = 120
  // Map progress [0..1] to [-range/2..+range/2]
  const baseTranslate = (offset - 0.5) * range

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Section heading */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] mb-4">
          Интерфейс, в котором удобно работать
        </h2>
        <p className="text-base md:text-lg text-[var(--subtle-text)] max-w-2xl mx-auto">
          Современный B2B-портал с&nbsp;каталогом, корзиной, заказами и&nbsp;личным кабинетом
        </p>
      </div>

      {/* Animated grid */}
      <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <div
          className="absolute inset-0 flex flex-col gap-5 md:gap-6 items-center justify-center will-change-transform"
          style={{
            transform: `translate3d(${baseTranslate * 0.22}px, ${baseTranslate * 0.22}px, 0)`,
            transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Row 1 */}
          <div
            className="flex gap-4 md:gap-6 will-change-transform"
            style={{
              transform: `translate3d(${baseTranslate * 0.06}px, ${baseTranslate * 0.04}px, 0)`,
              transition: "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {images
              .filter((img) => img.row === 0)
              .map((img, i) => (
                <div
                  key={img.src}
                  className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg ring-1 ring-[var(--border-subtle)] flex-shrink-0 will-change-transform"
                  style={{
                    width: "clamp(260px, 30vw, 440px)",
                    aspectRatio: "16 / 10",
                    transform: `translate3d(${baseTranslate * (0.02 + i * 0.015)}px, 0, 0)`,
                    transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-left-top"
                    sizes="(max-width: 768px) 260px, 30vw"
                  />
                </div>
              ))}
          </div>

          {/* Row 2 — brick offset */}
          <div
            className="flex gap-4 md:gap-6 will-change-transform"
            style={{
              marginLeft: "clamp(60px, 8vw, 140px)",
              transform: `translate3d(${baseTranslate * 0.08}px, ${baseTranslate * 0.05}px, 0)`,
              transition: "transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {images
              .filter((img) => img.row === 1)
              .map((img, i) => (
                <div
                  key={img.src}
                  className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg ring-1 ring-[var(--border-subtle)] flex-shrink-0 will-change-transform"
                  style={{
                    width: "clamp(260px, 30vw, 440px)",
                    aspectRatio: "16 / 10",
                    transform: `translate3d(${baseTranslate * (0.03 + i * 0.012)}px, 0, 0)`,
                    transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-left-top"
                    sizes="(max-width: 768px) 260px, 30vw"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--page)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--page)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-12 md:h-20 bg-gradient-to-b from-[var(--page)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 bg-gradient-to-t from-[var(--page)] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
