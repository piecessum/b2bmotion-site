"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  "Все",
  "Каталог",
  "Заказы",
  "Финансы",
  "Коммуникации",
  "Аналитика",
  "Настройки",
];

const articles = [
  {
    title: "Регистрация и авторизация",
    description:
      "Настройка процесса регистрации покупателей, формы входа, восстановление пароля и управление сессиями.",
    category: "Настройки",
    image: "/ui-screenshots/vhod.png",
  },
  {
    title: "Личный кабинет покупателя",
    description:
      "Управление профилем, история заказов, избранное, шаблоны заказов, документы и уведомления.",
    category: "Заказы",
    image: "/ui-screenshots/lichny-kabinet.png",
  },
  {
    title: "Кабинет клиента",
    description:
      "Настройка интерфейса кабинета клиента, брендирование, персонализация и управление доступом.",
    category: "Настройки",
    image: "/ui-screenshots/kabinet-klienta.png",
  },
  {
    title: "Каталог и товары",
    description:
      "Структура каталога, карточки товаров, характеристики, остатки по складам, изображения и вложения.",
    category: "Каталог",
    image: "/ui-screenshots/katalog.png",
  },
  {
    title: "Избранное",
    description:
      "Списки избранных товаров, шаблоны заказов, быстрый повторный заказ из сохранённого.",
    category: "Каталог",
    image: "/ui-screenshots/izbrannoe.png",
  },
  {
    title: "Прайсы, цены, скидки, валюты",
    description:
      "Управление прайс-листами, персональные цены, скидки от объёма, мультивалютность и сегменты покупателей.",
    category: "Финансы",
    image: "/ui-screenshots/skidki.png",
  },
  {
    title: "Модуль доставки",
    description:
      "Настройка способов доставки, расчёт стоимости, зоны доставки, интеграция с транспортными компаниями.",
    category: "Заказы",
    image: "/ui-screenshots/dostavka.png",
  },
  {
    title: "Модуль документооборота",
    description:
      "Автоматическое формирование счетов, накладных, актов сверки, УПД и других документов.",
    category: "Финансы",
    image: "/ui-screenshots/dokumenty.png",
  },
  {
    title: "Модуль коммерческих предложений (КП)",
    description:
      "Создание и отправка КП, шаблоны, персонализация, отслеживание статусов и конверсии.",
    category: "Коммуникации",
    image: "/ui-screenshots/kp.png",
  },
  {
    title: "Модуль статистики",
    description:
      "Отчёты по продажам, воронка заказов, аналитика по менеджерам, ABC-анализ, потерянные клиенты.",
    category: "Аналитика",
    image: "/ui-screenshots/status.png",
  },
  {
    title: "Статьи и рассылки",
    description:
      "Email и SMS рассылки, публикация статей, сегментация базы, триггерные письма и аналитика.",
    category: "Коммуникации",
    image: "/ui-screenshots/stati.png",
  },
  {
    title: "Мобильное приложение",
    description:
      "Нативное приложение для iOS и Android с каталогом, заказами, push-уведомлениями и оффлайн-режимом.",
    category: "Каталог",
    image: "/ui-screenshots/mobilka.png",
  },
  {
    title: "Работа без 1С",
    description:
      "Возможность полноценной работы платформы без интеграции с 1С — автономный режим управления.",
    category: "Настройки",
    image: "/ui-screenshots/bez-1s.png",
  },
];

export default function WikiFunctionPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCategory =
      activeCategory === "Все" || a.category === activeCategory;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back */}
          <Link
            href="/wiki"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            База знаний
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading mb-4">
              Функционал <span className="gradient-text">системы</span>
            </h1>
            <p className="text-lg text-subtle max-w-2xl">
              Подробное описание всех модулей и возможностей платформы B2B
              Движение
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
            <input
              type="text"
              placeholder="Поиск по разделам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-overlay-3 rounded-xl border border-glass-border text-sm text-body placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/30 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "bg-overlay-3 border border-glass-border text-subtle hover:text-body hover:border-[#3B82F6]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((article, i) => (
              <div
                key={i}
                className="group rounded-2xl glass-card overflow-hidden hover:border-[#3B82F6]/20 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-surface-inner">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={520}
                    height={520}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-heading mb-2 group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-subtle leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-dim py-20">
              Ничего не найдено. Попробуйте другой запрос.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
