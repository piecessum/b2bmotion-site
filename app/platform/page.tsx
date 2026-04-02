"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {
  ShoppingCart, UserCircle, BarChart3, Map, ArrowRight,
} from "lucide-react"
import Link from "next/link"

const featurePages = [
  {
    icon: ShoppingCart,
    num: "01",
    title: "Товары и заказы",
    desc: "Управление каталогом, ценообразование, бесшовная обработка заказов, оплата, доставка и электронный документооборот.",
    href: "/platform/products",
    color: "#3B82F6",
    highlights: ["Данные о товаре", "Каталог и поиск", "Ценообразование", "Заказы", "Оплата и доставка", "Документооборот"],
  },
  {
    icon: UserCircle,
    num: "02",
    title: "Личный кабинет покупателя",
    desc: "Персональные предложения, мультикомпании, финансовый контроль и удобные уведомления для ваших клиентов.",
    href: "/platform/cabinet",
    color: "#8B5CF6",
    highlights: ["Персональные предложения", "Данные о компании покупателя"],
  },
  {
    icon: BarChart3,
    num: "03",
    title: "Маркетинг и аналитика",
    desc: "Инструменты увеличения продаж, управление акциями, работа с брошенными корзинами и детальная статистика.",
    href: "/platform/marketing",
    color: "#06B6D4",
    highlights: ["Увеличение среднего чека", "Акции и предложения", "Брошенные корзины", "Продвижение", "Статистика"],
  },
]

const roadmap = [
  { status: "done" as const, title: "SEO-оптимизация", desc: "Качественная индексация поисковыми роботами" },
  { status: "done" as const, title: "Мобильное приложение", desc: "iOS и Android, синхронизация с веб" },
  { status: "wip" as const, title: "Новый дизайн V3", desc: "Обновление интерфейса по стандартам UX/UI" },
  { status: "planned" as const, title: "ИИ-рекомендации", desc: "Прогноз продаж, умные рекомендации" },
  { status: "planned" as const, title: "Офлайн-режим", desc: "Работа без интернета" },
  { status: "planned" as const, title: "Обучение пользователей", desc: "Интерактивные подсказки в интерфейсе" },
]

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

export default function PlatformPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">
            Платформа
          </span>
          <h1 className="reveal font-heading font-bold text-[clamp(36px,7vw,60px)] leading-[1.1] tracking-[-0.03em] mb-6">
            <span className="text-heading">Всё для автоматизации</span>
            <br />
            <span className="gradient-text">оптовых продаж</span>
          </h1>
          <p className="reveal text-lg text-body max-w-xl mx-auto mb-10">
            Управление каталогом, заказами, ценами и клиентами — в одном решении с интеграцией в вашу 1С
          </p>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
              className="px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Запросить демо
            </a>
            <a
              href="/#pricing"
              className="px-8 py-4 border border-border-default text-body font-medium rounded-full hover:bg-overlay-4 hover:text-heading transition-all duration-300"
            >
              Смотреть цены
            </a>
          </div>
        </div>
      </section>

      {/* Feature pages */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {featurePages.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group block rounded-2xl bg-surface border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500 glow-card overflow-hidden"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon + number */}
                      <div className="flex items-center gap-4 md:w-64 shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${page.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: page.color }} />
                        </div>
                        <div>
                          <span className="text-xs font-medium uppercase tracking-wider text-dim">
                            {page.num}
                          </span>
                          <h3 className="font-heading font-bold text-xl text-heading group-hover:text-[#3B82F6] transition-colors">
                            {page.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description + highlights */}
                      <div className="flex-1 min-w-0">
                        <p className="text-body leading-relaxed mb-4">{page.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {page.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-3 py-1 text-xs rounded-full bg-page-alt border border-border-default text-subtle"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex items-center shrink-0 self-center">
                        <ArrowRight className="w-5 h-5 text-dim group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading">
              Дорожная карта развития
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.map((item, i) => (
              <div
                key={i}
                className="reveal p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500"
              >
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    item.status === "done"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : item.status === "wip"
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "bg-dimmest text-subtle"
                  }`}
                >
                  {item.status === "done" ? "Готово" : item.status === "wip" ? "В работе" : "В планах"}
                </span>
                <h3 className="font-heading font-semibold text-lg text-heading mb-2">{item.title}</h3>
                <p className="text-sm text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
