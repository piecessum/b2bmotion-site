"use client"

const companies = [
  "РОСЭК", "ХОГАРТ", "РЭЙД-21", "МЕГАПЛИТ", "ПРОТЭК",
  "СТРОЙМИКС", "ВЕСТА", "ИРБИС", "РОС-ЭЛЕКТРО",
  "АРИЭЛЬ МЕТАЛЛ", "50 ГЕРЦ", "ДРЕВИЗ"
]

export function LogoCloud() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle divider lines */}
      <div className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 mb-10">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-[#52525B]">
          Доверяют лидеры оптовых продаж
        </p>
      </div>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#06060A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#06060A] to-transparent z-10" />

        <div className="flex animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-4 px-2">
              {companies.map((company, i) => (
                <div
                  key={`${set}-${i}`}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[#52525B] text-sm font-medium hover:text-[#A1A1AA] hover:border-[#3B82F6]/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
