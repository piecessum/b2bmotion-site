"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {
  ShoppingCart, Sparkles, Beer, Lightbulb,
  RotateCcw, FileText, Clock, Box, Smartphone,
  Zap, Users, Tag, ArrowRight, DollarSign, Warehouse, Quote
} from "lucide-react"

const categories = [
  { icon: ShoppingCart, title: "Продукты питания и напитки", desc: "Сюда относят крупы, молочные продукты, овощи и фрукты, мясо, рыбу, безалкогольные напитки и другие продукты питания." },
  { icon: Sparkles, title: "Бытовая химия и косметика", desc: "В эту группу входят всевозможные чистящие и моющие средства, товары личной гигиены, декоративная и уходовая косметика." },
  { icon: Beer, title: "Алкоголь и табачные изделия", desc: "В отдельную категорию вошли алкогольные напитки, табак, сигары и сигареты, а также спички и зажигалки." },
  { icon: Lightbulb, title: "Товары быстрого пользования", desc: "Лампочки, батарейки, пакеты, канцелярия и другие повседневные товары составляют отдельную группу FMCG-отрасли." },
]

const capabilities = [
  { icon: Zap, title: "Автоматизация оптовых продаж", desc: "Ваши клиенты получат актуальную информацию по срокам доставки, ценам и наличию, смогут самостоятельно оформить заказ в удобное время и выставить себе счет без участия менеджера.", large: true },
  { icon: DollarSign, title: "Цены с индивидуальными скидками", desc: "Каждый клиент видит свои персональные цены, график платежей и дебиторскую задолженность, может покупать товары с учетом своего кредитного лимита и индивидуальных скидок.", large: false },
  { icon: RotateCcw, title: "Возможность повторного заказа", desc: "Платформа позволяет оформлять регулярный ассортимент продуктов, которые ваши клиенты приобретают постоянно. Он хранится в виде спецификаций, и заказать товары можно повторно всего в один клик.", large: false },
  { icon: FileText, title: "Хранение документов в одном месте", desc: "Платформа позволяет прикреплять к продукту его сертификат, данные о составе, партии и другие необходимые документы. А еще каждый пользователь может видеть в одном месте свои счета, счета-фактуры и накладные.", large: true },
  { icon: Clock, title: "Контроль сроков годности", desc: "В карточке товара покупатель видит не просто товар и его характеристики, но и сроки годности партии, которую ему отгрузят. Также в B2B-системе можно настроить предложение товаров с истекающим сроком по спеццене.", large: false },
  { icon: Box, title: "Наименьшая кратность товара", desc: "В системе можно настроить минимальную кратность товара, когда компания продает определенные товары упаковками с фиксированным количеством единиц.", large: false },
  { icon: Warehouse, title: "Интеграция со складом", desc: "Платформа отражает наличие товаров, их остатки на всех складах, сроки реализации и ближайших поставок. Если товары не продаются поштучно — можно загрузить остатки в рулоне или упаковке.", large: true },
  { icon: Smartphone, title: "Мобильное приложение", desc: "Вместе с платформой компания приобретает брендированное мобильное приложение с фирменным стилем и логотипом. Ваши клиенты смогут заказывать товары из любой точки, когда под рукой нет компьютера.", large: false },
]

