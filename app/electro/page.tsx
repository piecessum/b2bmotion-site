"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Search, DollarSign, Zap, BarChart3, Link, FileText, ArrowRight, Check, Database, RefreshCw, GitCompare, Shield } from "lucide-react"

const stats = [
  { value: "1.7М+", label: "товаров из базы РАЭК" },
  { value: "760+", label: "брендов производителей" },
  { value: "3 мес", label: "на внедрение" },
  { value: "iOS + Android", label: "приложение в комплекте" },
]

const capabilities = [
  { icon: Zap, title: "Товары в стандарте ETIM", desc: "Стандартизированные карточки из базы РАЭК — названия, артикулы, свойства, изображения, сертификаты EAC", large: true },
  { icon: DollarSign, title: "Ценообразование", desc: "Тарифы, сегменты, региональные цены, скидки от объёма с напоминанием сколько добавить", large: false },
  { icon: Search, title: "Умный поиск", desc: "По артикулу, названию, свойствам. Автоподбор аналогов и связанных товаров", large: false },
  { icon: BarChart3, title: "Аналитика", desc: "Отчёты по менеджерам, среднему чеку, потерянным клиентам, эффективности работы", large: true },
  { icon: Link, title: "Синхронизация со складом", desc: "Остатки по складам в реальном времени, сроки поставки по заказным позициям", large: false },
  { icon: FileText, title: "Спецификации", desc: "Предзаказы, повторные заказы, обмен спецификациями между пользователями", large: false },
]

const raekBenefits = [
  { icon: Database, title: "Стандартизированная информация", desc: "Эталонные характеристики товаров в едином стандарте ETIM" },
  { icon: RefreshCw, title: "Регулярное обновление", desc: "Информация актуализируется раз в сутки с учётом ребрендинга" },
  { icon: GitCompare, title: "Аналоги и связанные товары", desc: "Поиск аналогов с учётом физических габаритов и характеристик" },
  { icon: Shield, title: "Чертежи и сертификаты", desc: "Фотографии, чертежи, паспорта изделий, сертификаты EAC, гарантийные талоны" },
]

const brands = [
  { name: "IEK", logo: "/IEK.svg" },
  { name: "DKC", logo: "/DKC.svg" },
  { name: "Siemens", logo: "/Siemens.svg" },
  { name: "WAGO", logo: "/WAGO.svg" },
  { name: "Systeme Electric", logo: "/Systeme Electric.svg" },
  { name: "КЭАЗ", logo: "/КЭАЗ.svg" },
  { name: "EKF", logo: "/EKF.svg" },
  { name: "TDM", logo: "/TDM.svg" },
  { name: "Eaton", logo: "/Eaton.svg" },
  { name: "Nexans", logo: "/Nexans.svg" },
  { name: "Arlight", logo: "/Arlight.svg" },
  { name: "Navigator", logo: "/Navigator.svg" },
  { name: "ERA", logo: "/ERA.svg" },
  { name: "Phillips", logo: "/Phillips.svg" },
  { name: "VARTON", logo: "/VARTON.svg" },
  { name: "REXANT", logo: "/REXANT.svg" },
  { name: "Jazzway", logo: "/Jazzway.svg" },
  { name: "Ecola", logo: "/Ecola.svg" },
  { name: "Ostec", logo: "/Ostec.svg" },
  { name: "Promrukav", logo: "/Promrukav.svg" },
  { name: "KM-profil", logo: "/KM-profil.svg" },
  { name: "KVT", logo: "/KVT.svg" },
  { name: "Enkor", logo: "/Enkor.svg" },
  { name: "Daccord", logo: "/Daccord.svg" },
]

