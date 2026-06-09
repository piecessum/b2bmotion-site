"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";
import { CtaButton } from "@/components/cta-button";
import {
  Cpu,
  Database,
  Network,
  Paintbrush,
  FileCode2,
  Search,
  Zap,
  Layers,
  ShieldCheck,
  MapPin,
  Activity,
  Users,
  Award,
  Rocket,
  Target,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  RefreshCw,
  ServerCog,
  Globe,
  BookOpen,
  ShoppingBag,
  Settings2,
  Monitor,
  HardDrive,
} from "lucide-react";

/* ── Архитектура — 8 карточек дашборда ── */

const architectureCards = [
  {
    icon: Cpu,
    tag: "PHP 8.2 (Yii2)",
    tagColor: "#777BB4",
    title: "Промышленная стабильность системы",
    desc: "Мощная серверная логика на базе актуальной версии PHP и надёжного фреймворка Yii2. Мгновенная обработка сложных бизнес-процессов, тысячи запросов одновременно без задержек и защита от самых распространённых хакерских атак.",
  },
  {
    icon: Database,
    tag: "MySQL",
    tagColor: "#4479A1",
    title: "Надёжное хранение данных",
    desc: "Самая проверенная система управления данными, чтобы гарантировать сохранность коммерческой информации. Доступ к этому архиву строго ограничен — данные защищены от удаления или кражи современными алгоритмами шифрования.",
  },
  {
    icon: Network,
    tag: "NGINX",
    tagColor: "#1FA34A",
    title: "Доступ к платформе при любых нагрузках",
    desc: "Передовые технологии распределения трафика. Веб-сервер Nginx гарантирует стабильный доступ к платформе при любых нагрузках, обеспечивая высокую скорость отдачи контента и дополнительный уровень защиты от подозрительной активности.",
  },
  {
    icon: Paintbrush,
    tag: "TAILWIND",
    tagColor: "#06B6D4",
    title: "Кастомный дизайн на любом устройстве",
    desc: "Возможность вносить изменения в дизайн, не покидая HTML-разметку. Технология Tailwind помогает разработчикам создавать полностью кастомные дизайны с большей гибкостью и контролем и гарантирует мгновенную загрузку страниц на любых устройствах.",
  },
  {
    icon: FileCode2,
    tag: "TYPESCRIPT",
    tagColor: "#3178C6",
    title: "Высокие качество и организация кода",
    desc: "Язык программирования, который расширяет JavaScript, добавляет функции для создания более надёжных и масштабируемых приложений, помогает выявлять ошибки до запуска программы, а не в процессе работы покупателя.",
  },
  {
    icon: Search,
    tag: "ELASTICSEARCH",
    tagColor: "#F09C20",
    title: "Интеллектуальный поиск товаров",
    desc: "Умный и быстрый полнотекстовый поиск, который понимает запросы клиента по любым совпадениям: код товара, название, свойства среди миллионов позиций за доли секунды. А ещё анализирует смысл запроса и выдаёт релевантные товары.",
  },
  {
    icon: Zap,
    tag: "REDIS",
    tagColor: "#DC382D",
    title: "Мгновенный отклик и управление данными",
    desc: "Redis запоминает результаты сложных расчётов. В итоге время отклика сокращается до миллисекунд, и клиент не ждёт, пока сервер подумает. Хранит данные о текущих действиях пользователя, даже если он случайно закроет вкладку или обновит страницу.",
  },
  {
    icon: Layers,
    tag: "REMIX",
    tagColor: "#8B5CF6",
    title: "Интерфейс нового поколения",
    desc: "Полнофункциональный фреймворк для создания быстрых, надёжных и масштабируемых веб-приложений. Обеспечивает плавность работы интерфейса: данные подгружаются мгновенно, а взаимодействие с платформой становится лёгким.",
  },
];

/* ── Преимущества ── */