const advantages = [
  {
    icon: Zap,
    title: "Мгновенные заказы 24/7",
    subtitle: "Продавайте быстрее конкурентов",
    points: [
      "Заказ с любого устройства за пару кликов",
      "Актуальные остатки, цены и сроки доставки",
      "Повтор закупки в один клик по спецификации",
    ],
  },
  {
    icon: Users,
    title: "Все заказы — в одном месте",
    subtitle: "Разгрузите менеджеров на 40%",
    points: [
      "Автоматизация рутинных заказов",
      "Единая база клиентов и задолженностей",
      "Больше времени на привлечение новых клиентов",
    ],
  },
  {
    icon: Tag,
    title: "Гибкие акции и скидки",
    subtitle: "Отстройтесь от дистрибьюторов-конкурентов",
    points: [
      "Персональные условия для каждого покупателя",
      "Подборки сезонных и топовых товаров",
      "Скидки на категорию, бренд или артикул",
    ],
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

export default function FmcgPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400 bg-emerald-400/10 rounded-full">FMCG</span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">Оптовый B2B-портал для продажи</span><br />
              <span className="gradient-text">товаров повседневного спроса</span>
            </h1>
            <ul className="reveal space-y-3 text-lg text-body mb-8 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                Готовность и первые продажи через 3 месяца
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                Минимальные вложения на старте
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                Лучшее решение для рынка массового спроса
              </li>
            </ul>
            <a href="#cta" className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">Обсудить проект</a>
          </div>
          <div className="reveal">
            <div className="bg-surface rounded-2xl border border-border-default p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                <span className="text-xs text-subtle">Быстрый заказ</span>
              </div>
              <div className="p-4 bg-page-alt rounded-xl mb-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium text-heading">Повторный заказ #1247</p>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">Готов к отправке</span>
                </div>
                <div className="space-y-2">
                  {[
                    ["Молоко 3.2% 1л", "120 шт", "6 840 ₽"],
                    ["Крупа гречневая 900г", "80 шт", "4 720 ₽"],
                    ["Средство для мытья", "200 шт", "11 400 ₽"],
                    ["Батарейки АА", "150 уп", "9 750 ₽"],
                  ].map(([name, qty, price], i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-body">{name}</span>
                      <span className="text-subtle">{qty}</span>
                      <span className="text-heading font-medium">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">4 позиции</span>
                  <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded-md">Спецификация</span>
                </div>
                <p className="text-sm font-semibold text-heading">32 710 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading mb-4">Какие товары входят в FMCG-отрасль</h2>
          </div>
          <p className="reveal text-body max-w-3xl mx-auto text-center mb-16">
            FMCG — это сектор товаров повседневного и массового спроса. Невысокая стоимость, регулярное приобретение, быстрая продажа и оборачиваемость запасов — основные характеристики этой отрасли.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((c, i) => (
              <div key={i} className="reveal flex gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-heading mb-1">{c.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 via-green-900/30 to-teal-900/40 border border-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-page/90 via-page/70 to-transparent" />
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.08]">
              <div className="absolute inset-0 bg-gradient-to-bl from-emerald-400 to-green-600 blur-[60px]" />
            </div>
            <div className="relative z-10 p-10 md:p-16 max-w-3xl">
              <p className="text-lg md:text-xl text-body leading-relaxed">
                Рынок FMCG считается одним из самых конкурентных и давно сформированных. <span className="text-heading font-medium">B2B-платформа продуктов питания и товаров FMCG</span> поможет компании перейти на новый уровень развития, предложить клиентам новый способ понятного и быстрого автозаказа в интернете и отстроиться от конкурентов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Возможности B2B Движение FMCG
          </h2>

          {/* Dashboard mockup */}
          <div className="reveal mb-16 p-6 bg-surface rounded-2xl border border-border-default">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
              <div className="w-3 h-3 rounded-full bg-amber-500/30" />
              <div className="w-3 h-3 rounded-full bg-red-500/30" />
              <span className="ml-2 text-xs text-subtle">Панель управления FMCG</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Заказов сегодня", value: "47", change: "+12%" },
                { label: "Средний чек", value: "84 500 ₽", change: "+8%" },
                { label: "Активных клиентов", value: "312", change: "+5%" },
                { label: "Повторных заказов", value: "68%", change: "+3%" },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-page-alt rounded-xl">
                  <p className="text-xs text-subtle mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-heading">{s.value}</p>
                  <p className="text-xs text-emerald-500">{s.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 p-4 bg-page-alt rounded-xl">
                <p className="text-xs text-subtle mb-3">Динамика заказов</p>
                <div className="flex items-end gap-1 h-20">
                  {[35, 42, 28, 55, 47, 60, 38, 72, 65, 80, 58, 47].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/40 to-emerald-500/80 rounded-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="p-4 bg-page-alt rounded-xl">
                <p className="text-xs text-subtle mb-3">Топ категории</p>
                <div className="space-y-2">
                  {[
                    ["Продукты питания", "42%"],
                    ["Бытовая химия", "28%"],
                    ["Напитки", "18%"],
                    ["Прочее", "12%"],
                  ].map(([name, pct], i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-body">{name}</span>
                      <span className="text-heading font-medium">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <div key={i} className={`reveal p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/40 transition-all duration-500 glow-card ${c.large ? "md:col-span-2" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-heading">{c.title}</h3>
                </div>
                <p className="text-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-4">
            Важные преимущества B2B-платформы
          </h2>
          <p className="reveal text-center gradient-text font-heading font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] mb-16">для FMCG-рынка</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {advantages.map((a, i) => (
              <div key={i} className="reveal p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/40 transition-all duration-500 glow-card flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <a.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading mb-1">{a.title}</h3>
                <p className="text-sm text-emerald-500 font-medium mb-5">{a.subtitle}</p>
                <ul className="space-y-3 mt-auto">
                  {a.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-body">
                      <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.02em] text-heading text-center mb-16">
            Отзыв о платформе FMCG-компании «Рэйд-21»
          </h2>
          <div className="reveal relative p-8 md:p-12 bg-surface-hover rounded-3xl border border-border-default">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-emerald-500/20" />
            <div className="relative z-10">
              <p className="text-lg text-body leading-relaxed mb-8 italic">
                Запуск прошёл быстро и без лишней бюрократии. Поддержка реагирует оперативно, внедрение проходит в диалоге: нас слушают и предлагают решения. Видно постоянное развитие сервиса — новые функции выходят регулярно. Для нас это надёжный технологический партнёр и трамплин для роста. Тандем — 100%.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-500 font-bold text-lg">P</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-heading">Рэйд-21</p>
                  <p className="text-sm text-subtle">Крупнейший дистрибьютор продуктов питания в Республике Башкортостан</p>
                </div>
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
