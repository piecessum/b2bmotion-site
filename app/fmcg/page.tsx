"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import {
  ShoppingCart,
  Sparkles,
  Beer,
  Lightbulb,
  RotateCcw,
  FileText,
  Clock,
  Box,
  Smartphone,
  Zap,
  Users,
  Tag,
  ArrowRight,
  DollarSign,
  Warehouse,
  Quote,
} from "lucide-react";

const categories = [
  {
    icon: ShoppingCart,
    title: "Продукты питания и напитки",
    desc: "Сюда относят крупы, молочные продукты, овощи и фрукты, мясо, рыбу, безалкогольные напитки и другие продукты питания.",
  },
  {
    icon: Sparkles,
    title: "Бытовая химия и косметика",
    desc: "В эту группу входят всевозможные чистящие и моющие средства, товары личной гигиены, декоративная и уходовая косметика.",
  },
  {
    icon: Beer,
    title: "Алкоголь и табачные изделия",
    desc: "В отдельную категорию вошли алкогольные напитки, табак, сигары и сигареты, а также спички и зажигалки.",
  },
  {
    icon: Lightbulb,
    title: "Товары быстрого пользования",
    desc: "Лампочки, батарейки, пакеты, канцелярия и другие повседневные товары составляют отдельную группу FMCG-отрасли.",
  },
];

const capabilities = [
  {
    icon: Zap,
    title: "Автоматизация продаж",
    desc: "Клиенты сами оформляют заказы и выставляют счета — без звонков менеджеру",
  },
  {
    icon: DollarSign,
    title: "Персональные цены",
    desc: "Индивидуальные скидки, кредитные лимиты и график платежей для каждого клиента",
  },
  {
    icon: RotateCcw,
    title: "Повторный заказ в один клик",
    desc: "Регулярный ассортимент сохраняется в спецификации — повторная закупка мгновенно",
  },
  {
    icon: FileText,
    title: "Документы в одном месте",
    desc: "Сертификаты, составы, счета-фактуры и накладные — всё прикреплено к товару и заказу",
  },
  {
    icon: Clock,
    title: "Контроль сроков годности",
    desc: "Покупатель видит сроки партии. Товары с истекающим сроком — автоматически по спеццене",
  },
  {
    icon: Box,
    title: "Кратность товара",
    desc: "Продажа упаковками с фиксированным количеством единиц",
  },
  {
    icon: Warehouse,
    title: "Интеграция со складом",
    desc: "Остатки по всем складам в реальном времени, сроки поставок и реализации",
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    desc: "Брендированное приложение с вашим логотипом — заказы из любой точки",
  },
];

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

