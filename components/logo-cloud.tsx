"use client"

const companies = [
  "РОСЭК", "ХОГАРТ", "РЭЙД-21", "МЕГАПЛИТ", "ПРОТЭК",
  "СТРОЙМИКС", "ВЕСТА", "ИРБИС", "РОС-ЭЛЕКТРО",
  "АРИЭЛЬ МЕТАЛЛ", "50 ГЕРЦ", "ДРЕВИЗ"
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
            <div key={set} className="flex gap-4 px-2 shrink-0">
              {companies.map((company, i) => (
                <div
                  key={`${set}-${i}`}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-overlay-2 border border-glass-border text-dim text-sm font-medium hover:text-body hover:border-[#3B82F6]/20 hover:bg-overlay-4 transition-all duration-300 cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
