"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ArrowRight, Quote } from "lucide-react"

const industries = ["Все", "Электротехника", "Сантехника", "FMCG", "Стройматериалы", "Безопасность", "Мебель", "IT"]

const allClients = [
  { name: "РОСЭК", industry: "Электротехника", desc: "Федеральный дистрибьютор электротехнического оборудования. Входит в ТОП-5 электротехнических компаний Урала", url: "https://rosek24.ru/" },
  { name: "ХОГАРТ", industry: "Сантехника", desc: "Поставщик инженерного оборудования, отопления, вентиляции и сантехники от ведущих мировых производителей. Более 200 брендов", url: "https://b2b.hogart.ru/" },
  { name: "РЭЙД-21", industry: "FMCG", desc: "Крупнейшая дистрибьюторская компания в Башкортостане. Более 5000 наименований продуктов питания и бытовой химии", url: "https://b2b.reid21.ru" },
  { name: "Мегаплит", industry: "Мебель", desc: "Лидер мебельной отрасли по поставкам мебельных комплектующих и строительных материалов по всей России", url: "https://dreviz-shop.ru/" },
  { name: "ПРОТЭК", industry: "Безопасность", desc: "Поставщик систем безопасности, видеонаблюдения, управления доступом и пожарной сигнализации по всей России", url: "https://b2b.pro-tek.pro/" },
  { name: "СТРОЙМИКС", industry: "Стройматериалы", desc: "Продавец строительных и отделочных материалов в Центральном Черноземье. Официальные представители производителей", url: "https://b2bstrmix.ru/" },
  { name: "Веста", industry: "Сантехника", desc: "Ведущий поставщик сантехники и оборудования для ванных комнат. Более 10 лет оптовых поставок ведущих мировых брендов", url: "https://b2b.vesta.msk.ru/" },
  { name: "РОС-Электро", industry: "Электротехника", desc: "Крупная региональная сеть электрооборудования, кабельно-проводниковой и светотехнической продукции", url: "https://b2b.ros-elektro.ru/" },
  { name: "Ирбис", industry: "IT", desc: "Дистрибьютор кабеля, материалов и оборудования для серверных и телекоммуникаций", url: "https://b2b.rbsv.ru/" },
  { name: "Ариэль Металл", industry: "Стройматериалы", desc: "Универсальный поставщик чёрного металлопроката и труб. Член Российского союза поставщиков металлопроката", url: "https://marketplace.arielmetal.ru/" },
  { name: "50 Герц", industry: "Электротехника", desc: "Федеральный дистрибьютор электротехнического оборудования в области энергетики и климатики", url: "https://electro58.ru/" },
  { name: "Древиз", industry: "Мебель", desc: "Поставщик мебельных комплектующих и материалов. Гибкое управление ассортиментом и акциями", url: "https://dreviz-shop.ru/" },
]

const testimonials = [
  { quote: "Запуск прошёл быстро и без бюрократии. Поддержка реагирует оперативно. Надёжный технологический партнёр и трамплин для роста.", company: "РЭЙД-21", industry: "FMCG" },
  { quote: "Нас хвалят партнёры, нас копируют конкуренты. По удобству интерфейса мы не уступаем маркетплейсам, а в ряде сценариев превосходим их.", company: "ХОГАРТ", industry: "Сантехника" },
  { quote: "Выбрали благодаря адекватной цене, сильной поддержке и опыту команды — и ни разу не пожалели. Платформа стала обязательным инструментом продаж.", company: "ПРОТЭК", industry: "Безопасность" },
  { quote: "Можем гибко управлять ассортиментом: запускать акции, улучшать контент и оперативно обновлять наличие. Работа менеджера — 5 из 5.", company: "Древиз", industry: "Мебель" },
]

const tagColor: Record<string, string> = {
  "Электротехника": "bg-amber-500/10 text-amber-400",
  "Сантехника": "bg-cyan-500/10 text-cyan-400",
  "FMCG": "bg-emerald-500/10 text-emerald-400",
  "Стройматериалы": "bg-rose-500/10 text-rose-400",
  "Безопасность": "bg-violet-500/10 text-violet-400",
  "Мебель": "bg-orange-500/10 text-orange-400",
  "IT": "bg-blue-500/10 text-blue-400",
}

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: 0.1 })
    ref.current?.querySelectorAll(".reveal").forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [ref])
}

export default function ClientsPage() {
  const r = useRef<HTMLElement>(null); useReveal(r)
  const [filter, setFilter] = useState("Все")
  const filtered = filter === "Все" ? allClients : allClients.filter(c => c.industry === filter)

  return (
    <main ref={r} className="relative min-h-screen bg-[#09090B] noise-overlay">
      <Navbar />
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="reveal font-heading font-bold text-[clamp(36px,7vw,60px)] leading-[1.1] tracking-[-0.03em] mb-4"><span className="gradient-text">56+</span> <span className="text-[#F5F5F5]">проектов</span></h1>
          <p className="reveal text-lg text-[#A1A1AA]">в 12+ отраслях по всей России и за рубежом</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
            {industries.map(ind => (
              <button key={ind} onClick={() => setFilter(ind)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === ind ? "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/40" : "text-[#71717A] border border-[#27272A] hover:text-[#A1A1AA] hover:border-[#3B82F6]/30"}`}
              >{ind}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c, i) => (
              <div key={c.name} className="p-6 bg-[#18181B] rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/40 transition-all duration-500 glow-card">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${tagColor[c.industry] || "bg-[#27272A] text-[#71717A]"}`}>{c.industry}</span>
                <h3 className="font-heading font-semibold text-xl text-[#F5F5F5] mb-2">{c.name}</h3>
                <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed">{c.desc}</p>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium gradient-text">Перейти в систему <ArrowRight className="w-4 h-4" style={{color:'#3B82F6'}} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0A0A0C]">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-[#F5F5F5] text-center mb-16">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="reveal relative p-8 bg-[#18181B] rounded-2xl border border-[#27272A] overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-500">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]" />
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#3B82F6]/10" />
                <p className="text-lg text-[#D4D4D8] leading-relaxed mb-6 relative z-10">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3"><span className="font-heading font-semibold text-[#F5F5F5]">{t.company}</span><span className="px-3 py-1 bg-[#27272A] rounded-full text-xs text-[#71717A]">{t.industry}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection /><Footer />
    </main>
  )
}
