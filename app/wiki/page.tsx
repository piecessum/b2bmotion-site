"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, Mail, Phone, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const sections = [
  {
    id: "function",
    title: "Функционал системы",
    href: "/wiki/function",
    description: "Основные модули и возможности платформы",
    items: [
      "Регистрация и авторизация",
      "Интеллектуальный поиск",
      "Личный кабинет покупателя",
      "Каталог и товары",
      "Прайсы, цены, скидки, валюты",
      "Модуль оплаты",
      "Модуль доставки",
      "Модуль документооборота",
      "Модуль коммерческих предложений (КП)",
      "Модуль рассылок",
      "Модуль статистики",
      "Мобильное приложение",
    ],
  },
  {
    id: "custom",
    title: "Кастомизация под клиента",
    href: "#",
    description: "Настройка платформы под ваши бизнес-процессы",
    items: [
      "Каталог и товары",
      "Регионы и склады",
      "Оплата и доставка",
      "Пользователи",
      "Компании",
      "Спецификации",
      "Главная страница",
      "Поиск",
      "Настройки",
      "Уведомления",
      "Онлайн-чат",
      "«Помощь» для клиента",
      "Правовые документы",
      "Реклама",
      "Статистика",
      "Мониторинг шлюзовых таблиц (ШТ)",
      "SEO",
    ],
  },
  {
    id: "tech",
    title: "Технические настройки",
    href: "#",
    description: "Интеграции, API и техническая документация",
    items: [
      "Общие тех.сведения",
      "Интеграция с шлюзовыми таблицами (ШТ)",
      "Интеграция с 1С",
      "Интеграция с БД РАЭК",
      "Прямой API-доступ",
      "Экспорт для Яндекс и Google",
    ],
  },
]

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-dim bg-overlay-4 border border-glass-border rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              База знаний
            </span>
            <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] leading-[1.15] tracking-[-0.025em] text-heading">
              Документация платформы{" "}
              <span className="gradient-text">«B2B Движение»</span>
            </h1>
            <p className="mt-3 text-base text-subtle">
              Руководства, инструкции и справочные материалы по работе с платформой от компании 3Davinci.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <nav className="inline-flex p-1 rounded-xl bg-overlay-4 border border-glass-border gap-1">
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(i)}
                  className={`
                    px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all
                    ${activeTab === i
                      ? "bg-surface text-heading shadow-sm border border-glass-border"
                      : "text-dim hover:text-body border border-transparent"
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-semibold text-xl text-heading">
                  {sections[activeTab].title}
                </h2>
                <p className="text-sm text-subtle mt-1">
                  {sections[activeTab].description}
                </p>
              </div>
              {sections[activeTab].href !== "#" && (
                <Link
                  href={sections[activeTab].href}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-heading bg-overlay-4 hover:bg-overlay-6 border border-glass-border rounded-xl transition-colors"
                >
                  Открыть раздел
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections[activeTab].items.map((item, j) => (
                <div
                  key={j}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-overlay-4 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/40 shrink-0" />
                  <span className="text-sm text-body group-hover:text-heading transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {sections[activeTab].href !== "#" && (
              <Link
                href={sections[activeTab].href}
                className="sm:hidden inline-flex items-center gap-1.5 mt-4 px-4 py-2 text-sm font-medium text-heading bg-overlay-4 hover:bg-overlay-6 border border-glass-border rounded-xl transition-colors"
              >
                Открыть раздел
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Contact block */}
          <div className="relative rounded-2xl overflow-x-clip bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#8B5CF6]/[0.04] border border-[#3B82F6]/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8B5CF6]/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-end">
              {/* Photo desktop — выступает вверх */}
              <div className="hidden sm:block shrink-0 w-52 self-stretch relative">
                <img
                  src="/Portrett av smilende mann i skjorte 2.png"
                  alt="Агеев Дмитрий"
                  className="absolute bottom-0 left-4 w-48 drop-shadow-lg"
                />
              </div>
              {/* Info */}
              <div className="pt-8 px-8 pb-0 sm:py-10 sm:px-6 sm:pl-4">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] mb-2">
                  Ваш персональный менеджер
                </p>
                <p className="font-heading font-semibold text-heading text-xl">
                  Агеев Дмитрий
                </p>
                <p className="text-subtle text-sm mt-1 mb-5">
                  Руководитель отдела продаж — ответит на любые вопросы по платформе
                </p>
                <div className="flex flex-col md:flex-row gap-3 sm:pb-0 pb-6">
                  <a
                    href="mailto:ageev@b2bmotion.ru"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6]/[0.08] hover:bg-[#3B82F6]/[0.14] border border-[#3B82F6]/10 text-sm text-heading transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    ageev@b2bmotion.ru
                  </a>
                  <a
                    href="tel:+74993503436"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6]/[0.08] hover:bg-[#3B82F6]/[0.14] border border-[#3B82F6]/10 text-sm text-heading transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    +7 (499) 35-0-34-36
                  </a>
                </div>
              </div>
              {/* Photo mobile — под контентом, обрезается снизу */}
              <div className="sm:hidden relative w-full h-36 overflow-hidden">
                <img
                  src="/Portrett av smilende mann i skjorte 2.png"
                  alt="Агеев Дмитрий"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 drop-shadow-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
