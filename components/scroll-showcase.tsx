"use client";

import Image from "next/image";

const row1 = [
  { src: "/animations/1-1.png", alt: "Заказы" },
  { src: "/animations/1-2.png", alt: "Каталог товаров" },
  { src: "/animations/1-3.png", alt: "Главная страница" },
  { src: "/animations/1-4.png", alt: "Категории" },
  { src: "/animations/1-5.png", alt: "Аналитика" },
];

const row2 = [
  { src: "/animations/2-1.png", alt: "Корзина" },
  { src: "/animations/2-2.png", alt: "Карточка товара" },
  { src: "/animations/2-3.png", alt: "Складская программа" },
  { src: "/animations/2-4.png", alt: "Списки" },
  { src: "/animations/2-5.png", alt: "Документы" },
];

function ImageSet({
  images,
  prefix,
}: {
  images: { src: string; alt: string }[];
  prefix: string;
}) {
  return (
    <>
      {images.map((img, i) => (
        <Image
          key={`${prefix}-${i}`}
          src={img.src}
          alt={img.alt}
          width={1440}
          height={868}
          className="flex-shrink-0 h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] w-auto pr-4 md:pr-5"
        />
      ))}
    </>
  );
}

function MarqueeRow({
  images,
  direction,
}: {
  images: { src: string; alt: string }[];
  direction: "left" | "right";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-fit ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
      >
        <ImageSet images={images} prefix={`${direction}-a`} />
        <ImageSet images={images} prefix={`${direction}-b`} />
        <ImageSet images={images} prefix={`${direction}-c`} />
      </div>
    </div>
  );
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
          Современный B2B-портал с&nbsp;каталогом, корзиной, заказами
          и&nbsp;личным кабинетом
        </p>
      </div>

      {/* Animated rows */}
      <div className="flex flex-col gap-4 md:gap-5">
        <MarqueeRow images={row1} direction="left" />
        <MarqueeRow images={row2} direction="right" />
      </div>
    </section>
  );
}
