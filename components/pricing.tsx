"use client"

import { useEffect, useRef } from "react"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Быстрый старт",
    price: "от 700 000 ₽",
    period: "",
    description: "Разовая настройка",
    features: [
      "Базовая интеграция с 1С",
      "Настройка каталога",
      "Обучение команды",
      "30 дней поддержки",
    ],
    featured: false,
  },
  {
    name: "Подписка",
    price: "173 000 ₽",
    period: "/мес",
    description: "Всё включено",
    features: [
      "Полная интеграция с 1С/ERP",
      "Мобильное приложение",
      "Аналитика и отчёты",
      "Приоритетная поддержка",
      "Обновления платформы",
    ],
    featured: true,
    badge: "Популярный",
  },
  {
    name: "Выкуп",
    price: "от 3 200 000 ₽",
    period: "",
    description: "Собственность навсегда",
    features: [
      "Исходный код платформы",
      "Бессрочная лицензия",
      "Размещение на вашем сервере",
      "Год поддержки включён",
    ],
    featured: false,
  },
]

export function Pricing() {
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
    <section ref={sectionRef} id="pricing" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A10]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-[#F5F5F5]">
            Прозрачные <span className="gradient-text">условия</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal relative p-8 rounded-2xl transition-all duration-500 ${
                plan.featured
                  ? "glass-card"
                  : "glass-card"
              }`}
              style={
                plan.featured
                  ? {
                      background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.9) 0%, rgba(20, 20, 35, 0.7) 100%)',
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2), 0 8px 40px rgba(59, 130, 246, 0.08), 0 0 80px rgba(139, 92, 246, 0.05)',
                    }
                  : undefined
              }
            >
              {/* Gradient border for featured */}
              {plan.featured && (
                <>
                  <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/30 via-[#8B5CF6]/20 to-[#06B6D4]/30 opacity-100" style={{
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      padding: '1px',
                    }} />
                  </div>

                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] rounded-full text-xs font-medium text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </>
              )}

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-xl text-[#F5F5F5] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#52525B]">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="font-heading font-bold text-4xl text-[#F5F5F5]">{plan.price}</span>
                  {plan.period && <span className="text-[#52525B] ml-1">{plan.period}</span>}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.featured
                          ? "bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/20"
                          : "bg-white/[0.04] border border-white/[0.06]"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.featured ? "text-[#60A5FA]" : "text-[#71717A]"}`} />
                      </div>
                      <span className="text-sm text-[#A1A1AA]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={`block w-full py-4 rounded-2xl text-center font-medium transition-all duration-300 ${
                    plan.featured
                      ? "shimmer-btn bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:brightness-110"
                      : "border border-white/[0.08] text-[#D4D4D8] hover:bg-white/[0.04] hover:border-white/[0.15]"
                  }`}
                >
                  Выбрать план
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
