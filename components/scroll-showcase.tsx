"use client"

import Image from "next/image"

const row1 = [
  { src: "/for animation/1-1.png", alt: "Заказы" },
  { src: "/for animation/1-2.png", alt: "Каталог товаров" },
  { src: "/for animation/1-3.png", alt: "Главная страница" },
  { src: "/for animation/1-4.png", alt: "Категории" },
  { src: "/for animation/1-5.png", alt: "Аналитика" },
]

const row2 = [
  { src: "/for animation/2-1.png", alt: "Корзина" },
  { src: "/for animation/2-2.png", alt: "Карточка товара" },
  { src: "/for animation/2-3.png", alt: "Складская программа" },
  { src: "/for animation/2-4.png", alt: "Списки" },
  { src: "/for animation/2-5.png", alt: "Документы" },
]

// Duration in seconds
const DURATION = 40

export function ScrollShowcase() {
  // Duplicate images for seamless loop
  const row1Double = [...row1, ...row1]
  const row2Double = [...row2, ...row2]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Section heading */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] mb-4">
          Интерфейс, в котором удобно работать
        </h2>
        <p className="text-base md:text-lg text-[var(--subtle-text)] max-w-2xl mx-auto">
          Современный B2B-портал с&nbsp;каталогом, корзиной, заказами и&nbsp;личным кабинетом
        </p>
      </div>

      {/* Animated rows */}
      <div className="relative flex flex-col gap-4 md:gap-5">
        {/* Row 1 — moves left (visually scrolls right) */}
        <div
          className="flex gap-4 md:gap-5 animate-marquee-left"
          style={{
            animationDuration: `${DURATION}s`,
            width: "max-content",
          }}
        >
          {row1Double.map((img, i) => (
            <div
              key={`r1-${i}`}
              className="relative flex-shrink-0"
              style={{
                width: "clamp(300px, 34vw, 560px)",
                aspectRatio: "16 / 10",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 768px) 300px, 34vw"
              />
            </div>
          ))}
        </div>

        {/* Row 2 — moves right (visually scrolls left), offset for brickwork */}
        <div
          className="flex gap-4 md:gap-5 animate-marquee-right"
          style={{
            animationDuration: `${DURATION}s`,
            width: "max-content",
            marginLeft: "clamp(-160px, -10vw, -80px)",
          }}
        >
          {row2Double.map((img, i) => (
            <div
              key={`r2-${i}`}
              className="relative flex-shrink-0"
              style={{
                width: "clamp(300px, 34vw, 560px)",
                aspectRatio: "16 / 10",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 768px) 300px, 34vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[var(--page)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[var(--page)] to-transparent z-10 pointer-events-none" />
    </section>
  )
}
