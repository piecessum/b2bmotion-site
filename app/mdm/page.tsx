"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Database,
  CheckCircle2,
  Globe,
  Settings,
  Zap,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Cloud,
  Layers,
  FileCode,
  Briefcase,
  Package,
  Monitor,
  Server,
  RefreshCw,
  Search,
  Languages,
  GitCompare,
  Puzzle,
} from "lucide-react"

const mdmFeatures = [
  {
    icon: Cloud,
    title: "Интерфейс для производителей",
    desc: "Облачный доступ к личному кабинету MDM-системы для управления информацией о товарах.",
  },
  {
    icon: Layers,
    title: "Структурированная информация",
    desc: "Достоверные, полные, актуальные данные об электротехнических товарах.",
  },
  {
    icon: FileCode,
    title: "Описания товаров в стандарте ETIM",
    desc: "Описание товаров в международном формате ETIM для товаров электротехнической отрасли.",
  },
  {
    icon: Briefcase,
    title: "Продуманное решение для бизнеса",
    desc: "Удобная система для выгрузки информации по API в B2B-системы, ERP, маркетплейсы и т.д.",
  },
]

const mdmBenefits = [
  {
    icon: Zap,
    title: "Мгновенный доступ к полной информации",
    desc: "Автоматизированный и быстрый способ получить информацию о товарах: параметрах, свойствах, изображениях.",
  },
  {
    icon: ShieldCheck,
    title: "Очистка данных и проверка на дубликаты",
    desc: "Чистые данные без дублей и запутанной информации для минимизации рисков и ошибок в заказах и бизнесе.",
  },
  {
    icon: DollarSign,
    title: "Сокращение расходов на контент-менеджмент",
    desc: "Готовая информация в едином формате снижает расходы на ручное и рутинное заполнение контента и устраняет ошибки при заполнении.",
  },
]

const etimBullets = [
  { icon: DollarSign, text: "Неправильные заказы сводятся к минимуму, а это сокращает прямые затраты" },
  { icon: RefreshCw, text: "Данные мгновенно распространяются от производителя по всей цепочке поставок" },
  { icon: Search, text: "Покупатель легко может найти нужный товар по любому запросу" },
  { icon: Languages, text: "Единообразное описание товаров с переводом на все языки, которые поддерживает стандарт" },
  { icon: GitCompare, text: "Подбор аналогов через автоматическое сравнение классов и свойств" },
  { icon: Puzzle, text: "Подбор дополняющих товаров через поиск соответствий параметров" },
]

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