export default function FmcgPage() {
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
            src="/for-bg/bg-fmcg-white.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/for-bg/bg-fmcg-dark.png"
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
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400 bg-emerald-400/10 rounded-full">
              FMCG
            </span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">
                Оптовый B2B-портал для продажи
              </span>
              <br />
              <span className="gradient-text">
                товаров повседневного спроса
              </span>
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
                <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                <span className="text-xs text-subtle">Быстрый заказ</span>
              </div>
              <div className="p-4 bg-page-alt rounded-xl mb-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium text-heading">
                    Повторный заказ #1247
                  </p>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">
                    Готов к отправке
                  </span>
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
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-md">
                    4 позиции
                  </span>
                  <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs rounded-md">
                    Спецификация
                  </span>
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
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading mb-4">
              Какие товары входят в <span className="gradient-text">FMCG-отрасль</span>
            </h2>
          </div>
          <p className="reveal text-body max-w-3xl mx-auto text-center mb-16">
            FMCG — это сектор товаров повседневного и массового спроса.
            Невысокая стоимость, регулярное приобретение, быстрая продажа и
            оборачиваемость запасов — основные характеристики этой отрасли.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((c, i) => (
              <div
                key={i}
                className="reveal flex gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-heading mb-1">
                    {c.title}
                  </h3>
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
                Рынок FMCG считается одним из самых конкурентных и давно
                сформированных.{" "}
                <span className="text-heading font-medium">
                  B2B-платформа продуктов питания и товаров FMCG
                </span>{" "}
                поможет компании перейти на новый уровень развития, предложить
                клиентам новый способ понятного и быстрого автозаказа в
                интернете и отстроиться от конкурентов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            <span className="gradient-text">Возможности</span> B2B Движение FMCG
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Dashboard — row 1: metrics */}
            <div className="reveal md:col-span-4 p-5 bg-surface-hover rounded-2xl border border-border-default">
              <p className="text-xs text-subtle mb-4">Панель управления FMCG</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Заказов сегодня", value: "47", change: "+12%" },
                  { label: "Средний чек", value: "84 500 ₽", change: "+8%" },
                  { label: "Активных клиентов", value: "312", change: "+5%" },
                  { label: "Повторных заказов", value: "68%", change: "+3%" },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-page-alt rounded-xl">
                    <p className="text-xs text-subtle mb-1">{s.label}</p>
                    <p className="text-xl font-bold text-heading">{s.value}</p>
                    <p className="text-xs text-emerald-500">{s.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard — row 2: chart + categories */}
            <div className="reveal md:col-span-3 p-5 bg-surface-hover rounded-2xl border border-border-default">
              <p className="text-xs text-subtle mb-3">Динамика заказов</p>
              <div className="flex gap-1.5 h-28">
                {[
                  { h: 35, d: "Пн" },
                  { h: 42, d: "Вт" },
                  { h: 28, d: "Ср" },
                  { h: 55, d: "Чт" },
                  { h: 47, d: "Пт" },
                  { h: 60, d: "Сб" },
                  { h: 38, d: "Вс" },
                  { h: 72, d: "Пн" },
                  { h: 65, d: "Вт" },
                  { h: 80, d: "Ср" },
                  { h: 58, d: "Чт" },
                  { h: 47, d: "Пт" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500/30 to-emerald-500/80 rounded-t-sm"
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
                  ["Продукты питания", "42%"],
                  ["Бытовая химия", "28%"],
                  ["Напитки", "18%"],
                  ["Прочее", "12%"],
                ].map(([name, pct], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-body">{name}</span>
                      <span className="text-heading font-medium">{pct}</span>
                    </div>
                    <div className="h-1 bg-page-alt rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/60 rounded-full"
                        style={{ width: pct as string }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities cards — integrated into the same grid */}
            {capabilities.map((c, i) => (
              <div
                key={i}
                className="reveal md:col-span-2 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/40 transition-all duration-500 glow-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-emerald-500" />
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

      {/* Advantages */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-4">
            Важные преимущества B2B-платформы
          </h2>
          <p className="reveal text-center gradient-text font-heading font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] mb-16">
            для FMCG-рынка
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {advantages.map((a, i) => (
              <div
                key={i}
                className="reveal p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-emerald-500/40 transition-all duration-500 glow-card flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <a.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading mb-1">
                  {a.title}
                </h3>
                <p className="text-sm text-emerald-500 font-medium mb-5">
                  {a.subtitle}
                </p>
                <ul className="space-y-3 mt-auto">
                  {a.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-body"
                    >
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
            Отзыв о платформе FMCG-компании <span className="gradient-text">«Рэйд-21»</span>
          </h2>
          <div className="reveal relative p-8 md:p-12 bg-surface-hover rounded-3xl border border-border-default">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-emerald-500/20" />
            <div className="relative z-10">
              <p className="text-lg text-body leading-relaxed mb-8 italic">
                Запуск прошёл быстро и без лишней бюрократии. Поддержка
                реагирует оперативно, внедрение проходит в диалоге: нас слушают
                и предлагают решения. Видно постоянное развитие сервиса — новые
                функции выходят регулярно. Для нас это надёжный технологический
                партнёр и трамплин для роста. Тандем — 100%.
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-xl border border-border-default bg-surface p-3 dark:border-emerald-500/30 dark:bg-surface-hover">
                  <Image
                    src="/logos/raid21.svg"
                    alt="Рэйд-21"
                    width={180}
                    height={60}
                    className="h-12 w-auto object-contain dark:invert"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-heading">
                    Рэйд-21
                  </p>
                  <p className="text-sm text-subtle">
                    Крупнейший дистрибьютор продуктов питания в Республике
                    Башкортостан
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
