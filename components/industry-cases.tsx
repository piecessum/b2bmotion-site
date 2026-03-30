"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const industries = [
  "Электротехника",
  "Сантехника",
  "FMCG",
  "Видеонаблюдение",
  "Стройматериалы",
  "Мебель",
  "Светотехника",
  "Серверные",
  "Металлопрокат",
]

interface CaseStudy {
  company: string
  description: string
  gradient: string
  iconGradient: string
  logo?: string
  slug: string
}

const casesByIndustry: Record<string, CaseStudy[]> = {
  "Электротехника": [
    {
      company: "РОСЭК",
      description: "Федеральный дистрибьютор электротехнического оборудования, одна из ведущих инжиниринговых компаний в области энергетики и климатики. Входит в ТОП-5 электротехнических компаний Урала.",
      gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
      iconGradient: "from-amber-400/20 to-orange-400/20",
      logo: "/rosek.svg",
      slug: "keis-rosek",
    },
    {
      company: "РОС-Электро",
      description: "Крупная региональная сеть электрооборудования, кабельно-проводниковой и светотехнической продукции крупнейших производителей.",
      gradient: "from-orange-500/20 via-red-500/10 to-amber-500/20",
      iconGradient: "from-orange-400/20 to-red-400/20",
      logo: "/roselektro.svg",
      slug: "keis-ros-elektro",
    },
    {
      company: "50 Герц",
      description: "Федеральный дистрибьютор электротехнического оборудования, одна из ведущих инжиниринговых компаний в области энергетики и климатики.",
      gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
      iconGradient: "from-yellow-400/20 to-amber-400/20",
      slug: "keis-50-gerts",
    },
  ],
  "Сантехника": [
    {
      company: "Хогарт",
      description: "Поставщик инженерного оборудования, отопления, вентиляции и сантехники от ведущих мировых производителей. Более 200 брендов.",
      gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
      iconGradient: "from-cyan-400/20 to-blue-400/20",
      logo: "/hogart.svg",
      slug: "keis-hogart",
    },
    {
      company: "Веста",
      description: "Ведущий поставщик сантехники и оборудования для ванных комнат на российском рынке. Более 10 лет занимается оптовыми поставками.",
      gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
      iconGradient: "from-blue-400/20 to-sky-400/20",
      logo: "/vesta.svg",
      slug: "keis-vesta",
    },
  ],
  "FMCG": [
    {
      company: "РЭЙД-21",
      description: "Крупнейшая дистрибьюторская компания в Республике Башкортостан. Более 5000 наименований продуктов питания и бытовой химии.",
      gradient: "from-green-500/20 via-emerald-500/10 to-lime-500/20",
      iconGradient: "from-green-400/20 to-emerald-400/20",
      logo: "/raid21.svg",
      slug: "keis-raid21",
    },
  ],
  "Видеонаблюдение": [
    {
      company: "ПРОТЭК",
      description: "Поставщик систем безопасности, видеонаблюдения, управления доступом, охранной и пожарной сигнализации с отгрузкой по всей России.",
      gradient: "from-slate-500/20 via-zinc-500/10 to-gray-500/20",
      iconGradient: "from-slate-400/20 to-zinc-400/20",
      logo: "/protek.svg",
      slug: "keis-protek",
    },
  ],
  "Стройматериалы": [
    {
      company: "СТРОЙМИКС",
      description: "Продавец строительных и отделочных материалов в Центральном Черноземье. Официальные представители проверенных производителей.",
      gradient: "from-rose-500/20 via-pink-500/10 to-red-500/20",
      iconGradient: "from-rose-400/20 to-pink-400/20",
      logo: "/stroymix.svg",
      slug: "keis-stroymix",
    },
  ],
  "Мебель": [
    {
      company: "Мегаплит",
      description: "Поставщик занимает лидирующие позиции в мебельной отрасли по поставкам мебельных комплектующих и строительных материалов.",
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
      iconGradient: "from-violet-400/20 to-purple-400/20",
      logo: "/kristal.svg",
      slug: "keis-megaplit",
    },
  ],
  "Светотехника": [
    {
      company: "Электрические технологии",
      description: "Сеть магазинов электрооборудования, инженерной продукции и светотехники для профессионалов электромонтажа.",
      gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      iconGradient: "from-sky-400/20 to-blue-400/20",
      logo: "/elektricheskie-tekhnologii.svg",
      slug: "keis-elektricheskie-tekhnologii",
    },
  ],
  "Серверные": [
    {
      company: "Ирбис",
      description: "Дистрибьютор кабеля, материалов и оборудования для строительства и эксплуатации сетей связи, видеонаблюдения на территории Сибири, Дальнего Востока, Урала.",
      gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
      iconGradient: "from-teal-400/20 to-emerald-400/20",
      logo: "/irbis.svg",
      slug: "keis-irbis",
    },
  ],
  "Металлопрокат": [
    {
      company: "Ариэль Металл",
      description: "Универсальный поставщик черного металлопроката и труб. Входит в состав Российского союза поставщиков металлопроката.",
      gradient: "from-zinc-500/20 via-neutral-500/10 to-slate-500/20",
      iconGradient: "from-zinc-400/20 to-neutral-400/20",
      slug: "keis-ariel-metall",
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
            Кейсы в отраслях
          </h2>
          <div className="mt-2">
            <span
              className={`gradient-text-animated font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] inline-block transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-3 blur-sm" : "opacity-100 translate-y-0 blur-0"
              }`}
            >
              {currentIndustry}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className={`grid grid-cols-1 gap-5 ${
          currentCases.length === 1 ? "md:grid-cols-1 max-w-md mx-auto" :
          currentCases.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" :
          "md:grid-cols-3"
        }`}>
          {currentCases.map((caseStudy, i) => (
            <Link
              href={`/blog/${caseStudy.slug}`}
              key={`${currentIndustry}-${i}`}
              className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 ${
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
                    {caseStudy.logo ? (
                      <Image
                        src={caseStudy.logo}
                        alt={caseStudy.company}
                        width={100}
                        height={100}
                        className="h-10 w-auto object-contain opacity-70 dark:invert"
                      />
                    ) : (
                      <span className="text-3xl font-heading font-bold text-white/70">
                        {caseStudy.company.charAt(0)}
                      </span>
                    )}
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
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:text-[#93C5FD] group-hover:gap-3 transition-all duration-300">
                  Изучить кейс
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
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