export default function MdmPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">
              MDM-система
            </span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">Единая система хранения данных</span>
              <br />
              <span className="gradient-text">о товарах (MDM)</span>
            </h1>
            <p className="reveal text-lg text-body mb-4 max-w-lg">
              Всем компаниям в персональные B2B-системы автоматически подгружаются свойства, изображения, сертификаты электротехнических товаров в формате ETIM.
            </p>
            <p className="reveal text-lg text-body mb-8 max-w-lg">
              Производители могут предоставить доступы к этой информации третьим лицам для использования на других ресурсах.
            </p>
            <a
              href="#cta"
              className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Оставить заявку
            </a>
          </div>

          {/* Hero visual — MDM dashboard mockup */}
          <div className="reveal">
            <div className="bg-surface rounded-2xl border border-border-default p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]/30" />
                <span className="text-xs text-subtle">MDM — Управление данными о товарах</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-page-alt rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-heading">Каталог товаров</p>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">ETIM 9.0</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      ["Категории", "1 240"],
                      ["Товаров", "47 500+"],
                      ["Свойств", "18 000+"],
                      ["Изображений", "92 000+"],
                    ].map(([k, v], i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-subtle">{k}</span>
                        <span className="text-body font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded-md">API</span>
                  <span className="px-2 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs rounded-md">Сертификаты</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">Автообновление</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Motion MDM — это */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            B2B Motion MDM — это
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mdmFeatures.map((f, i) => (
              <div
                key={i}
                className="reveal flex gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-heading mb-1">{f.title}</h3>
                  <p className="text-sm text-body">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Для чего нужна MDM-система */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Для чего нужна MDM-система
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mdmBenefits.map((b, i) => (
              <div
                key={i}
                className="reveal p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading mb-2">{b.title}</h3>
                <p className="text-body leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Дашборд: Электротехнические товары в стандарте ETIM */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal bg-surface rounded-2xl border border-border-default p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.02em] text-heading mb-4">
                Электротехнические товары в стандарте ETIM
              </h2>
              <p className="text-body leading-relaxed">
                ETIM — международный стандарт описания электротехнических товаров: светильников, розеток, лампочек, выключателей и т.д. Любой в цепи «производитель — покупатель» сможет получить безошибочную информацию о каждом товаре.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {etimBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-page-alt">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <p className="text-sm text-body leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Схема работы MDM-системы и API */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Схема работы MDM-системы и API
          </h2>

          <div className="reveal">
            {/* Desktop diagram */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Left sources */}
                <div className="grid grid-cols-[200px_1fr_200px] gap-0 items-center">
                  {/* Left column — sources */}
                  <div className="flex flex-col gap-6">
                    <div className="p-4 bg-surface rounded-xl border border-border-default text-center">
                      <Globe className="w-8 h-8 text-subtle mx-auto mb-2" />
                      <p className="text-xs text-body leading-tight">
                        Интернет-магазины, сайты и B2B-системы партнёров
                      </p>
                    </div>
                    <div className="p-4 bg-surface rounded-xl border border-border-default text-center">
                      <Monitor className="w-8 h-8 text-subtle mx-auto mb-2" />
                      <p className="text-xs text-body leading-tight">
                        Каталоги на сайтах, в веб-приложениях заказчика
                      </p>
                    </div>
                  </div>

                  {/* Center — MDM core */}
                  <div className="mx-4">
                    <div className="relative bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 rounded-2xl border border-[#3B82F6]/20 p-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-4 bg-surface rounded-xl border border-border-default">
                          <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-3">
                            <Settings className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <p className="text-xs font-medium text-heading mb-1">API</p>
                          <p className="text-[10px] text-subtle leading-tight">для защищённого взаимодействия</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-surface rounded-xl border border-border-default">
                          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-3">
                            <Database className="w-6 h-6 text-[#8B5CF6]" />
                          </div>
                          <p className="text-xs font-medium text-heading mb-1">База данных</p>
                          <p className="text-[10px] text-subtle leading-tight">хранение и обработка</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-surface rounded-xl border border-border-default">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                            <RefreshCw className="w-6 h-6 text-emerald-500" />
                          </div>
                          <p className="text-xs font-medium text-heading mb-1">Коннекторы</p>
                          <p className="text-[10px] text-subtle leading-tight">с внутренними системами заказчика</p>
                        </div>
                      </div>

                      {/* Arrows between blocks */}
                      <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                        <div className="flex items-center">
                          <div className="w-4 h-0.5 bg-[#3B82F6]/40" />
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#3B82F6]/60" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                        <div className="flex items-center">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-[#3B82F6]/60" />
                          <div className="w-4 h-0.5 bg-[#3B82F6]/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column — targets */}
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-surface rounded-xl border border-border-default text-center">
                      <Server className="w-7 h-7 text-subtle mx-auto mb-2" />
                      <p className="text-xs font-medium text-heading">ERP</p>
                    </div>
                    <div className="p-4 bg-surface rounded-xl border border-border-default text-center">
                      <Package className="w-7 h-7 text-subtle mx-auto mb-2" />
                      <p className="text-xs font-medium text-heading">CRM</p>
                    </div>
                    <div className="p-4 bg-surface rounded-xl border border-border-default text-center">
                      <FileCode className="w-7 h-7 text-subtle mx-auto mb-2" />
                      <p className="text-xs font-medium text-heading leading-tight">Excel, CSV, JSON и т.д.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile diagram — stacked */}
            <div className="md:hidden space-y-4">
              <div className="text-center">
                <p className="text-xs text-subtle uppercase tracking-wider mb-3">Источники данных</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-surface rounded-xl border border-border-default text-center">
                    <Globe className="w-6 h-6 text-subtle mx-auto mb-1.5" />
                    <p className="text-[11px] text-body leading-tight">Интернет-магазины и B2B-системы</p>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-border-default text-center">
                    <Monitor className="w-6 h-6 text-subtle mx-auto mb-1.5" />
                    <p className="text-[11px] text-body leading-tight">Каталоги и веб-приложения</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#3B82F6]/30" />
              </div>

              <div className="bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 rounded-2xl border border-[#3B82F6]/20 p-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center text-center p-3 bg-surface rounded-xl border border-border-default">
                    <Settings className="w-6 h-6 text-[#3B82F6] mb-1.5" />
                    <p className="text-[10px] font-medium text-heading">API</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-surface rounded-xl border border-border-default">
                    <Database className="w-6 h-6 text-[#8B5CF6] mb-1.5" />
                    <p className="text-[10px] font-medium text-heading">База данных</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-surface rounded-xl border border-border-default">
                    <RefreshCw className="w-6 h-6 text-emerald-500 mb-1.5" />
                    <p className="text-[10px] font-medium text-heading">Коннекторы</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#3B82F6]/30" />
              </div>

              <div className="text-center">
                <p className="text-xs text-subtle uppercase tracking-wider mb-3">Интеграции</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-surface rounded-xl border border-border-default text-center">
                    <Server className="w-6 h-6 text-subtle mx-auto mb-1.5" />
                    <p className="text-[11px] font-medium text-heading">ERP</p>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-border-default text-center">
                    <Package className="w-6 h-6 text-subtle mx-auto mb-1.5" />
                    <p className="text-[11px] font-medium text-heading">CRM</p>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-border-default text-center">
                    <FileCode className="w-6 h-6 text-subtle mx-auto mb-1.5" />
                    <p className="text-[11px] font-medium text-heading leading-tight">Excel, CSV, JSON</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 варианта внедрения */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            2 варианта внедрения MDM-системы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Вариант 1 */}
            <div className="reveal relative overflow-hidden p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-amber-500 bg-amber-500/10 rounded-full">
                Для электротехнической отрасли
              </span>
              <h3 className="font-heading font-bold text-2xl text-heading mb-4">
                Бесплатно в пакете с нашей B2B-системой
              </h3>
              <p className="text-body leading-relaxed">
                Развернём под вашим брендом B2B-систему с бесплатным доступом к электротехническому маркету, а все ваши товары уже будут описаны в стандарте ETIM.
              </p>
            </div>

            {/* Вариант 2 */}
            <div className="reveal relative overflow-hidden p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#8B5CF6]/40 transition-all duration-500 glow-card">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 rounded-full">
                Для других отраслей
              </span>
              <h3 className="font-heading font-bold text-2xl text-heading mb-4">
                Индивидуальная разработка собственной MDM-системы
              </h3>
              <p className="text-body leading-relaxed">
                Разработаем полноценную базу товаров с удобной админкой для заполнения данных. MDM-систему можно интегрировать с любыми сервисами через API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="aurora-orb w-[700px] h-[400px] bg-gradient-to-r from-[#3B82F6]/12 via-[#8B5CF6]/10 to-[#06B6D4]/12 blur-[140px] opacity-40 dark:opacity-100"
            style={{ animationDuration: "15s" }}
          />
        </div>
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading mb-6">
            MDM-система управления данными об электротехнических товарах
          </h2>
          <div className="reveal mb-12">
            <a
              href="mailto:hello@b2b-dvizhenie.ru"
              className="shimmer-btn inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-lg font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 hover:brightness-110"
            >
              Оставить заявку
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dim">
            <a href="tel:+74993503436" className="hover:text-body transition-colors duration-300">
              +7 (499) 350-34-36
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border-subtle" />
            <a href="mailto:ageev@b2bmotion.ru" className="hover:text-body transition-colors duration-300">
              ageev@b2bmotion.ru
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
