"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Smartphone, Package, MapPin, Clock, Palette, RefreshCw, UserCheck, Database, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: Package,
    title: "Приложение в комплекте с платформой",
    desc: "Мобильное приложение входит в стоимость B2B-платформы — 173 000 \u20BD/мес. Не нужно платить отдельно за разработку.",
    large: true,
  },
  {
    icon: RefreshCw,
    title: "Полная синхронизация с десктопом",
    desc: "Каталог, заказы, остатки, цены — всё одинаково в браузере и в приложении. Одна база, ноль расхождений.",
    large: false,
  },
  {
    icon: MapPin,
    title: "Заказы из любой точки",
    desc: "Клиенты оформляют заказ на встрече, на объекте или в дороге — без ноутбука и офиса.",
    large: false,
  },
  {
    icon: Clock,
    title: "10\u201315 дней вместо полугода",
    desc: "Настраиваем приложение за две недели. Не нужно ждать 4\u20136 месяцев, пока его напишут с нуля.",
    large: false,
  },
  {
    icon: Palette,
    title: "Ваш бренд, ваш дизайн",
    desc: "Логотип, фирменные цвета, название — клиенты видят приложение вашей компании, а не наше.",
    large: false,
  },
  {
    icon: RefreshCw,
    title: "Обновления без скачивания",
    desc: "Технология WebView: все улучшения платформы появляются в приложении мгновенно — без похода в магазин приложений.",
    large: true,
  },
]

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Подключение заказчика",
    desc: "Согласуем бренд-бук, логотип и цветовую схему приложения.",
  },
  {
    number: "02",
    icon: Database,
    title: "Интеграция с учётной системой",
    desc: "Подключаем 1С, МойСклад или вашу ERP — товары, цены и остатки синхронизируются автоматически.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Публикация во всех сторах",
    desc: "Регистрируем и размещаем приложение в Apple App Store, Google Play, RuStore и Huawei AppGallery.",
  },
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

export default function MobileAppPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/for-bg/bg-mobile-white.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/for-bg/bg-mobile-dark.png"
            alt=""
            className="w-full h-full object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-white/60 dark:bg-black/70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--page-alt) 0%, color-mix(in srgb, var(--page-alt) 85%, transparent) 20%, color-mix(in srgb, var(--page-alt) 40%, transparent) 45%, transparent 75%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-violet-400 bg-violet-400/10 rounded-full">
            Мобильное приложение
          </span>
          <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
            <span className="text-heading">Мобильное</span>{" "}
            <span className="gradient-text">приложение</span>
          </h1>
          <p className="reveal text-xl text-body mb-10 max-w-2xl mx-auto">
            B2B-платформа всегда под рукой.
          </p>
          <a href="#cta" className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">
            Обсудить проект
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div className="reveal">
            <p className="font-heading font-bold text-4xl md:text-5xl gradient-text mb-3">1,65 млрд</p>
            <p className="text-body">человек покупают товары с телефона</p>
          </div>
          <div className="reveal">
            <p className="font-heading font-bold text-4xl md:text-5xl gradient-text mb-3">59%</p>
            <p className="text-body">мировой электронной коммерции — на мобильных устройствах</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal font-heading font-bold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] text-heading mb-4">
              Главные преимущества мобильного приложения<br />
              <span className="gradient-text">B2B Движение</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`reveal p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card ${b.large ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-violet-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-heading">{b.title}</h3>
                </div>
                <p className="text-body leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly steps */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
          {/* iPhone image — left */}
          <div className="hidden md:flex md:w-5/12 items-center justify-center">
            <img
              src="/mockups/iPhone 17 Pro orange right.png"
              alt="iPhone 17 Pro"
              className="reveal h-full max-h-[700px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
          {/* Title + Steps — right */}
          <div className="md:w-7/12">
            <h2 className="reveal font-heading font-bold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] text-heading mb-16">
              Схема сборки <span className="gradient-text">мобильного приложения</span>
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border-default" />
              <div className="space-y-12">
                {steps.map((s, i) => (
                  <div key={i} className="reveal relative flex gap-6 md:gap-8">
                    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="pt-2 md:pt-3">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-subtle mb-1">Этап {s.number}</p>
                      <h3 className="font-heading font-semibold text-xl text-heading mb-2">{s.title}</h3>
                      <p className="text-body leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
