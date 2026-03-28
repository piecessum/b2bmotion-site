"use client"

import Image from "next/image"

const companies = [
  { name: "РОСЭК", logo: "/росэк.svg" },
  { name: "ХОГАРТ", logo: "/хогарт.svg" },
  { name: "РЭЙД-21", logo: "/рэйд21.svg" },
  { name: "ПРОТЭК", logo: "/протэк.svg" },
  { name: "СТРОЙМИКС", logo: "/строймикс.svg" },
  { name: "ВЕСТА", logo: "/веста.svg" },
  { name: "ИРБИС", logo: "/ирбис.svg" },
  { name: "РОС-ЭЛЕКТРО", logo: "/росэлектро.svg" },
  { name: "ДРЕВИЗ", logo: "/древиз.svg" },
  { name: "АВЕНТА", logo: "/авента.svg" },
  { name: "КРИСТАЛ", logo: "/кристал.svg" },
  { name: "САНЛАЙТ", logo: "/санлайт.svg" },
  { name: "ФОРУМЭЛЕКТРО", logo: "/форумэлектро.svg" },
  { name: "ЭЛЕКТРИЧЕСКИЕ ТЕХНОЛОГИИ", logo: "/электрические технологии.svg" },
]

export function LogoCloud() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-dim">
          Доверяют лидеры оптовых продаж
        </p>
      </div>

      <div className="relative">
        {/* Gradient fade edges — smaller on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-r from-page to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-l from-page to-transparent z-10" />

        <div className="flex animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center gap-6 px-3 shrink-0">
              {companies.map((company, i) => (
                <div
                  key={`${set}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center h-12 px-6 rounded-xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/20 hover:bg-overlay-4 transition-all duration-300 cursor-default"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={100}
                    height={100}
                    className="h-6 w-auto max-w-[120px] object-contain opacity-60 hover:opacity-90 transition-opacity dark:invert"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
