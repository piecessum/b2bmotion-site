"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Search, DollarSign, ShoppingCart, FileText, CreditCard, Truck, UserCircle, Gift, Building2, Wallet, Bell, HeadphonesIcon, TrendingUp, Tag, ShoppingBag, Globe, FileSearch, BarChart3 } from "lucide-react"

const tabs = [
  { id: "products", label: "Товары и заказы" },
  { id: "cabinet", label: "Личный кабинет" },
  { id: "analytics", label: "Маркетинг и аналитика" },
]

const features: Record<string, { icon: any; title: string; desc: string }[]> = {
  products: [
    { icon: FileText, title: "Данные о товаре", desc: "Описание, фото, сертификаты, весогабариты, штрихкоды, цветовая палитра и MDM-система" },
    { icon: Search, title: "Каталог и умный поиск", desc: "Интеллектуальный поиск по любым совпадениям, фильтры, автоподбор аналогов и связанных товаров" },
    { icon: DollarSign, title: "Гибкое ценообразование", desc: "Тарифы, сегменты, индивидуальные скидки, скидки от объёма, региональные цены" },
    { icon: ShoppingCart, title: "Бесшовная передача заказов", desc: "Заказы идут сразу в 1С без обработки менеджером. Статусы, предзаказы, повторные заказы" },
    { icon: CreditCard, title: "Оплата и доставка", desc: "Эквайринг, QR-код, платёжные сервисы, расчёт зон доставки, самовывоз" },
    { icon: Truck, title: "Документооборот", desc: "Счета, накладные, счета-фактуры с факсимильными подписями. Акты сверки по запросу" },
  ],
  cabinet: [
    { icon: Gift, title: "Персональные скидки", desc: "Индивидуальные условия, рекомендованные спецификации, центр уведомлений" },
    { icon: UserCircle, title: "Рекомендации от менеджера", desc: "Спецификации с лучшими условиями, бонусные программы лояльности" },
    { icon: Building2, title: "Мультикомпании", desc: "Работа от лица нескольких компаний, мгновенное переключение между ними" },
    { icon: Wallet, title: "Финансы", desc: "Кредитный лимит, дебиторская задолженность, дни просрочки, график платежей" },
    { icon: Bell, title: "Уведомления", desc: "Email, SMS или push на телефон — настройте удобный формат оповещений" },
    { icon: HeadphonesIcon, title: "Персональный менеджер", desc: "Контакты выделенного менеджера всегда под рукой в личном кабинете" },
  ],
  analytics: [
    { icon: TrendingUp, title: "Увеличение среднего чека", desc: "Комплекты товаров, расходники и аксессуары, распродажа уценённых позиций" },
    { icon: Tag, title: "Акции с таймерами", desc: "Спецпредложения, хиты продаж, маркировка акционных товаров в каталоге" },
    { icon: ShoppingBag, title: "Брошенные корзины", desc: "Сегментация по среднему чеку, уведомления менеджерам о крупных корзинах" },
    { icon: Globe, title: "SEO-продвижение", desc: "Автоматическая поисковая оптимизация для лучшей индексации" },
    { icon: FileSearch, title: "Проценка конкурентов", desc: "Загрузка чужих смет и Excel-документов, сравнение с вашими ценами" },
    { icon: BarChart3, title: "Отчёты и статистика", desc: "По менеджерам, заказам, среднему чеку, новым регистрациям, потерянным клиентам" },
  ],
}

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

function ProductsMockup() {
  return (
    <div className="bg-surface rounded-2xl border border-border-default p-5 space-y-3">
      <div className="flex items-center gap-3 px-4 py-3 bg-page-alt rounded-lg border border-border-default">
        <Search className="w-5 h-5 text-[#3B82F6]" />
        <span className="text-subtle text-sm">Поиск по каталогу...</span>
      </div>
      {["Кабель ВВГнг-LS 3х2.5", "Автомат ABB S203 C25", "Светильник LED Panel 40W"].map((item, i) => (
        <div key={i} className="flex items-center justify-between px-4 py-3 bg-page-alt rounded-lg">
          <div><p className="text-sm text-heading">{item}</p><p className="text-xs text-subtle">Артикул: {["ВВГ-3х25", "2CDS253001", "LP-40W"][i]}</p></div>
          <div className="text-right"><p className="text-sm font-medium text-heading">₽{["1,240", "3,890", "2,150"][i]}</p><span className="text-xs text-emerald-500">В наличии</span></div>
        </div>
      ))}
    </div>
  )
}

