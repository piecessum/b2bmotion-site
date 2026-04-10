"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import Image from "next/image";
import {
  ShoppingCart,
  Link2,
  BarChart3,
  DollarSign,
  FileText,
  Search,
  Upload,
  Smartphone,
  HardHat,
  Building2,
  Landmark,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Удобный и быстрый каталог товаров",
    desc: "Интуитивно понятный каталог с актуальными ценами, наличием и остатками по всем складам. Мгновенная загрузка страниц — без задержек даже для каталогов от 200 тысяч товаров.",
  },
  {
    icon: Link2,
    title: "Интеграция с внешними сервисами",
    desc: "Бесшовная интеграция со службами доставки крупных и хрупких грузов, автоматический расчёт стоимости доставки и отслеживание в реальном времени.",
  },
  {
    icon: BarChart3,
    title: "Модуль аналитики со статистикой продаж",
    desc: "Графики и диаграммы для отслеживания динамики заказов, регистраций, среднего чека и этапов вовлечения клиентов. Инструмент для оценки работы отделов продаж.",
  },
];

const capabilities = [
  {
    icon: DollarSign,
    title: "Актуальные цены и остатки",
    desc: "В системе заказчик видит товары с актуальными ценами, наличием и остатками по всем складам.",
  },
  {
    icon: ShoppingCart,
    title: "Рекомендации и акции",
    desc: "Клиенты смогут покупать строительные товары со скидкой, получать сезонные предложения или персональные рекомендации от менеджера.",
  },
  {
    icon: Search,
    title: "Поиск аналогов",
    desc: "Если нужного товара не окажется в наличии, покупатель сможет подобрать аналог с теми же характеристиками или найти более выгодное предложение.",
  },
  {
    icon: Upload,
    title: "Импорт Excel-файла",
    desc: "Загрузите Excel-файл с готовой подборкой строительных товаров, чтобы не искать их вручную, или проценить смету.",
  },
  {
    icon: DollarSign,
    title: "Ценообразование",
    desc: "Настройка цен в зависимости от региона или объёма корзины с напоминанием, сколько ещё добавить, чтобы применилась скидка.",
  },
  {
    icon: FileText,
    title: "Документооборот",
    desc: "Из 1С в систему передаются все документы к заказу с факсимильными подписью и печатью: счёт, накладная, счёт-фактура.",
  },
];

