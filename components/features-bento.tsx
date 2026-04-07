"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Search,
  DollarSign,
  ShoppingCart,
  Link,
  BarChart3,
  Smartphone,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Умный каталог",
    description:
      "Интеллектуальный поиск по 1.7М+ товаров, фильтры по характеристикам, автоподбор аналогов",
    large: true,
    mockup: "search",
  },
  {
    icon: DollarSign,
    title: "Ценообразование",
    description: "Тарифы, сегменты, скидки от объёма, региональные цены",
    large: false,
  },
  {
    icon: ShoppingCart,
    title: "Управление заказами",
    description: "Бесшовная передача в 1С, статусы, спецификации",
    large: false,
  },
  {
    icon: BarChart3,
    title: "Аналитика в реальном времени",
    description: "Отчёты по менеджерам, среднему чеку, потерянным клиентам",
    large: true,
    mockup: "chart",
  },
  {
    icon: Link,
    title: "Интеграция с 1С",
    description: "Синхронизация остатков, цен и документов в реальном времени",
    large: false,
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    description: "iOS и Android — ваш каталог всегда в кармане клиента",
    large: false,
  },
];

function SearchMockup() {
  return (
    <div className="mt-6 p-4 bg-surface-inner rounded-xl border border-glass-border">
      <div className="flex items-center gap-3 px-4 py-3 bg-overlay-3 rounded-xl border border-glass-border mb-4">
        <Search className="w-5 h-5 text-[#3B82F6]" />
        <span className="text-dim text-sm">Кабель ВВГнг 3х2.5...</span>
      </div>
      <div className="rounded-xl border border-overlay-4 overflow-hidden divide-y divide-overlay-4">
        {[
          "Кабель ВВГнг-LS 3х2.5",
          "Кабель ВВГнг(А)-LS 3х2.5 ГОСТ",
          "Аналог: ПВС 3х2.5",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 px-4 py-2.5"
          >
            <span className="text-sm text-body truncate">{item}</span>
            <span
              className={`text-xs font-medium whitespace-nowrap shrink-0 ${i === 2 ? "text-[#8B5CF6]" : "text-emerald-400/80"}`}
            >
              {i === 2 ? "Аналог" : "В наличии"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartMockup() {
  const [animated, setAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const bars = [40, 65, 45, 85, 55, 95, 70];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimated(true);
      },
      { threshold: 0.1 },
    );
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={chartRef}
      className="mt-6 p-4 bg-surface-inner rounded-xl border border-glass-border"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-dim uppercase tracking-wider">
          Продажи за неделю
        </span>
        <span className="text-xs text-emerald-400/80 font-medium">+12.5%</span>
      </div>
      <div
        className="flex items-end justify-between gap-3"
        style={{ height: 120 }}
      >
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
          >
            <div
              className="w-full rounded-md transition-all duration-700 ease-out"
              style={{
                height: animated ? `${height}%` : "4px",
                transitionDelay: `${i * 100}ms`,
                background:
                  "linear-gradient(to top, rgba(59,130,246,0.45), rgba(139,92,246,0.45))",
              }}
            />
            <span className="text-[10px] text-dimmer">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section id="platform" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="reveal inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
            Платформа
          </span>
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
            Всё для масштабирования
            <br className="hidden sm:block" />
            <span className="gradient-text"> оптовых продаж</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 - Large + Small */}
          <div className="reveal md:col-span-2 group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#3B82F6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/10 flex items-center justify-center border border-[#3B82F6]/10">
                  <Search className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">
                  {features[0].title}
                </h3>
              </div>
              <p className="text-subtle leading-relaxed">
                {features[0].description}
              </p>
              <SearchMockup />
            </div>
          </div>

          <div className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8B5CF6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#3B82F6]/10 flex items-center justify-center border border-[#8B5CF6]/10">
                  <span className="text-base font-semibold text-[#A78BFA]">
                    ₽
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">
                  {features[1].title}
                </h3>
              </div>
              <p className="text-subtle leading-relaxed">
                {features[1].description}
              </p>
              {/* Mini price tiers preview */}
              <div className="mt-6 space-y-2.5">
                {["Розница", "Опт", "VIP"].map((tier, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-overlay-2 rounded-xl border border-overlay-4"
                  >
                    <span className="text-sm text-subtle">{tier}</span>
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#3B82F6]/40 to-[#8B5CF6]/40"
                      style={{ width: `${70 + i * 25}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Small + Large */}
          <div className="reveal group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/15 to-[#3B82F6]/10 flex items-center justify-center border border-emerald-500/10">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">
                  {features[2].title}
                </h3>
              </div>
              <p className="text-subtle leading-relaxed">
                {features[2].description}
              </p>
              {/* Order status mini */}
              <div className="mt-6 flex items-center gap-2">
                {["Создан", "Обработан", "Отгружен"].map((s, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div
                      className={`h-1 rounded-full mb-2 ${i < 2 ? "bg-emerald-500/50" : "bg-overlay-6"}`}
                    />
                    <span className="text-[10px] text-dim">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-2 group relative p-8 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/15 to-[#06B6D4]/10 flex items-center justify-center border border-[#3B82F6]/10">
                  <BarChart3 className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">
                  {features[3].title}
                </h3>
              </div>
              <p className="text-subtle leading-relaxed">
                {features[3].description}
              </p>
              <ChartMockup />
            </div>
          </div>

          {/* Row 3 - Two small, compact */}
          <div className="reveal group relative p-5 rounded-2xl glass-card overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#06B6D4]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4]/15 to-[#3B82F6]/10 flex items-center justify-center border border-[#06B6D4]/10">
                  <Link className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-heading">
                  {features[4].title}
                </h3>
              </div>
              <p className="text-subtle leading-relaxed text-sm">
                {features[4].description}
              </p>
              {/* 1C sync visual */}
              <div className="mt-3 flex items-center justify-between">
                <div className="px-3 py-2 bg-overlay-3 rounded-lg border border-glass-border text-xs text-subtle">
                  1С
                </div>
                <div className="flex-1 mx-3 h-[1px] bg-gradient-to-r from-[#06B6D4]/40 via-[#3B82F6]/40 to-[#8B5CF6]/40 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                </div>
                <div className="px-3 py-2 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 rounded-lg border border-[#3B82F6]/10 text-xs text-body">
                  B2B
                </div>
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-2 group relative p-5 rounded-2xl glass-card overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8B5CF6]/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#EC4899]/10 flex items-center justify-center border border-[#8B5CF6]/10">
                    <Smartphone className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-heading">
                    {features[5].title}
                  </h3>
                </div>
                <p className="text-subtle leading-relaxed text-sm">
                  {features[5].description}
                </p>
                {/* Mobile platforms */}
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 rounded-lg border border-[#3B82F6]/15">
                    <svg
                      className="w-3.5 h-3.5 text-[#3B82F6]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.523 2.237a.625.625 0 0 0-.803.368l-1.21 3.217a8.575 8.575 0 0 0-7.02 0L7.28 2.605a.625.625 0 1 0-1.17.436l1.137 3.022C4.907 7.65 3.27 10.062 3.27 12.875h17.46c0-2.813-1.637-5.225-3.977-6.812l1.137-3.022a.625.625 0 0 0-.368-.804zM8.5 10.75a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75zm7 0a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75zM3.27 13.875v5.75a2.125 2.125 0 0 0 2.125 2.125h1.25V24.5a1.625 1.625 0 1 0 3.25 0v-2.75h4.21V24.5a1.625 1.625 0 1 0 3.25 0v-2.75h1.25a2.125 2.125 0 0 0 2.125-2.125v-5.75H3.27zm-2.895-.5a1.625 1.625 0 0 1 3.25 0v5a1.625 1.625 0 1 1-3.25 0v-5zm20 0a1.625 1.625 0 0 1 3.25 0v5a1.625 1.625 0 1 1-3.25 0v-5z" />
                    </svg>
                    <span className="text-xs font-medium text-body">
                      Android
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-lg border border-[#8B5CF6]/15">
                    <svg
                      className="w-3.5 h-3.5 text-[#8B5CF6]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-xs font-medium text-body">iOS</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 rounded-lg border border-[#06B6D4]/15">
                    <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span className="text-xs font-medium text-body">Web</span>
                  </div>
                </div>
              </div>
              {/* Phone image — only top half visible, bottom clipped */}
              <div className="hidden sm:block w-[140px] flex-shrink-0 h-[160px] overflow-hidden -mb-5 -mr-1">
                <Image
                  src="/mockups/phone.png"
                  alt="Мобильное приложение"
                  width={320}
                  height={640}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