function CabinetMockup() {
  return (
    <div className="bg-surface rounded-2xl border border-border-default p-5">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[{ l: "Кредитный лимит", v: "₽2.5M" }, { l: "Задолженность", v: "₽340K" }, { l: "Просрочка", v: "0 дней" }, { l: "Бонусы", v: "12,450" }].map((s, i) => (
          <div key={i} className="p-3 bg-page-alt rounded-lg"><p className="text-[10px] text-subtle">{s.l}</p><p className="text-lg font-heading font-semibold text-heading">{s.v}</p></div>
        ))}
      </div>
      <div className="space-y-2">
        {["Скидка −15% на светотехнику", "Спецификация #412 обновлена", "Счёт #2847 оплачен"].map((n, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 bg-page-alt rounded-lg">
            <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#3B82F6]" : i === 1 ? "bg-[#8B5CF6]" : "bg-emerald-500"}`} />
            <span className="text-xs text-body">{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsMockup() {
  const bars = [40, 65, 50, 85, 70, 95, 60]
  return (
    <div className="bg-surface rounded-2xl border border-border-default p-5">
      <div className="flex items-center justify-between mb-4"><p className="text-sm font-medium text-heading">Продажи за неделю</p><span className="text-xs text-emerald-500">+12.4%</span></div>
      <div className="flex items-end justify-between gap-2 h-28 mb-3">
        {bars.map((h, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-violet-500" style={{ height: `${h}%` }} /><span className="text-[9px] text-subtle">{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span></div>))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ l: "Средний чек", v: "₽58K" }, { l: "Конверсия", v: "24%" }, { l: "Заказов", v: "847" }].map((s, i) => (
          <div key={i} className="p-2 bg-page-alt rounded-lg text-center"><p className="text-[9px] text-subtle">{s.l}</p><p className="text-sm font-heading font-semibold text-heading">{s.v}</p></div>
        ))}
      </div>
    </div>
  )
}

export default function PlatformPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("products")
  useReveal(mainRef)

  const mockups: Record<string, React.ReactNode> = { products: <ProductsMockup />, cabinet: <CabinetMockup />, analytics: <AnalyticsMockup /> }

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">Платформа</span>
          <h1 className="reveal font-heading font-bold text-[clamp(36px,7vw,60px)] leading-[1.1] tracking-[-0.03em] mb-6"><span className="text-heading">Всё для автоматизации</span><br /><span className="gradient-text">оптовых продаж</span></h1>
          <p className="reveal text-lg text-body max-w-xl mx-auto mb-10">Управление каталогом, заказами, ценами и клиентами — в одном решении с интеграцией в вашу 1С</p>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="px-8 py-4 bg-white text-[#09090B] font-semibold rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">Запросить демо</a>
            <a href="/#pricing" className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">Смотреть цены</a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? "text-heading" : "text-subtle border border-border-default hover:text-body hover:border-[#3B82F6]/30"}`}
                style={activeTab === tab.id ? { background: "linear-gradient(#18181B, #18181B) padding-box, linear-gradient(135deg, #3B82F6, #8B5CF6) border-box", border: "1px solid transparent" } : undefined}
              >{tab.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="lg:sticky lg:top-32">{mockups[activeTab]}</div>
            <div className="space-y-4">
              {features[activeTab].map((f, i) => (
                <div key={`${activeTab}-${i}`} className="reveal visible flex gap-4 p-5 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0"><f.icon className="w-5 h-5 text-[#3B82F6]" /></div>
                  <div><h3 className="font-heading font-semibold text-heading mb-1">{f.title}</h3><p className="text-sm text-body leading-relaxed">{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">Дорожная карта развития</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.map((item, i) => (
              <div key={i} className="reveal p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${item.status === "done" ? "bg-emerald-500/10 text-emerald-500" : item.status === "wip" ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "bg-dimmest text-subtle"}`}>
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