const buyers = [
  {
    icon: HardHat,
    title: "Частные мастера",
    desc: "Строители, прорабы, бригады, снабженцы и специалисты, для которых стройка и ремонт — ежедневная работа",
  },
  {
    icon: Building2,
    title: "Строительные компании",
    desc: "Юридические лица и подрядчики, которые занимаются черновой отделкой в жилых домах и коммерческим строительством.",
  },
  {
    icon: Landmark,
    title: "Застройщики",
    desc: "Крупные компании, которые работают с производителями стройматериалов",
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    ref.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function BuildingPage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen bg-page-alt noise-overlay"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/for-bg/bg-building-white.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/for-bg/bg-building-dark.png"
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
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-orange-400 bg-orange-400/10 rounded-full">
              Стройматериалы
            </span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">Оптовый B2B-портал</span>
              <br />
              <span className="gradient-text">
                для продажи строительных материалов
              </span>
            </h1>
            <ul className="reveal space-y-3 text-lg text-body mb-8 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                Готовность и первые продажи через 3 месяца
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                Минимальные вложения на старте
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                Лучшее решение для продавцов отделочных товаров
              </li>
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
                <div className="w-3 h-3 rounded-full bg-orange-500/30" />
                <span className="text-xs text-subtle">
                  Каталог стройматериалов
                </span>
              </div>
              <div className="p-4 bg-page-alt rounded-xl mb-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium text-heading">
                    Заказ #3084
                  </p>
                  <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-xs rounded-md">
                    В сборке
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    ["Цемент М500 50кг", "40 шт", "18 000 ₽"],
                    ["Гипсокартон 12.5мм", "120 л.", "52 800 ₽"],
                    ["Штукатурка Knauf 30кг", "60 шт", "27 600 ₽"],
                    ["Профиль ПП 60×27", "200 шт", "14 400 ₽"],
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
                  <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs rounded-md">
                    4 позиции
                  </span>
                  <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded-md">
                    Смета
                  </span>
                </div>
                <p className="text-sm font-semibold text-heading">112 800 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — Строительный B2B-портал — это */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Строительный <span className="gradient-text">B2B-портал</span> — это
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="reveal p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-orange-500/40 transition-all duration-500 glow-card flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard — Возможности */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            <span className="gradient-text">Возможности</span> B2B-платформы
            <br />
            строительных материалов
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Dashboard metrics */}
            <div className="reveal md:col-span-4 p-5 bg-surface-hover rounded-2xl border border-border-default">
              <p className="text-xs text-subtle mb-4">Панель управления</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Заказов сегодня", value: "34", change: "+18%" },
                  { label: "Средний чек", value: "127 400 ₽", change: "+11%" },
                  { label: "Активных клиентов", value: "186", change: "+7%" },
                  { label: "Повторных заказов", value: "61%", change: "+4%" },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-page-alt rounded-xl">
                    <p className="text-xs text-subtle mb-1">{s.label}</p>
                    <p className="text-xl font-bold text-heading">{s.value}</p>
                    <p className="text-xs text-orange-500">{s.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="reveal md:col-span-3 p-5 bg-surface-hover rounded-2xl border border-border-default">
              <p className="text-xs text-subtle mb-3">Динамика заказов</p>
              <div className="flex gap-1.5 h-28">
                {[
                  { h: 40, d: "Пн" },
                  { h: 55, d: "Вт" },
                  { h: 35, d: "Ср" },
                  { h: 65, d: "Чт" },
                  { h: 50, d: "Пт" },
                  { h: 30, d: "Сб" },
                  { h: 20, d: "Вс" },
                  { h: 60, d: "Пн" },
                  { h: 75, d: "Вт" },
                  { h: 85, d: "Ср" },
                  { h: 68, d: "Чт" },
                  { h: 52, d: "Пт" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-orange-500/30 to-orange-500/80 rounded-t-sm"
                      style={{ height: `${bar.h}%` }}
                    />
                    <span className="text-[9px] text-subtle leading-none mt-1.5 flex-shrink-0">
                      {bar.d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal md:col-span-1 p-5 bg-surface-hover rounded-2xl border border-border-default">
              <p className="text-xs text-subtle mb-3">Топ категории</p>
              <div className="space-y-3">
                {[
                  ["Сухие смеси", "34%"],
                  ["Гипсокартон", "24%"],
                  ["Кровля", "22%"],
                  ["Прочее", "20%"],
                ].map(([name, pct], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-body">{name}</span>
                      <span className="text-heading font-medium">{pct}</span>
                    </div>
                    <div className="h-1 bg-page-alt rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500/60 rounded-full"
                        style={{ width: pct as string }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capability cards */}
            {capabilities.map((c, i) => (
              <div
                key={i}
                className="reveal md:col-span-2 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-orange-500/40 transition-all duration-500 glow-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-heading">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Banner */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal relative rounded-3xl bg-gradient-to-br from-orange-900/40 via-amber-900/30 to-yellow-900/40 border border-orange-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-page/90 via-page/70 to-transparent rounded-3xl" />
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.08]">
              <div className="absolute inset-0 bg-gradient-to-bl from-orange-400 to-amber-600 blur-[60px]" />
            </div>
            <div className="relative z-10 p-10 md:p-16 md:max-w-[55%]">
              <h3 className="font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.02em] text-heading mb-4">
                Мобильное приложение
                <br />в пакете с B2B-системой
              </h3>
              <p className="text-lg text-body leading-relaxed mb-8 max-w-xl">
                Покупка ваших строительных и отделочных материалов прямо на
                строительном объекте или на встрече с клиентом
              </p>
              <a
                href="#cta"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                Оставить заявку
              </a>
            </div>
            {/* Phone mockup */}
            <div className="relative z-10 flex justify-center md:hidden -mt-4">
              <Image
                src="/mockups/mockup_phone_str.png"
                alt="Мобильное приложение для стройматериалов"
                width={477}
                height={520}
                className="w-[300px] h-auto drop-shadow-2xl"
              />
            </div>
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-0 w-[380px] lg:w-[420px] z-10">
              <Image
                src="/mockups/mockup_phone_str.png"
                alt="Мобильное приложение для стройматериалов"
                width={477}
                height={520}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Buyers — B2B Движение Build */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-4">
            B2B Движение Build —
          </h2>
          <p className="reveal text-center gradient-text font-heading font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] mb-16">
            платформа для профессиональных покупателей
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {buyers.map((b, i) => (
              <div
                key={i}
                className="reveal p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-orange-500/40 transition-all duration-500 glow-card flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-5">
                  <b.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading mb-3">
                  {b.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
