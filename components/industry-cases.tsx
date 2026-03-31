"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
];

interface CaseStudy {
  company: string;
  description: string;
  gradient: string;
  iconGradient: string;
  logo?: string;
  slug: string;
  industry: string;
}

const casesByIndustry: Record<string, Omit<CaseStudy, "industry">[]> = {
  Электротехника: [
    {
      company: "РОСЭК",
      description:
        "Федеральный дистрибьютор электротехнического оборудования, одна из ведущих инжиниринговых компаний в области энергетики и климатики. Входит в ТОП-5 электротехнических компаний Урала.",
      gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
      iconGradient: "from-amber-400/20 to-orange-400/20",
      logo: "/rosek.svg",
      slug: "keis-rosek",
    },
    {
      company: "РОС-Электро",
      description:
        "Крупная региональная сеть электрооборудования, кабельно-проводниковой и светотехнической продукции крупнейших производителей.",
      gradient: "from-orange-500/20 via-red-500/10 to-amber-500/20",
      iconGradient: "from-orange-400/20 to-red-400/20",
      logo: "/roselektro.svg",
      slug: "keis-ros-elektro",
    },
    {
      company: "50 Герц",
      description:
        "Федеральный дистрибьютор электротехнического оборудования, одна из ведущих инжиниринговых компаний в области энергетики и климатики.",
      gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
      iconGradient: "from-yellow-400/20 to-amber-400/20",
      slug: "keis-50-gerts",
    },
  ],
  Сантехника: [
    {
      company: "Хогарт",
      description:
        "Поставщик инженерного оборудования, отопления, вентиляции и сантехники от ведущих мировых производителей. Более 200 брендов.",
      gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
      iconGradient: "from-cyan-400/20 to-blue-400/20",
      logo: "/hogart.svg",
      slug: "keis-hogart",
    },
    {
      company: "Веста",
      description:
        "Ведущий поставщик сантехники и оборудования для ванных комнат на российском рынке. Более 10 лет занимается оптовыми поставками.",
      gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
      iconGradient: "from-blue-400/20 to-sky-400/20",
      logo: "/vesta.svg",
      slug: "keis-vesta",
    },
  ],
  FMCG: [
    {
      company: "РЭЙД-21",
      description:
        "Крупнейшая дистрибьюторская компания в Республике Башкортостан. Более 5000 наименований продуктов питания и бытовой химии.",
      gradient: "from-green-500/20 via-emerald-500/10 to-lime-500/20",
      iconGradient: "from-green-400/20 to-emerald-400/20",
      logo: "/raid21.svg",
      slug: "keis-raid21",
    },
  ],
  Видеонаблюдение: [
    {
      company: "ПРОТЭК",
      description:
        "Поставщик систем безопасности, видеонаблюдения, управления доступом, охранной и пожарной сигнализации с отгрузкой по всей России.",
      gradient: "from-slate-500/20 via-zinc-500/10 to-gray-500/20",
      iconGradient: "from-slate-400/20 to-zinc-400/20",
      logo: "/protek.svg",
      slug: "keis-protek",
    },
  ],
  Стройматериалы: [
    {
      company: "СТРОЙМИКС",
      description:
        "Продавец строительных и отделочных материалов в Центральном Черноземье. Официальные представители проверенных производителей.",
      gradient: "from-rose-500/20 via-pink-500/10 to-red-500/20",
      iconGradient: "from-rose-400/20 to-pink-400/20",
      logo: "/stroymix.svg",
      slug: "keis-stroymix",
    },
  ],
  Мебель: [
    {
      company: "Древиз",
      description:
        "Крупнейший дистрибьютор мебельных материалов в ЦФО. Автоматизировал оптовые продажи и работу с дилерами с помощью b2bmotion. 70+ брендов, 8 филиалов по РФ, 3 000+ клиентов.",
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
      iconGradient: "from-violet-400/20 to-purple-400/20",
      logo: "/dreviz.svg",
      slug: "keis-dreviz",
    },
    {
      company: "Мегаплит",
      description:
        "Поставщик занимает лидирующие позиции в мебельной отрасли по поставкам мебельных комплектующих и строительных материалов.",
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
      iconGradient: "from-violet-400/20 to-purple-400/20",
      logo: "/kristal.svg",
      slug: "keis-megaplit",
    },
  ],
  Светотехника: [
    {
      company: "Электрические технологии",
      description:
        "Сеть магазинов электрооборудования, инженерной продукции и светотехники для профессионалов электромонтажа.",
      gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
      iconGradient: "from-sky-400/20 to-blue-400/20",
      logo: "/elektricheskie-tekhnologii.svg",
      slug: "keis-elektricheskie-tekhnologii",
    },
  ],
  Серверные: [
    {
      company: "Ирбис",
      description:
        "Дистрибьютор кабеля, материалов и оборудования для строительства и эксплуатации сетей связи, видеонаблюдения на территории Сибири, Дальнего Востока, Урала.",
      gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
      iconGradient: "from-teal-400/20 to-emerald-400/20",
      logo: "/irbis.svg",
      slug: "keis-irbis",
    },
  ],
  Металлопрокат: [
    {
      company: "Ариэль Металл",
      description:
        "Универсальный поставщик черного металлопроката и труб. Входит в состав Российского союза поставщиков металлопроката.",
      gradient: "from-zinc-500/20 via-neutral-500/10 to-slate-500/20",
      iconGradient: "from-zinc-400/20 to-neutral-400/20",
      slug: "keis-ariel-metall",
    },
  ],
};