const advantages = [
  {
    icon: MapPin,
    title: "Размещение в России",
    desc: "Платформа базируется в ведущем российском дата-центре Selectel в Москве. Бизнес не зависит от международной политики, санкций или риска внезапного отключения зарубежных облачных сервисов и гарантирует 100% соблюдение требований ФЗ-152 о хранении персональных данных.",
  },
  {
    icon: Activity,
    title: "Бесперебойность",
    desc: "Благодаря серверным мощностям корпоративного уровня (8-ядерные процессоры Intel Xeon, 32 Гб RAM), система стабильно работает даже в периоды пиковых нагрузок, например, в сезон распродаж.",
  },
  {
    icon: Users,
    title: "Команда поддержки",
    desc: "Готовая команда для поддержки B2B-системы: бэкенд- и фронтенд-разработчики, DevOps-инженер, дизайнер, 1С-специалист под руководством менеджера проекта. Быстрое решение технических задач без привлечения сторонних ресурсов.",
  },
  {
    icon: Award,
    title: "Запатентованное российское ПО",
    desc: "Наша платформа зарегистрирована в Едином реестре российского программного обеспечения. Решение полностью соответствует требованиям импортозамещения и законодательства РФ в области информационных технологий.",
  },
  {
    icon: Rocket,
    title: "Технологическое развитие",
    desc: "Мы не просто поддерживаем работоспособность системы, а регулярно обновляем архитектурное ядро. Команда следит за выходом новых языков программирования и баз данных — это гарантирует защиту от уязвимостей и высокую скорость работы.",
  },
  {
    icon: Target,
    title: "Гарантированная точность данных",
    desc: "Архитектура нашей системы исключает ошибки при передаче данных. Покупатель всегда видит актуальные остатки, персональные цены и скидки. Это исключает конфликты из-за некорректных счетов и отмен заказов из-за отсутствия товара на складе.",
  },
];

/* ── Frontend ── */

interface ScrollCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag?: string;
  features: string[];
  cta?: { label: string; href: string };
}

