"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import Image from "next/image"
import {
  Check,
  Search,
  RotateCcw,
  FileCheck,
  MessageCircle,
  ShoppingCart,
  Cpu,
  FileText,
  Smartphone,
  Link,
  BookOpen,
  Megaphone,
  ClipboardList,
  Star,
  Users,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Поиск аналогов\nи комплектующих",
    desc: "B2B-система легко подбирает технические аналоги, если нужна альтернатива или нужного товара не оказалось в наличии. Также в системе можно в один клик подобрать комплектующие. Например, оперативную память к конкретной модели сервера.",
    img: "/computers/search-analogs.jpg",
  },
  {
    icon: RotateCcw,
    title: "Управление\nрекламациями",
    desc: "Пользователи в режиме онлайн смогут вернуть оптовый заказ полностью или его часть, если он не соответствует каким-то параметрам. Для сложной электроники и серверов процент брака — это реальность. Возможность возврата товаров поможет увеличить доверие покупателей к B2B-системе.",
    img: "/computers/server-room.jpg",
  },
  {
    icon: FileCheck,
    title: "Сертификаты\nи документация",
    desc: "К каждому товару можно прикрепить подробную документацию и сертификаты соответствия, а покупатель сможет скачать их в один клик. Это может повлиять на продажи и юридическую и техническую безопасность при прохождении проверок.",
    img: "/computers/certificates.jpg",
  },
  {
    icon: MessageCircle,
    title: "Техподдержка\nи онлайн-чат",
    desc: "Перед запуском системы можно подключить онлайн-чат с менеджером. Так вопросы пользователя можно будет превратить в список рекомендованных товаров с персональными ценами, которые можно в один клик положить в корзину.",
    img: "/computers/tech-support.jpg",
  },
]

const capabilities = [
  {
    icon: ShoppingCart,
    title: "Актуальный онлайн-каталог",
    desc: "Актуальная и полная информация по всем товарам, ценам, наличию на складах и срокам доставки. Корпоративные клиенты смогут самостоятельно делать заказы в любое время без участия менеджера.",
  },
  {
    icon: Cpu,
    title: "Интеллектуальный поиск товаров",
    desc: "Клиенты смогут искать компьютерную технику и IT-оборудование по названиям, артикулам, брендам, свойствам или синонимам. Кроме того, можно искать товары по привычному каталогу.",
  },
  {
    icon: FileText,
    title: "Модуль коммерческих предложений",
    desc: "Профессиональные покупатели смогут прямо в B2B-системе создавать коммерческое предложение со своей наценкой для перепродажи товаров своим клиентам и тут же отправлять его по нужному адресу.",
  },
  {
    icon: BookOpen,
    title: "Оформление спецификаций",
    desc: "В B2B-системе клиенты могут создавать и хранить списки товаров, которые хотят заказать в будущем или повторно. Они всегда будут под рукой, их легко можно скорректировать и превратить в заказ.",
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    desc: "Вместе с платформой компания получает мобильное приложение с собственным логотипом и фирменным стилем. В итоге клиенты смогут делать заказы с любого устройства в любое время.",
  },
  {
    icon: Link,
    title: "Интеграция с внешними сервисами",
    desc: "B2B-систему можно интегрировать со сторонними сервисами. К примеру, подключить специализированную службу доставки, которая будет гарантировать сохранность серверного оборудования и поможет со страхованием дорогостоящих грузов.",
  },
]

const companyActions = [
  "Показывать полный каталог товаров с актуальной информацией",
  "Настраивать спецпредложения и публиковать новости",
  "Обрабатывать заказы и прикреплять к ним документы",
  "Маркировать лучшие товары или новинки",
  "Назначать персональные условия работы компании",
  "Формировать отчеты и следить за статистикой",
]

const companyIcons = [ShoppingCart, Megaphone, ClipboardList, Star, Users, BarChart3]

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

export default function ComputersPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/for-bg/bg-computers-white.png" alt="" className="w-full h-full object-cover dark:hidden" />
          <img src="/for-bg/bg-computers-dark.png" alt="" className="w-full h-full object-cover hidden dark:block" />
          <div className="absolute inset-0 bg-white/30 dark:bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--page)] to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-cyan-400 bg-cyan-400/10 rounded-full">
              Компьютерная техника
            </span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-4">
              <span className="text-heading">Оптовый B2B-портал</span>
              <br />
              <span className="gradient-text">Для продажи компьютерной техники</span>
            </h1>
            <ul className="reveal space-y-3 mb-8 text-body">
              {[
                "Готовность и первые продажи через 3 месяца",
                "Минимальные вложения на старте",
                "Лучшее решение для продавцов компьютерного, серверного и сетевого оборудования",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Обсудить проект
            </a>
          </div>
          <div className="reveal">
            <div className="bg-surface rounded-2xl border border-border-default p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-cyan-500/30" />
                <span className="text-xs text-subtle">Карточка товара</span>
              </div>
              <div className="p-4 bg-page-alt rounded-xl mb-3">
                <p className="text-sm font-medium text-heading mb-1">Сервер Dell PowerEdge R750</p>
                <p className="text-xs text-subtle mb-3">Артикул: PE-R750-2U | Rack 2U</p>
                <div className="space-y-2">
                  {[
                    ["Процессор", "2× Intel Xeon Gold 6338"],
                    ["Оперативная память", "256 ГБ DDR4"],
                    ["Хранилище", "8× 2.4 ТБ SAS"],
                    ["Сеть", "2× 25GbE SFP28"],
                  ].map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-subtle">{k}</span>
                      <span className="text-body">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">В наличии</span>
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-500 text-xs rounded-md">Гарантия 3 года</span>
                <span className="px-2 py-1 bg-violet-500/10 text-violet-500 text-xs rounded-md">5 аналогов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features with images */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-4">
            B2B-платформа для продажи компьютерной техники — это
          </h2>
          <p className="reveal text-body text-center max-w-2xl mx-auto mb-16">
            Инструменты, которые упрощают оптовые продажи сложного IT-оборудования
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="reveal group overflow-hidden rounded-2xl border border-border-default bg-surface-hover hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title.replace("\n", " ")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-white whitespace-pre-line leading-tight">
                      {f.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-body leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main capabilities */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.02em] text-heading text-center mb-16">
            Главные возможности B2B-системы
            <br className="hidden sm:block" />
            компьютерных товаров и офисной техники
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <div
                key={i}
                className="reveal p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-heading mb-2">{c.title}</h3>
                <p className="text-sm text-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 px-6">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/computers/server-room-banner.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-violet-900/80 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <h3 className="reveal font-heading font-bold text-2xl md:text-3xl text-white mb-4">
              B2B Движение Tech
            </h3>
            <p className="reveal text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Умная B2B-платформа, как и товары в вашем каталоге. Современная, быстрая и безопасная — все, чтобы упростить работу и жизнь клиентов.
            </p>
          </div>
        </div>
      </section>

      {/* What companies can do */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Что компании могут делать в платформе
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companyActions.map((action, i) => {
              const Icon = companyIcons[i]
              return (
                <div
                  key={i}
                  className="reveal flex items-start gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-body leading-relaxed">{action}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
