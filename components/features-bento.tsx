"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Search, DollarSign, ShoppingCart, Link, BarChart3, Smartphone } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Умный каталог",
    description: "Интеллектуальный поиск по 1.7М+ товаров, фильтры по характеристикам, автоподбор аналогов",
    large: true,
    mockup: "search",
  },
  {
    icon: DollarSign,
    title: "Ценообразование",
    description: "Тарифы, сегменты, скидки от объёма, региональные цены",
    large: false,
  },
  {
    icon: ShoppingCart,
    title: "Управление заказами",
    description: "Бесшовная передача в 1С, статусы, спецификации",
    large: false,
  },
  {
    icon: BarChart3,
    title: "Аналитика в реальном времени",
    description: "Отчёты по менеджерам, среднему чеку, потерянным клиентам",
    large: true,
    mockup: "chart",
  },
  {
    icon: Link,
    title: "Интеграция с 1С",
    description: "Синхронизация остатков, цен и документов в реальном времени",
    large: false,
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    description: "iOS и Android — ваш каталог всегда в кармане клиента",
    large: false,
  },
]

function SearchMockup() {
  return (
    <div className="mt-6 p-4 bg-surface-inner rounded-xl border border-glass-border">
      <div className="flex items-center gap-3 px-4 py-3 bg-overlay-3 rounded-xl border border-glass-border mb-4">
        <Search className="w-5 h-5 text-[#3B82F6]" />
        <span className="text-dim text-sm">Кабель ВВГнг 3х2.5...</span>
      </div>
      <div className="space-y-2">
        {["Кабель ВВГнг-LS 3х2.5", "Кабель ВВГнг(А)-LS 3х2.5 ГОСТ", "Аналог: ПВС 3х2.5"].map((item, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5 bg-overlay-2 rounded-xl border border-overlay-4 hover:border-overlay-8 transition-colors">
            <span className="text-sm text-body">{item}</span>
            <span className={`text-xs font-medium ${i === 2 ? "text-[#8B5CF6]" : "text-emerald-400/80"}`}>
              {i === 2 ? "Аналог" : "В наличии"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartMockup() {
  const [animated, setAnimated] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const bars = [40, 65, 45, 85, 55, 95, 70]
  const points = [38, 62, 48, 80, 52, 90, 72]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (chartRef.current) observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])

  const svgLine = points.map((p, i) => {
    const x = 12 + i * (100 / 6) * (276 / 100)
    const y = 96 - (p / 100) * 88
    return `${i === 0 ? "M" : "L"}${x},${y}`
  }).join(" ")

  return (
    <div ref={chartRef} className="mt-6 p-4 bg-surface-inner rounded-xl border border-glass-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-dim uppercase tracking-wider">Продажи за неделю</span>
        <span className="text-xs text-emerald-400/80 font-medium">+12.5%</span>
      </div>
      <div className="relative flex items-end justify-between gap-2 h-28">
        {bars.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10">
            <div
              className="w-full rounded-lg bg-gradient-to-t from-[#3B82F6]/50 to-[#8B5CF6]/50 transition-all duration-700 ease-out"
              style={{
                height: animated ? `${height}%` : "0%",
                transitionDelay: `${i * 80}ms`,
              }}
            />
            <span className="text-[10px] text-dimmer">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][i]}
            </span>
          </div>
        ))}
        {/* SVG trend line */}
        <svg className="absolute inset-0 w-full h-[calc(100%-20px)] pointer-events-none z-20" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d={svgLine}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: animated ? 0 : 600,
            }}
          />
          {points.map((p, i) => {
            const x = 12 + i * (100 / 6) * (276 / 100)
            const y = 96 - (p / 100) * 88
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#8B5CF6"
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: animated ? 1 : 0,
                  transitionDelay: `${600 + i * 80}ms`,
                }}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export function FeaturesBento() {
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
    <section ref={sectionRef} id="platform" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="reveal inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
            Платформа
          </span>
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
            Всё для масштабирования
            <br className="hidden sm:block" />
            <span className="gradient-text"> оптовых продаж</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 - Large + Small */}
          <div className="reveal md:col-span-2 group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#3B82F6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/10 flex items-center justify-center border border-[#3B82F6]/10">
                  <Search className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">{features[0].title}</h3>
              </div>
              <p className="text-subtle leading-relaxed">{features[0].description}</p>
              <SearchMockup />
            </div>
          </div>

          <div className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8B5CF6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#3B82F6]/10 flex items-center justify-center border border-[#8B5CF6]/10">
                  <DollarSign className="w-5 h-5 text-[#A78BFA]" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">{features[1].title}</h3>
              </div>
              <p className="text-subtle leading-relaxed">{features[1].description}</p>
              {/* Mini price tiers preview */}
              <div className="mt-6 space-y-2">
                {["Розница", "Опт", "VIP"].map((tier, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 bg-overlay-2 rounded-xl border border-overlay-4">
                    <span className="text-xs text-subtle">{tier}</span>
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-[#3B82F6]/40 to-[#8B5CF6]/40" style={{ width: `${60 + i * 20}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Small + Large */}
          <div className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/15 to-[#3B82F6]/10 flex items-center justify-center border border-emerald-500/10">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">{features[2].title}</h3>
              </div>
              <p className="text-subtle leading-relaxed">{features[2].description}</p>
              {/* Order status mini */}
              <div className="mt-6 flex items-center gap-2">
                {["Создан", "Обработан", "Отгружен"].map((s, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className={`h-1 rounded-full mb-2 ${i < 2 ? "bg-emerald-500/50" : "bg-overlay-6"}`} />
                    <span className="text-[10px] text-dim">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-2 group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/15 to-[#06B6D4]/10 flex items-center justify-center border border-[#3B82F6]/10">
                  <BarChart3 className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">{features[3].title}</h3>
              </div>
              <p className="text-subtle leading-relaxed">{features[3].description}</p>
              <ChartMockup />
            </div>
          </div>

          {/* Row 3 - Two small */}
          <div className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#06B6D4]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4]/15 to-[#3B82F6]/10 flex items-center justify-center border border-[#06B6D4]/10">
                  <Link className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">{features[4].title}</h3>
              </div>
              <p className="text-subtle leading-relaxed">{features[4].description}</p>
              {/* 1C sync visual */}
              <div className="mt-6 flex items-center justify-between">
                <div className="px-3 py-2 bg-overlay-3 rounded-lg border border-glass-border text-xs text-subtle">1С</div>
                <div className="flex-1 mx-3 h-[1px] bg-gradient-to-r from-[#06B6D4]/40 via-[#3B82F6]/40 to-[#8B5CF6]/40 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                </div>
                <div className="px-3 py-2 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 rounded-lg border border-[#3B82F6]/10 text-xs text-body">B2B</div>
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-2 group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8B5CF6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#EC4899]/10 flex items-center justify-center border border-[#8B5CF6]/10">
                    <Smartphone className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-heading">{features[5].title}</h3>
                </div>
                <p className="text-subtle leading-relaxed">{features[5].description}</p>
                {/* Mobile platforms */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-overlay-3 rounded-xl border border-glass-border">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                      <span className="text-[10px] text-body">A</span>
                    </div>
                    <span className="text-xs text-subtle">Android</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-overlay-3 rounded-xl border border-glass-border">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                      <span className="text-[10px] text-body">i</span>
                    </div>
                    <span className="text-xs text-subtle">iOS</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-overlay-3 rounded-xl border border-glass-border">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                      <span className="text-[10px] text-body">W</span>
                    </div>
                    <span className="text-xs text-subtle">Web</span>
                  </div>
                </div>
              </div>
              {/* Phone image sticking out */}
              <div className="hidden sm:block relative w-[140px] -mr-8 -mb-8 -mt-2 flex-shrink-0 self-stretch">
                <div className="absolute bottom-[-32px] right-[-16px] w-[160px]">
                  <Image
                    src="/phone.png"
                    alt="Мобильное приложение"
                    width={320}
                    height={640}
                    className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
