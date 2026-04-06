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

const DURATION = 40

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: { src: string; alt: string }[]
  direction: "left" | "right"
  offset?: boolean
}) {
  const doubled = [...images, ...images]

  return (
    <div
      className={`flex gap-4 md:gap-5 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
      style={{
        animationDuration: `${DURATION}s`,
        ...(offset ? { paddingLeft: "clamp(80px, 10vw, 180px)" } : {}),
      }}
    >
      {doubled.map((img, i) => (
        <Image
          key={`${direction}-${i}`}
          src={img.src}
          alt={img.alt}
          width={1440}
          height={868}
          className="flex-shrink-0 h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] w-auto"
          sizes="(max-width: 640px) 332px, (max-width: 768px) 432px, (max-width: 1024px) 531px, 631px"
        />
      ))}
    </div>
  )
}

export function ScrollShowcase() {
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
      <div className="flex flex-col gap-4 md:gap-5">
        <MarqueeRow images={row1} direction="left" />
        <MarqueeRow images={row2} direction="right" offset />
      </div>

    </section>
  )
}