const clients = [
  { name: "РОСЭК", desc: "Федеральный дистрибьютор, входит в ТОП-5 электротехнических компаний Урала", url: "https://rosek24.ru/", logo: "/rosek.svg" },
  { name: "РОС-Электро", desc: "Крупная региональная сеть электрооборудования и светотехнической продукции", url: "https://b2b.ros-elektro.ru/", logo: "/roselektro.svg" },
  { name: "База Электроматериалов", desc: "Федеральный дистрибьютор электротехнического оборудования", url: "https://electro58.ru/", logo: "/Baza electro.svg" },
  { name: "Форум Электро", desc: "Поставщик электротехнической и кабельно-проводниковой продукции с 30-летним стажем", url: "https://b2b.forumelectro.ru/", logo: "/Fav_forum.svg" },
  { name: "Сан Лайт Электро", desc: "Один из лидеров среди поставщиков низковольтной аппаратуры и светотехники", url: "https://lk-24.ru/", logo: "/sanlayt.svg" },
  { name: "Кристалл-Электро", desc: "Франчайзинговая сеть электротоваров по 5 регионам России", url: "https://opt.k-kirov.ru/", logo: "/kristal.svg" },
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

export default function ElectroPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/for-bg/bg-electro-white.png" alt="" className="w-full h-full object-cover dark:hidden" />
          <img src="/for-bg/bg-electro-dark.png" alt="" className="w-full h-full object-cover hidden dark:block" />
          <div className="absolute inset-0 bg-white/30 dark:bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--page)] to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-amber-400 bg-amber-400/10 rounded-full">Электротехника</span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">B2B-платформа для</span><br />
              <span className="gradient-text">электротехнических компаний</span>
            </h1>
            <p className="reveal text-lg text-body mb-8 max-w-lg">Интеграция с базой РАЭК, стандарт ETIM, продажа кабеля в бухтах и автоматический подбор аналогов</p>
            <a href="#cta" className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">Обсудить проект</a>
          </div>
          <div className="reveal">
            <div className="bg-surface rounded-2xl border border-border-default p-5">
              <div className="flex items-center gap-2 mb-4"><div className="w-3 h-3 rounded-full bg-amber-500/30" /><span className="text-xs text-subtle">Карточка товара ETIM</span></div>
              <div className="p-4 bg-page-alt rounded-xl mb-3">
                <p className="text-sm font-medium text-heading mb-1">Кабель ВВГнг(А)-LS 3х2.5</p>
                <p className="text-xs text-subtle mb-3">Артикул: ВВГнг-А-LS-3x2.5 | ГОСТ 31996-2012</p>
                <div className="space-y-2">
                  {[["Сечение жилы", "2.5 мм²"], ["Количество жил", "3"], ["Напряжение", "660 В"], ["Класс гибкости", "1"]].map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-xs"><span className="text-subtle">{k}</span><span className="text-body">{v}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">Сертификат EAC</span>
                <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded-md">ETIM 9.0</span>
                <span className="px-2 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs rounded-md">3 аналога</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-surface-hover">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="reveal">
              <p className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-2">{s.value}</p>
              <p className="text-sm text-subtle">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities bento */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">Возможности платформы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <div key={i} className={`reveal p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card ${c.large ? "md:col-span-2" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center"><c.icon className="w-5 h-5 text-[#3B82F6]" /></div>
                  <h3 className="font-heading font-semibold text-xl text-heading">{c.title}</h3>
                </div>
                <p className="text-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAEK */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading mb-4">Готовая информация из базы РАЭК</h2>
            <p className="reveal text-body max-w-2xl mx-auto">Мы — технический партнёр базы РАЭК. Более 760 брендов и 1.7 млн товаров с автоматическим обновлением</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raekBenefits.map((b, i) => (
              <div key={i} className="reveal flex gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0"><b.icon className="w-5 h-5 text-emerald-500" /></div>
                <div><h3 className="font-heading font-semibold text-heading mb-1">{b.title}</h3><p className="text-sm text-body">{b.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading mb-4">Бренды в базе РАЭК</h2>
            <p className="reveal text-body max-w-2xl mx-auto">Более 760 производителей электротехнического оборудования — от кабельной продукции до автоматики и светотехники</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {brands.map((b, i) => (
              <div
                key={i}
                className="reveal aspect-square flex items-center justify-center p-4 rounded-2xl bg-surface-hover border border-border-default hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity dark:brightness-[3] dark:contrast-75"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">Электротехническую B2B-систему уже приобрели</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c, i) => (
              <div key={i} className="reveal relative overflow-hidden p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card">
                <div className="relative z-10">
                  <h3 className="font-heading font-semibold text-xl text-heading mb-2">{c.name}</h3>
                  <p className="text-sm text-body mb-4 leading-relaxed">{c.desc}</p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium gradient-text hover:opacity-80 transition-opacity">
                    Перейти в систему <ArrowRight className="w-4 h-4" style={{ color: '#3B82F6' }} />
                  </a>
                </div>
                <Image
                  src={c.logo}
                  alt=""
                  width={128}
                  height={128}
                  className="absolute -bottom-3 right-2 w-24 h-24 object-contain opacity-[0.07] dark:opacity-[0.09] dark:invert pointer-events-none"
                />
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