const allCases: CaseStudy[] = industries.flatMap((industry) =>
  (casesByIndustry[industry] || []).map((c) => ({ ...c, industry })),
);

function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 4000,
) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "paused" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (displayText.length < currentWord.length) {
        const t = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(t);
      }
      // Слово напечатано — переходим в паузу
      setPhase("paused");
      return;
    }

    if (phase === "paused") {
      const t = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const t = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(t);
      }
      // Стёрто — следующее слово
      setWordIndex((prev) => (prev + 1) % words.length);
      setPhase("typing");
      return;
    }
  }, [
    displayText,
    phase,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return displayText;
}

export function IndustryCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const typedText = useTypewriter(industries);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340;
    el.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="cases" className="py-28">
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
          Кейсы в отраслях
        </h2>
        <div className="mt-2 h-[1.3em] text-[clamp(28px,4.5vw,44px)]">
          <span className="gradient-text-animated font-heading font-bold tracking-[-0.02em] inline-block">
            {typedText}
          </span>
          <span className="inline-block w-[3px] h-[0.8em] bg-[#8B5CF6] ml-1 align-middle animate-pulse" />
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto py-6 scrollbar-hide px-6"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {allCases.map((caseStudy, i) => (
          <Link
            href={`/blog/${caseStudy.slug}`}
            key={caseStudy.slug}
            className="group relative flex-shrink-0 w-[320px] rounded-2xl overflow-hidden bg-white dark:bg-[linear-gradient(135deg,rgba(15,15,20,0.8),rgba(15,15,20,0.5))] border border-gray-200 dark:border-[var(--glass-border)] backdrop-blur-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:border-[#3B82F6]/30 dark:hover:border-[rgba(59,130,246,0.15)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.1),0_8px_40px_-12px_rgba(59,130,246,0.15),0_0_80px_-20px_rgba(139,92,246,0.1)] transition-all duration-500"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image area */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient}`}
              />
              <div className="absolute inset-0 bg-page/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${caseStudy.iconGradient} backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                >
                  {caseStudy.logo ? (
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.company}
                      width={100}
                      height={100}
                      className="h-10 w-auto object-contain opacity-70 dark:invert"
                    />
                  ) : (
                    <span className="text-3xl font-heading font-bold text-gray-700 dark:text-white/70">
                      {caseStudy.company.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-[10px] text-gray-500 dark:text-dim uppercase tracking-[0.15em]">
                {caseStudy.industry}
              </span>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-heading mt-2 mb-3">
                {caseStudy.company}
              </h3>
              <p className="text-sm text-gray-600 dark:text-subtle leading-relaxed mb-5">
                {caseStudy.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] group-hover:text-[#2563EB] dark:group-hover:text-[#93C5FD] group-hover:gap-3 transition-all duration-300">
                Изучить кейс
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="hidden md:flex items-center justify-center gap-3 mt-8 px-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? "border-gray-300 dark:border-white/10 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-heading cursor-pointer"
              : "border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-surface/50 text-gray-400 dark:text-dim cursor-default"
          }`}
          aria-label="Прокрутить влево"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? "border-gray-300 dark:border-white/10 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-heading cursor-pointer"
              : "border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-surface/50 text-gray-400 dark:text-dim cursor-default"
          }`}
          aria-label="Прокрутить вправо"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
