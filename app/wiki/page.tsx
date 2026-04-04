import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "База знаний — B2B Движение",
  description: "Документация, инструкции и руководства по работе с платформой B2B Движение.",
}

const sections = [
  {
    title: "Функционал системы",
    href: "/wiki/function",
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
    title: "Кастомизация под клиента",
    href: "#",
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
    title: "Технические настройки",
    href: "#",
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
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Документация
            </span>
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] tracking-[-0.02em] text-heading">
              База знаний продукта{" "}
              <span className="gradient-text">«B2B Движение»</span>
            </h1>
            <p className="mt-4 text-lg text-subtle max-w-2xl">
              от компании 3Davinci
            </p>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl glass-card overflow-hidden"
              >
                <Link href={section.href} className="group flex items-center justify-between mb-6">
                  <h2 className="font-heading font-semibold text-xl text-heading group-hover:text-[#60A5FA] transition-colors">
                    {section.title}
                  </h2>
                  {section.href !== "#" && <ArrowRight className="w-4 h-4 text-dim group-hover:text-[#60A5FA] transition-colors" />}
                </Link>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/50 mt-2 shrink-0" />
                      <span className="text-sm text-body hover:text-heading transition-colors cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-amber-500/[0.12] to-orange-400/[0.06] border border-amber-500/15 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8">
              {/* Photo */}
              <div className="shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-amber-500/20 shadow-lg">
                  <img
                    src="/Portrett av smilende mann i skjorte 2.png"
                    alt="Агеев Дмитрий"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Info */}
              <div className="text-center sm:text-left">
                <p className="font-heading font-semibold text-heading text-lg">
                  Агеев Дмитрий
                </p>
                <p className="text-subtle text-sm mt-1 mb-4">
                  Руководитель отдела продаж — ответит на любые вопросы
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:ageev@b2bmotion.ru"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-sm text-heading transition-colors"
                  >
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    ageev@b2bmotion.ru
                  </a>
                  <a
                    href="tel:+74993503436"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-sm text-heading transition-colors"
                  >
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +7 (499) 35-0-34-36
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
