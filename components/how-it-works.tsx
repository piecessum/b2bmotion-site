"use client"

import { useEffect, useRef, useState } from "react"
import { Cable, Settings, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Cable,
    title: "Интеграция",
    description: "Подключаем вашу 1С или ERP. Настраиваем каталог, цены, остатки",
    visual: "connection",
  },
  {
    number: "02",
    icon: Settings,
    title: "Настройка",
    description: "Брендируем портал, настраиваем бизнес-логику, обучаем команду",
    visual: "settings",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Запуск",
    description: "Ваши клиенты начинают делать заказы через B2B-портал",
    visual: "notification",
  },
]

function ConnectionVisual() {
  return (
    <div className="relative p-6 bg-[#08080C] rounded-xl border border-white/[0.06]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-xs font-medium text-[#71717A]">
            1С
          </div>
          <span className="text-[10px] text-[#3F3F46]">Ваша система</span>
        </div>
        <div className="flex-1 mx-4 relative">
          <div className="h-[2px] bg-gradient-to-r from-[#3B82F6]/40 via-[#8B5CF6]/60 to-[#3B82F6]/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-xs font-medium text-[#E4E4E7]">
            B2B
          </div>
          <span className="text-[10px] text-[#3F3F46]">Платформа</span>
        </div>
      </div>
    </div>
  )
}

function SettingsVisual() {
  return (
    <div className="p-6 bg-[#08080C] rounded-xl border border-white/[0.06] space-y-2.5">
      {[
        { label: "Цвет бренда", value: "#3B82F6" },
        { label: "Минимальный заказ", value: "15 000 ₽" },
        { label: "Срок доставки", value: "2-3 дня" },
      ].map((setting, i) => (
        <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          <span className="text-xs text-[#52525B]">{setting.label}</span>
          <span className="text-xs text-[#A1A1AA] font-medium">{setting.value}</span>
        </div>
      ))}
    </div>
  )
}

function NotificationVisual() {
  return (
    <div className="p-6 bg-[#08080C] rounded-xl border border-white/[0.06]">
      <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-emerald-500/10">
        <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
          <span className="text-emerald-400 text-lg">&#10003;</span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#F5F5F5] mb-1">Новый заказ #2849</p>
          <p className="text-xs text-[#52525B]">ООО «ВЕСТА» — &#8381; 147,200</p>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const [beamProgress, setBeamProgress] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current) return
      const rect = stepsContainerRef.current.getBoundingClientRect()
      const startOffset = window.innerHeight * 0.6
      const progress = Math.min(
        Math.max((startOffset - rect.top) / (rect.height + startOffset - window.innerHeight * 0.3), 0),
        1
      )
      setBeamProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="solutions" className="relative py-28 px-6">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A10]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-[#F5F5F5]">
            От старта до продаж — <span className="gradient-text">3 месяца</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsContainerRef} className="relative">
          {/* Beam track */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.04] md:-translate-x-1/2" />

          {/* Beam fill */}
          <div
            className="absolute left-8 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 transition-[height] duration-100 ease-out"
            style={{
              height: `${beamProgress * 100}%`,
              background: 'linear-gradient(180deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)',
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)'
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#60A5FA]"
              style={{
                boxShadow: '0 0 16px 6px rgba(59, 130, 246, 0.7), 0 0 32px 12px rgba(139, 92, 246, 0.4)'
              }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className={`reveal relative flex flex-col md:flex-row items-start gap-8 mb-20 last:mb-0 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Step number circle */}
              <div
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-700"
                style={{
                  background: 'linear-gradient(#06060A, #06060A) padding-box, linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4) border-box',
                  border: '2px solid transparent',
                  boxShadow: beamProgress > (i + 0.5) / steps.length
                    ? '0 0 24px rgba(59, 130, 246, 0.4), 0 0 48px rgba(139, 92, 246, 0.2)'
                    : 'none'
                }}
              >
                <span className="font-heading font-bold text-lg gradient-text">{step.number}</span>
              </div>

              {/* Content card */}
              <div className={`flex-1 pl-24 md:pl-0 ${i % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24"}`}>
                <div className={`p-8 rounded-2xl glass-card max-w-md ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                  <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 flex items-center justify-center border border-white/[0.06]">
                      <step.icon className="w-6 h-6 text-[#60A5FA]" />
                    </div>
                    <h3 className="font-heading font-semibold text-2xl text-[#F5F5F5]">{step.title}</h3>
                  </div>
                  <p className="text-[#71717A] leading-relaxed mb-6">{step.description}</p>

                  {step.visual === "connection" && <ConnectionVisual />}
                  {step.visual === "settings" && <SettingsVisual />}
                  {step.visual === "notification" && <NotificationVisual />}
                </div>
              </div>

              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
