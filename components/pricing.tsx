"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
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
  const { resolvedTheme } = useTheme()

  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-section/50 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
            Прозрачные <span className="gradient-text">условия</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal relative p-8 rounded-2xl transition-all duration-500 glass-card`}
              style={
                plan.featured
                  ? {
                      background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-hover) 100%)',
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: resolvedTheme === 'dark'
                        ? '0 0 0 1px rgba(59, 130, 246, 0.2), 0 8px 40px rgba(59, 130, 246, 0.08), 0 0 80px rgba(139, 92, 246, 0.05)'
                        : '0 0 0 1px rgba(59, 130, 246, 0.12), 0 4px 24px rgba(59, 130, 246, 0.05), 0 0 40px rgba(139, 92, 246, 0.02)',
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
                  <h3 className="font-heading font-semibold text-xl text-heading mb-2">{plan.name}</h3>
                  <p className="text-sm text-dim">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="font-heading font-bold text-4xl text-heading">{plan.price}</span>
                  {plan.period && <span className="text-dim ml-1">{plan.period}</span>}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.featured
                          ? "bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/20"
                          : "bg-overlay-4 border border-glass-border"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.featured ? "text-[#60A5FA]" : "text-subtle"}`} />
                      </div>
                      <span className="text-sm text-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={`block w-full py-4 rounded-2xl text-center font-medium transition-all duration-300 ${
                    plan.featured
                      ? "shimmer-btn bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:brightness-110"
                      : "border border-overlay-8 text-subheading hover:bg-overlay-4 hover:border-border-default"
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
