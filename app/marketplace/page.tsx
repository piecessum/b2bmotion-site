"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Presentation, FileCheck, Rocket, UserCheck, LayoutGrid, CreditCard, ShoppingCart, BarChart3, Search, Users, TrendingUp, Globe, Shield, Handshake, ArrowRight } from "lucide-react"

const steps = [
  { num: "01", icon: Presentation, title: "Презентация", desc: "Показываем работающие маркеты, даём демо-доступ, предоставляем рекомендации от клиентов" },
  { num: "02", icon: FileCheck, title: "Обсуждение ТЗ", desc: "Консультируем, оцениваем этапы, разрабатываем на базе готового решения" },
  { num: "03", icon: Rocket, title: "MVP за 1 месяц", desc: "Прототип для тестирования бизнес-сценариев и презентации первым партнёрам" },
]

const features = [
  { icon: UserCheck, title: "Регистрация и авторизация", desc: "Через Email или Tinkoff ID. Проверка данных контрагента по DaData" },
  { icon: LayoutGrid, title: "Главная-конструктор", desc: "Рекламные блоки, баннеры, хиты продаж, спецпредложения для монетизации" },
  { icon: Search, title: "Каталог с фильтрами", desc: "Интеллектуальный поиск с подсказками, управление приоритетом товаров" },
  { icon: ShoppingCart, title: "Мульти-продавец корзина", desc: "Товары от нескольких продавцов в одной корзине, авторазделение на заказы" },
  { icon: CreditCard, title: "Спецификации и заказы", desc: "Неограниченное количество спецификаций, поиск и фильтрация заказов" },
  { icon: BarChart3, title: "Панель управления", desc: "Статистика по продавцам, товарам и заказам. Управление контентом" },
]

const portfolio = [
  { name: "eB2B.market", type: "Электротехнический маркетплейс", desc: "60% рынка российской электротехники. 179 000+ товаров от ведущих продавцов", url: "https://eb2b.market/", gradient: "from-amber-500/20 to-orange-500/20" },
  { name: "LegpromB2B.market", type: "Маркетплейс лёгкой промышленности", desc: "150+ продавцов из 6 стран. 297 000+ товаров от сырья до готовой продукции", url: "https://legpromb2b.market/", gradient: "from-violet-500/20 to-pink-500/20" },
]

const benefits = [
  { icon: Users, title: "Расширение базы", desc: "Новые клиенты, партнёры и поставщики" },
  { icon: TrendingUp, title: "Дополнительный доход", desc: "Рекламные услуги, премиум-размещение" },
  { icon: Globe, title: "Продвижение продукции", desc: "Высокий трафик и анализ конкурентов" },
  { icon: Shield, title: "Конкурентное преимущество", desc: "Контроль над процессами, уникальное предложение" },
  { icon: Handshake, title: "Прочные отношения", desc: "Прямой доступ к клиентам, спецпредложения" },
  { icon: BarChart3, title: "Цифровизация", desc: "Автоматизация закупки и аналитики" },
]

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: 0.1 })
    ref.current?.querySelectorAll(".reveal").forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [ref])
}

export default function MarketplacePage() {
  const r = useRef<HTMLElement>(null); useReveal(r)
  return (
    <main ref={r} className="relative min-h-screen bg-[#09090B] noise-overlay">
      <Navbar />
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.06] pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full blur-[120px]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-[#8B5CF6] bg-[#8B5CF6]/10 rounded-full">Услуги</span>
          <h1 className="reveal font-heading font-bold text-[clamp(36px,7vw,60px)] leading-[1.1] tracking-[-0.03em] mb-6"><span className="text-[#F5F5F5]">Создание </span><span className="gradient-text">B2B-маркетплейсов</span><br /><span className="text-[#F5F5F5]">на базе готового решения</span></h1>
          <p className="reveal text-lg text-[#A1A1AA] max-w-xl mx-auto mb-10">MVP за 1 месяц. Готовый маркетплейс за 3 месяца. Минимальные вложения и риски</p>
          <a href="#cta" className="reveal inline-flex px-8 py-4 bg-white text-[#09090B] font-semibold rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">Обсудить проект</a>
        </div>
      </section>
      <section className="py-24 px-6 border-y border-[#18181B]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] opacity-30" />
          {steps.map((s, i) => (<div key={i} className="reveal relative text-center"><div className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(#18181B, #18181B) padding-box, linear-gradient(135deg, #3B82F6, #8B5CF6) border-box", border: "2px solid transparent" }}><span className="font-heading font-bold text-2xl gradient-text">{s.num}</span></div><h3 className="font-heading font-semibold text-xl text-[#F5F5F5] mb-2">{s.title}</h3><p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xs mx-auto">{s.desc}</p></div>))}
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-[#F5F5F5] text-center mb-16">Функционал маркетплейса</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (<div key={i} className="reveal p-6 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"><div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-[#3B82F6]" /></div><h3 className="font-heading font-semibold text-lg text-[#F5F5F5] mb-2">{f.title}</h3><p className="text-sm text-[#A1A1AA] leading-relaxed">{f.desc}</p></div>))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-[#0A0A0C]">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-[#F5F5F5] text-center mb-16">Реализованные маркетплейсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((p, i) => (<div key={i} className="reveal overflow-hidden rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"><div className={`h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}><span className="font-heading font-bold text-3xl text-[#F5F5F5]/80">{p.name}</span></div><div className="p-6 bg-[#18181B]"><p className="text-xs text-[#71717A] uppercase tracking-wider mb-2">{p.type}</p><p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{p.desc}</p><a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium gradient-text">Посмотреть <ArrowRight className="w-4 h-4" style={{color:'#3B82F6'}} /></a></div></div>))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-[#F5F5F5] text-center mb-16">Преимущества маркетплейса</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (<div key={i} className="reveal p-6 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/30 transition-all"><div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-4"><b.icon className="w-5 h-5 text-[#8B5CF6]" /></div><h3 className="font-heading font-semibold text-[#F5F5F5] mb-2">{b.title}</h3><p className="text-sm text-[#A1A1AA]">{b.desc}</p></div>))}
          </div>
        </div>
      </section>
      <CTASection /><Footer />
    </main>
  )
}