const frontendCards: ScrollCard[] = [
  {
    icon: Rocket,
    title: "Скорость работы",
    tag: "React + Remix",
    features: [
      "Интерфейс работает без перезагрузок. Страницы с огромными каталогами товаров открываются мгновенно.",
      "Время отклика — менее 0,1 секунды.",
      "Снижена нагрузка на процессор устройства клиента — платформа работает быстро даже на слабых ноутбуках и старых смартфонах.",
      "Система работает быстро даже через мобильный интернет или в условиях слабого сигнала.",
    ],
  },
  {
    icon: Paintbrush,
    title: "Кастомный дизайн",
    tag: "Tailwind",
    features: [
      "Можем реализовать любой уникальный дизайн бренда, сохранив высокую скорость работы.",
      "Интерфейс выглядит одинаково профессионально на мониторе, планшете и смартфоне.",
      "Любые корректировки (изменить фирменный цвет по всей системе) вносятся мгновенно и без риска сломать вёрстку.",
    ],
  },
  {
    icon: Search,
    title: "SEO-продвижение",
    tag: "SSR",
    features: [
      "Технологии серверного рендеринга (SSR), чтобы поисковики видели платформу как полноценный многостраничный сайт.",
      "Поисковики видят и индексируют каждую страницу товара. Наш опыт — 100 000 проиндексированных страниц в месяц.",
      "Отлажен механизм обработки ошибок (404), что исключает появление дублей и лишнюю нагрузку на сервер.",
    ],
    cta: {
      label: "Читать подробнее",
      href: "/blog/servernyi-rendering-dlya-spa-saita",
    },
  },
  {
    icon: Gauge,
    title: "Инструменты контроля",
    tag: "Web Vitals · Яндекс.Вебмастер",
    features: [
      "Web Vitals. Непрерывно отслеживаем метрики Google: скорость загрузки, интерактивность и визуальную стабильность сайта.",
      "Яндекс.Вебмастер. Контролируем правильность индексации и отсутствие ошибок в поисковой выдаче, чтобы ассортимент был всегда доступен клиентам.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Безопасность",
    tag: "TypeScript · React",
    features: [
      "TypeScript и современные стандарты React защищают фронтенд от распространённых атак.",
      "Архитектура React + Remix гарантирует, что в браузер клиента попадают только те данные, на которые у него есть права. Никакой лишней информации о других заказах или остатках в коде страницы нет.",
    ],
  },
];

const backendCards: ScrollCard[] = [
  {
    icon: ShieldCheck,
    title: "Надёжно и современно",
    tag: "PHP 8.2 · Yii2 · MySQL",
    features: [
      "Актуальная версия PHP 8.2 гарантирует защиту от уязвимостей и высокую производительность.",
      "Промышленный фреймворк Yii2 содержит встроенные механизмы обработки ошибок и логирования.",
      "Все компоненты — мировые стандарты, проверенные нагрузками крупных компаний и маркетплейсов.",
      "Движок MySQL гарантирует завершённость каждой операции. Ситуация «деньги списались, а заказ пропал» исключена.",
    ],
  },
  {
    icon: Activity,
    title: "Отказоустойчивость при нагрузках",
    tag: "Nginx · Redis",
    features: [
      "Связка Nginx и Redis гарантирует стабильность и скорость при пиковых нагрузках.",
      "Nginx эффективно фильтрует и распределяет входящие запросы, отсекая вредоносный трафик.",
      "Redis берёт на себя 90% нагрузки по чтению данных: цены, категории — не давая основной БД перегреться.",
      "Не теряете заказы из-за технических сбоев или перегрузки сервера.",
    ],
  },
  {
    icon: Database,
    title: "Работа с большими данными",
    tag: "B2B-сценарии",
    features: [
      "Платформа спроектирована для гигантских каталогов и сложных матриц цен. Многоуровневое хранение и поисковая оптимизация — поиск по миллиону позиций мгновенно.",
      "БД оптимизирована под B2B-сценарии с большим количеством шлюзовых таблиц, что обеспечивает корректный обмен с учётными системами.",
    ],
  },
  {
    icon: Search,
    title: "Умный поиск",
    tag: "Elasticsearch",
    features: [
      "Клиент найдёт нужный товар, даже если допустит ошибку в названии или введёт только артикул. Поиск работает как в крупных маркетплейсах.",
      "Система понимает не только слова, но и смысл запроса. Векторные алгоритмы: запрос «защита для рук» выдаст рабочие перчатки.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Бесшовная синхронизация",
    tag: "1С · ERP · CRM",
    features: [
      "Архитектура БД оптимизирована под тяжёлые B2B-сценарии. Шлюзовые таблицы обеспечивают корректный обмен с 1С и ERP — без ошибок при передаче заказов, цен и остатков.",
      "Синхронизация с другими программами: каталоги, CRM, программы ценообразования, бонусные программы лояльности.",
    ],
  },
];

/* ── Pricing ── */

const pricingCards = [
  {
    badge: "SaaS-модель",
    price: "150 000 ₽",
    pricePeriod: "в месяц",
    title: "Аренда на наших серверах",
    features: [
      "Мы берём обслуживание на себя",
      "Размещение в дата-центре Selectel в Москве — высокая скорость, доступность 24/7 и защита",
      "Размещение в РФ — полное соответствие государственным стандартам хранения данных",
      "Обеспечение бесперебойной работы веб-приложения",
      "8-ядерные Intel Xeon и 32 Гб ОЗУ — мгновенная работа с каталогами любого объёма",
    ],
    primary: true,
  },
  {
    badge: "On-Premise",
    price: "от 3,2 млн ₽",
    pricePeriod: "единоразово",
    title: "Размещение на собственном сервере",
    features: [
      "Полный контроль над данными и инфраструктурой внутри компании",
      "Возможность уникальной кастомизации под особенности бизнеса",
      "Независимость от внешних серверов и провайдеров",
      "Развёртывание практически на любом оборудовании или в любом облаке",
      "Запуск без дополнительных капиталовложений в ИТ-инфраструктуру",
    ],
    primary: false,
  },
];

/* ── IT-итог дашборд ── */

const itSummary = [
  {
    server: "НАШ СЕРВЕР",
    title: "Backend",
    icon: ServerCog,
    items: [
      "PHP 8.2 (Yii2)",
      "Elasticsearch — полнотекстовый поиск",
      "MySQL — основная БД, шлюзовые таблицы",
      "Redis — кэширование",
      "Nginx — веб-сервер",
      "NodeJS — сервис для генерации PDF",
    ],
  },
  {
    server: "НАШ СЕРВЕР",
    title: "Frontend",
    icon: Monitor,
    items: ["React", "Remix", "TypeScript", "Tailwind"],
  },
  {
    server: "НАШ СЕРВЕР",
    title: "SaaS-модель",
    icon: Globe,
    items: [
      "Российский сервер в дата-центре Selectel в Москве",
      "Processor: Intel(R) Xeon(R) CPU E3-1230 v6 @ 3.50GHz",
      "Processor Architecture: x86_64",
      "Number of cores: 8",
      "Memory: 32 Гб",
      "OS Release: Debian GNU/Linux 9.1 (stretch)",
      "Монолит",
    ],
  },
  {
    server: "ВАШ СОБСТВЕННЫЙ СЕРВЕР",
    title: "On-Premise",
    icon: HardDrive,
    items: [
      "Processor Architecture: x86_64",
      "Number of cores: 4",
      "Memory: 8 Гб",
      "Disc: 30 Гб",
      "OS Release: Debian GNU/Linux",
    ],
  },
];

/* ── Reveal-on-scroll helper ── */

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ts-reveal-in");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    ref.current
      ?.querySelectorAll(".ts-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

/* ── Horizontal scroll component ── */

function HorizontalScroll({ cards }: { cards: ScrollCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    const cardWidth = 360;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto py-6 scrollbar-hide px-6 scroll-pl-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] md:scroll-pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="ts-reveal group relative flex-shrink-0 w-[80vw] max-w-[340px] sm:w-[360px] sm:max-w-none rounded-2xl bg-surface border border-border-default hover:border-[#3B82F6]/30 hover:shadow-[0_8px_40px_-12px_rgba(59,130,246,0.15),0_0_80px_-20px_rgba(139,92,246,0.1)] transition-all duration-500 p-7 flex flex-col"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#60A5FA]" />
                </div>
                <div className="min-w-0">
                  {card.tag && (
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#60A5FA] mb-1.5 truncate">
                      {card.tag}
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-lg text-heading leading-tight">
                    {card.title}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5 flex-1">
                {card.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-body leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {card.cta && (
                <Link
                  href={card.cta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] hover:gap-2 transition-all mt-auto"
                >
                  {card.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex items-center justify-center gap-3 mt-4 px-6">
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
    </>
  );
}

/* ── Page ── */

export function TechStackSections({
  switcher,
}: {
  switcher?: React.ReactNode;
}) {
  return (
    <>
      {/* HERO */}
      <section className="relative flex flex-col pt-36 pb-20 px-6 overflow-hidden lg:min-h-[620px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/for-bg/bg-techsteck-white.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/for-bg/bg-techsteck-dark.png"
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

        {switcher && (
          <div className="relative z-10 max-w-6xl mx-auto w-full mb-12">
            {switcher}
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex items-center">
          <div className="max-w-2xl">
            {!switcher && (
              <span className="ts-reveal inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#2563EB] dark:text-[#93C5FD] bg-[#3B82F6]/15 dark:bg-[#3B82F6]/20 border border-[#3B82F6]/40 dark:border-[#3B82F6]/45 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(59,130,246,0.18)] dark:shadow-[0_0_18px_rgba(59,130,246,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Технологический стек
              </span>
            )}
            <h1 className="ts-reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">Система B2B </span>
              <span className="gradient-text-animated">«Движение»</span>
              <span className="text-heading">:</span>
              <br />
              <span className="text-heading">технологический </span>
              <span className="gradient-text">стек</span>
            </h1>
            <p className="ts-reveal text-lg text-body mb-8 max-w-lg">
              Проверенный backend, современный frontend, российская
              инфраструктура для B2B
            </p>
            <div className="ts-reveal flex flex-wrap items-center gap-3">
              <a
                href="#architecture"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-transparent bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                Изучить архитектуру
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-heading/20 text-heading font-semibold hover:bg-overlay-4 transition-all duration-300"
              >
                Варианты размещения
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE DASHBOARD */}
      <section id="architecture" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Архитектура
            </span>
            <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Архитектура B2B-системы:
              <br className="hidden sm:block" />
              <span className="gradient-text">мощные решения </span>
              для оптового бизнеса
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.tag}
                  className="ts-reveal group relative p-6 rounded-2xl bg-surface border border-border-default hover:border-[#3B82F6]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.18)] transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${card.tagColor}26, ${card.tagColor}10)`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: card.tagColor }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md whitespace-nowrap"
                      style={{
                        color: card.tagColor,
                        background: `${card.tagColor}1F`,
                        border: `1px solid ${card.tagColor}33`,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-heading leading-snug mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCESS RIGHTS — split */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Права доступа
            </span>
            <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Разделение прав доступа к системе
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="ts-reveal relative overflow-hidden rounded-3xl bg-surface border border-border-default hover:border-[#3B82F6]/30 transition-colors group flex flex-col">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#3B82F6]/10 blur-3xl group-hover:bg-[#3B82F6]/15 transition-colors duration-700 pointer-events-none" />
              <div className="relative p-8 sm:p-10 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20 flex items-center justify-center mb-6">
                  <ShoppingBag className="w-7 h-7 text-[#60A5FA]" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-2">
                  Для покупателей
                </div>
                <h3 className="font-heading font-bold text-2xl text-heading mb-3">
                  Клиентская витрина
                </h3>
                <p className="text-base text-body leading-relaxed">
                  Публичный веб-интерфейс для оформления заказов
                </p>
              </div>
              <div className="relative mx-8 sm:mx-10 mb-8 sm:mb-10 mt-auto">
                <div className="relative rounded-xl overflow-hidden border border-border-default bg-page-alt shadow-[0_8px_30px_-12px_rgba(59,130,246,0.18)] group-hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.28)] transition-shadow duration-500">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-page-alt border-b border-border-subtle">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]/70" />
                  </div>
                  <Image
                    src="/images/tech/Main.png"
                    alt="Клиентская витрина — публичный веб-интерфейс"
                    width={1440}
                    height={868}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            <div className="ts-reveal relative overflow-hidden rounded-3xl bg-surface border border-border-default hover:border-[#7C3AED]/30 transition-colors group flex flex-col">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#7C3AED]/10 blur-3xl group-hover:bg-[#7C3AED]/15 transition-colors duration-700 pointer-events-none" />
              <div className="relative p-8 sm:p-10 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#8B5CF6]/20 flex items-center justify-center mb-6">
                  <Settings2 className="w-7 h-7 text-[#A78BFA]" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#A78BFA] mb-2">
                  Для команды
                </div>
                <h3 className="font-heading font-bold text-2xl text-heading mb-3">
                  Панель управления
                </h3>
                <p className="text-base text-body leading-relaxed">
                  Защищённый административный раздел для менеджеров и
                  руководителей
                </p>
              </div>
              <div className="relative mx-8 sm:mx-10 mb-8 sm:mb-10 mt-auto">
                <div className="relative rounded-xl overflow-hidden border border-border-default bg-page-alt shadow-[0_8px_30px_-12px_rgba(124,58,237,0.18)] group-hover:shadow-[0_12px_40px_-12px_rgba(124,58,237,0.28)] transition-shadow duration-500">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-page-alt border-b border-border-subtle">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]/70" />
                  </div>
                  <Image
                    src="/images/tech/Adminka.png"
                    alt="Панель управления — административный раздел для менеджеров"
                    width={1440}
                    height={868}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Преимущества
            </span>
            <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Преимущества нашей{" "}
              <span className="gradient-text">технологической экосистемы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="ts-reveal group p-7 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/25 hover:bg-overlay-3 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-heading mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FRONTEND */}
      <section className="relative py-20">
        <div className="mb-8 px-[max(1.5rem,calc((100vw-72rem)/2))]">
          <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
            Фронтенд
          </span>
          <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
            Современный фронтенд, который{" "}
            <span className="gradient-text">помогает принимать решения</span>
          </h2>
        </div>
        <HorizontalScroll cards={frontendCards} />
      </section>

      {/* BACKEND */}
      <section className="relative py-20">
        <div className="mb-8 px-[max(1.5rem,calc((100vw-72rem)/2))]">
          <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
            Бэкенд
          </span>
          <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
            Надёжный бэкенд:{" "}
            <span className="gradient-text">не падает и не тормозит</span> при
            высоких нагрузках
          </h2>
        </div>
        <HorizontalScroll cards={backendCards} />
      </section>

      {/* SELECTEL */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="ts-reveal relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-surface border border-border-default">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e83a50]/[0.04] via-transparent to-[#3B82F6]/[0.05] pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#e83a50]/8 blur-[120px] pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
              <div className="flex flex-col items-center lg:items-start gap-4">
                <a
                  href="https://selectel.ru/services/dedicated/russian-servers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col items-center lg:items-start gap-3 transition-all"
                >
                  <Image
                    src="/logos/logo.svg"
                    alt="Selectel"
                    width={220}
                    height={44}
                    className="h-10 sm:h-11 w-auto dark:brightness-0 dark:invert transition-all"
                  />
                  <span className="inline-flex items-center gap-1 text-xs text-dim group-hover:text-[#60A5FA] transition-colors">
                    selectel.ru
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e83a50]/10 border border-[#e83a50]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e83a50]" />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-[#e83a50]">
                    Tier III
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-bold text-[clamp(24px,3.5vw,36px)] tracking-[-0.02em] text-heading mb-6 leading-tight">
                  Российский сервер
                </h2>

                <ul className="space-y-3">
                  {[
                    "Один из лидеров рынка в РФ. Размещение здесь означает защиту уровня Tier III (международный стандарт надёжности дата-центра).",
                    "Все инженерные системы дублируются. Если отключат электричество, сервер продолжит работать без пауз на резервных мощностях.",
                    "Сервер соответствует требованиям российского законодательства, защищён от санкций и блокировки.",
                    "Дата-центр находится в Москве под круглосуточной охраной, видеонаблюдением и оснащён современными системами пожаротушения.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm sm:text-base text-body leading-relaxed"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Размещение
            </span>
            <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Гибкость размещения{" "}
              <span className="gradient-text">B2B-системы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pricingCards.map((card) => (
              <div
                key={card.title}
                className={`ts-reveal relative rounded-3xl p-8 sm:p-10 transition-all duration-500 flex flex-col ${
                  card.primary
                    ? "bg-surface border border-[#3B82F6]/25 shadow-[0_0_60px_-20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.35)]"
                    : "bg-overlay-2 border border-glass-border hover:border-[#7C3AED]/25"
                }`}
              >
                {card.primary && (
                  <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-[10px] font-semibold uppercase tracking-[0.15em]">
                    Рекомендуем
                  </div>
                )}
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-3">
                  {card.badge}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-heading font-bold text-[clamp(32px,5vw,44px)] text-heading tracking-tight">
                    {card.price}
                  </span>
                  <span className="text-sm text-dim">{card.pricePeriod}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-subheading mb-7">
                  {card.title}
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-body leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <CtaButton
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    card.primary
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:brightness-110 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
                      : "bg-overlay-4 border border-glass-border text-heading hover:bg-overlay-6"
                  }`}
                >
                  Оставить заявку
                  <ArrowRight className="w-4 h-4" />
                </CtaButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT SUMMARY DASHBOARD */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="ts-reveal text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Сводка
            </span>
            <h2 className="ts-reveal font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Итоговые сведения для{" "}
              <span className="gradient-text">IT-отдела</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itSummary.map((block) => {
              const Icon = block.icon;
              const isOwn = block.server === "ВАШ СОБСТВЕННЫЙ СЕРВЕР";
              return (
                <div
                  key={block.title}
                  className={`ts-reveal p-7 rounded-2xl border transition-all duration-500 ${
                    isOwn
                      ? "bg-surface border-[#7C3AED]/25 hover:border-[#7C3AED]/40"
                      : "bg-surface border-border-default hover:border-[#3B82F6]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isOwn
                          ? "bg-gradient-to-br from-[#7C3AED]/20 to-[#8B5CF6]/20"
                          : "bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isOwn ? "text-[#A78BFA]" : "text-[#60A5FA]"
                        }`}
                      />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5 ${
                          isOwn ? "text-[#A78BFA]" : "text-[#60A5FA]"
                        }`}
                      >
                        {block.server}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-heading">
                        {block.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-2 font-mono">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] text-body leading-relaxed"
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isOwn ? "bg-[#A78BFA]" : "bg-[#60A5FA]"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/wiki/tech"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-overlay-2 border border-glass-border text-sm font-medium text-body hover:text-heading hover:border-[#3B82F6]/30 hover:bg-overlay-3 transition-all max-w-full"
            >
              <BookOpen className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
              <span className="text-center">
                <span className="sm:hidden">Материалы в базе знаний</span>
                <span className="hidden sm:inline">
                  Полные технические материалы в базе знаний
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#60A5FA] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function TechStackClient() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen bg-page-alt noise-overlay overflow-x-hidden"
    >
      <Navbar />
      <TechStackSections />
      <CTASection />
      <Footer />
    </main>
  );
}
