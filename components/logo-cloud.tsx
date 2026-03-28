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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-dim mb-10">
          Доверяют лидеры оптовых продаж
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
          {companies.map((company, i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center p-4 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/20 hover:bg-overlay-4 transition-all duration-300 cursor-default"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={200}
                height={200}
                className="w-[95%] h-[95%] object-contain opacity-60 hover:opacity-100 transition-opacity dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
