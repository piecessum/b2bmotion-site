"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const industries = [
  "Сантехника",
  "Электротехника",
  "FMCG",
  "Видеонаблюдение",
  "Стройматериалы",
  "Мебель",
]

interface CaseStudy {
  company: string
  description: string
  gradient: string
  iconGradient: string
}

const casesByIndustry: Record<string, CaseStudy[]> = {
  "Сантехника": [
    {
      company: "Хогарт",
      description: "Поставщик инженерного оборудования, отопления, вентиляции и сантехники. Более 200 брендов в каталоге.",
      gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
      iconGradient: "from-cyan-400/20 to-blue-400/20",
    },
    {
      company: "Веста",
      description: "Ведущий поставщик сантехники и оборудования для ванных комнат. Сеть филиалов по всей России.",
      gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
      iconGradient: "from-blue-400/20 to-sky-400/20",
    },
    {
      company: "АкваМаркет",
      description: "Дистрибьютор сантехнических товаров с отгрузкой в 24 региона. Более 50 000 SKU.",
      gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
      iconGradient: "from-teal-400/20 to-cyan-400/20",
    },
  ],
  "Электротехника": [
    {
      company: "РОСЭК",
      description: "Федеральный дистрибьютор, входит в ТОП-5 электротехнических компаний Урала.",
      gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
      iconGradient: "from-amber-400/20 to-orange-400/20",
    },
    {
      company: "РОС-Электро",
      description: "Крупная региональная сеть электрооборудования. Партнёрская сеть из 150+ точек.",
      gradient: "from-orange-500/20 via-red-500/10 to-amber-500/20",
      iconGradient: "from-orange-400/20 to-red-400/20",
    },
    {
      company: "50 Герц",
      description: "Поставщик электротехнической продукции для промышленных предприятий.",
      gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
      iconGradient: "from-yellow-400/20 to-amber-400/20",
    },
  ],
  "FMCG": [
    {
      company: "РЭЙД-21",
      description: "Крупнейший дистрибьютор в Башкортостане. 5000+ наименований продуктов питания и бытовой химии.",
      gradient: "from-green-500/20 via-emerald-500/10 to-lime-500/20",
      iconGradient: "from-green-400/20 to-emerald-400/20",
    },
    {
      company: "ФудЛайн",
      description: "Дистрибьютор продуктов питания. Охват 12 регионов, собственный автопарк.",
      gradient: "from-lime-500/20 via-green-500/10 to-emerald-500/20",
      iconGradient: "from-lime-400/20 to-green-400/20",
    },
    {
      company: "ОптТорг",
      description: "Поставщик бытовой химии и товаров для дома. Работа с крупными сетями.",
      gradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20",
      iconGradient: "from-emerald-400/20 to-teal-400/20",
    },
  ],
  "Видеонаблюдение": [
    {
      company: "ПРОТЭК",
      description: "Поставщик систем безопасности и видеонаблюдения с отгрузкой по всей России.",
      gradient: "from-slate-500/20 via-zinc-500/10 to-gray-500/20",
      iconGradient: "from-slate-400/20 to-zinc-400/20",
    },
    {
      company: "СекьюрПро",
      description: "Интегратор систем видеонаблюдения. Полный цикл от проектирования до монтажа.",
      gradient: "from-zinc-500/20 via-neutral-500/10 to-slate-500/20",
      iconGradient: "from-zinc-400/20 to-neutral-400/20",
    },
    {
      company: "ВидеоТех",
      description: "Дистрибьютор оборудования для систем безопасности. Партнёр ведущих брендов.",
      gradient: "from-gray-500/20 via-slate-500/10 to-zinc-500/20",
      iconGradient: "from-gray-400/20 to-slate-400/20",
    },
  ],
  "Стройматериалы": [
    {
      company: "СТРОЙМИКС",
      description: "Продавец строительных и отделочных материалов в Центральном Черноземье.",
      gradient: "from-rose-500/20 via-pink-500/10 to-red-500/20",
      iconGradient: "from-rose-400/20 to-pink-400/20",
    },
    {
      company: "СтройОпт",
      description: "Оптовые поставки стройматериалов. Собственные склады в 5 городах.",
      gradient: "from-red-500/20 via-rose-500/10 to-orange-500/20",
      iconGradient: "from-red-400/20 to-rose-400/20",
    },
    {
      company: "МатериалПлюс",
      description: "Комплексные поставки для строительных объектов любой сложности.",
      gradient: "from-orange-500/20 via-amber-500/10 to-rose-500/20",
      iconGradient: "from-orange-400/20 to-amber-400/20",
    },
  ],
  "Мебель": [
    {
      company: "Мегаплит",
      description: "Лидер мебельной отрасли по поставкам комплектующих. Более 20 лет на рынке.",
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
      iconGradient: "from-violet-400/20 to-purple-400/20",
    },
    {
      company: "Древиз",
      description: "Мебельные материалы и фурнитура. Полный ассортимент для производителей.",
      gradient: "from-purple-500/20 via-fuchsia-500/10 to-violet-500/20",
      iconGradient: "from-purple-400/20 to-fuchsia-400/20",
    },
    {
      company: "ФурнитураПро",
      description: "Поставщик мебельной фурнитуры европейского качества.",
      gradient: "from-indigo-500/20 via-violet-500/10 to-purple-500/20",
      iconGradient: "from-indigo-400/20 to-violet-400/20",
    },
  ],
}

export function IndustryCases() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.1 }
    )
    const reveals = sectionRef.current?.querySelectorAll(".reveal")
    reveals?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % industries.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const currentIndustry = industries[currentIndex]
  const currentCases = casesByIndustry[currentIndustry]

  return (
    <section ref={sectionRef} id="cases" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
            Кейсы в отраслях{" "}
            <span className="relative inline-block w-[200px] md:w-[280px] text-left align-bottom">
              <span
                className={`gradient-text-animated inline-block transition-all duration-300 ${
                  isAnimating ? "opacity-0 translate-y-3 blur-sm" : "opacity-100 translate-y-0 blur-0"
                }`}
              >
                {currentIndustry}
              </span>
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {currentCases.map((caseStudy, i) => (
            <div
              key={`${currentIndustry}-${i}`}
              className={`reveal group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 ${
                isAnimating ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image area */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient}`} />
                <div className="absolute inset-0 bg-page/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${caseStudy.iconGradient} backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl font-heading font-bold text-white/70">
                      {caseStudy.company.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-[10px] text-dim uppercase tracking-[0.15em]">
                  {currentIndustry}
                </span>
                <h3 className="font-heading font-bold text-xl text-heading mt-2 mb-3">
                  {caseStudy.company}
                </h3>
                <p className="text-sm text-subtle leading-relaxed mb-5">
                  {caseStudy.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] group-hover:gap-3 transition-all duration-300"
                >
                  Изучить кейс
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {industries.map((industry, i) => (
            <button
              key={industry}
              onClick={() => {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentIndex(i)
                  setIsAnimating(false)
                }, 300)
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-10 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                  : "w-2 bg-dimmest hover:bg-dimmer"
              }`}
              aria-label={industry}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
