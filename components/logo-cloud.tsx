"use client"

import Image from "next/image"

const companies = [
  { name: "РОСЭК", logo: "/rosek.svg" },
  { name: "ХОГАРТ", logo: "/hogart.svg" },
  { name: "РЭЙД-21", logo: "/raid21.svg" },
  { name: "ПРОТЭК", logo: "/protek.svg" },
  { name: "СТРОЙМИКС", logo: "/stroymix.svg" },
  { name: "ВЕСТА", logo: "/vesta.svg" },
  { name: "ИРБИС", logo: "/irbis.svg" },
  { name: "РОС-ЭЛЕКТРО", logo: "/roselektro.svg" },
  { name: "ДРЕВИЗ", logo: "/dreviz.svg" },
  { name: "АВЕНТА", logo: "/aventa.svg" },
  { name: "КРИСТАЛ", logo: "/kristal.svg" },
  { name: "САНЛАЙТ", logo: "/sanlayt.svg" },
  { name: "ФОРУМЭЛЕКТРО", logo: "/forumelektro.svg" },
  { name: "ЭЛЕКТРИЧЕСКИЕ ТЕХНОЛОГИИ", logo: "/elektricheskie-tekhnologii.svg" },
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

        <div className="flex animate-marquee will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center shrink-0" style={{ gap: "1.25rem", paddingRight: "1.25rem" }}>
              {companies.map((company, i) => (
                <div
                  key={`${set}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center h-24 px-8 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/20 hover:bg-overlay-4 transition-all duration-300 cursor-default"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={200}
                    height={200}
                    className="h-[72px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity dark:invert"
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
