import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen } from "lucide-react"

export const metadata = {
  title: "База знаний — B2B Движение",
  description: "Документация, инструкции и руководства по работе с платформой B2B Движение.",
}

const sections = [
  {
    title: "Функционал системы",
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
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">
                  {section.title}
                </h2>
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
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-amber-500/[0.08] to-yellow-500/[0.04] border border-amber-500/10">
            <p className="font-heading font-semibold text-heading mb-4">
              На любые вопросы ответит руководитель отдела продаж Агеев Дмитрий
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="text-subtle">почта:</span>
                <a href="mailto:ageev@b2bmotion.ru" className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors">
                  ageev@b2bmotion.ru
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="text-subtle">телефон:</span>
                <a href="tel:+74993503436" className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors">
                  +7 (499) 35-0-34-36
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
