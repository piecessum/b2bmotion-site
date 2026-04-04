"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {
  MessageCircle,
  ShoppingCart,
  Search,
  BarChart3,
  FolderOpen,
  Send,
  Bell,
  Warehouse,
  TrendingUp,
  CreditCard,
  ClipboardList,
  ArrowRight,
  Check,
} from "lucide-react"

const botFeatures = [
  {
    icon: MessageCircle,
    title: "Ответы на вопросы",
    desc: "Цены, сроки, наличие — бот отвечает за секунды. Сложные вопросы передаёт оператору.",
  },
  {
    icon: ShoppingCart,
    title: "Продажа товаров",
    desc: "Подбор по характеристикам, оформление заказа и оплата — прямо в Telegram.",
  },
  {
    icon: Search,
    title: "Поиск информации",
    desc: "Поиск по базе данных, каталогам и документам. Понимает запросы на естественном языке.",
  },
  {
    icon: BarChart3,
    title: "Сбор статистики",
    desc: "Отчёты по клиентам, заказам и продажам. Данные для решений — без ручной обработки.",
  },
  {
    icon: FolderOpen,
    title: "Хранение файлов",
    desc: "Загрузка, отправка и хранение документов, фото и видео в одном месте.",
  },
  {
    icon: Send,
    title: "Рассылка сообщений",
    desc: "Новости, акции, уведомления о скидках — адресно и в нужное время.",
  },
]

const b2bTasks = [
  {
    icon: Bell,
    title: "Оповещения о заказах",
    desc: "Статус, доставка, действия клиентов — все уведомления в одном чате. Ничего не теряется.",
  },
  {
    icon: Warehouse,
    title: "Складской учёт",
    desc: "Трекинг поставок, инвентаризация и обновление остатков в реальном времени.",
  },
  {
    icon: TrendingUp,
    title: "Анализ закупок",
    desc: "Автозаказ при снижении запасов, сравнение цен поставщиков, прогноз на основе продаж.",
  },
  {
    icon: CreditCard,
    title: "Финансовые операции",
    desc: "Выставление счетов, контроль задолженностей и кредитных лимитов, отслеживание платежей.",
  },
  {
    icon: ClipboardList,
    title: "Управление продажами",
    desc: "Аналитика, клиентские запросы, формирование документов и прогноз продаж — в одном боте.",
  },
]

const steps = [
  {
    num: "01",
    title: "Исследование",
    desc: "Определим бизнес-цели и потребности целевой аудитории",
  },
  {
    num: "02",
    title: "Проектирование",
    desc: "Разработаем техзадание, создадим прототип и подготовим дизайн",
  },
  {
    num: "03",
    title: "Разработка",
    desc: "Создадим функционал, обучим бота, протестируем и оптимизируем перед запуском",
  },
]

const helpItems = [
  "Снизить расходы на обслуживание",
  "Сократить время обработки заказов",
  "Ускорить рабочие процессы",
  "Минимизировать ошибки",
  "Улучшить взаимодействие с клиентами",
]

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        }),
      { threshold: 0.1 }
    )
    ref.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

export default function ChatbotsPage() {
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen bg-page-alt noise-overlay"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-violet-400 bg-violet-400/10 rounded-full">
              Чат-боты
            </span>
            <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              <span className="text-heading">Умный бот-ассистент</span>
              <br />
              <span className="gradient-text">
                автоматизирует оптовый бизнес
              </span>
            </h1>
            <p className="reveal text-lg text-body mb-8 max-w-lg">
              Персональный Telegram-бот для B2B: обработка заказов, складской
              учёт, аналитика и коммуникация с клиентами
            </p>
            <a
              href="#cta"
              className="reveal inline-flex px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Оставить заявку
            </a>
          </div>
          <div className="reveal">
            <div className="bg-surface rounded-2xl border border-border-default p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-violet-500/30" />
                <span className="text-xs text-subtle">Telegram Bot</span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="p-3 bg-page-alt rounded-xl rounded-tl-sm flex-1">
                    <p className="text-sm text-body">
                      Новый заказ #4712 от «СтройОпт»
                    </p>
                    <p className="text-xs text-subtle mt-1">
                      15 позиций · 847 200 ₽
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="p-3 bg-[#3B82F6]/10 rounded-xl rounded-tr-sm">
                    <p className="text-sm text-body">Подтвердить заказ</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="p-3 bg-page-alt rounded-xl rounded-tl-sm flex-1">
                    <p className="text-sm text-body">
                      ✓ Заказ #4712 подтверждён
                    </p>
                    <p className="text-xs text-subtle mt-1">
                      Счёт отправлен клиенту
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 border-t border-surface-hover">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading mb-4">
              Персональный чат-бот в Telegram
            </h2>
            <p className="reveal text-body max-w-2xl mx-auto mb-10">
              Чат-боты для бизнеса уже используют 300 миллионов человек
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <p className="reveal font-heading font-semibold text-xl text-heading mb-6 text-center">
              Чат-боты помогают:
            </p>
            <div className="space-y-3">
              {helpItems.map((item, i) => (
                <div
                  key={i}
                  className="reveal flex items-center gap-3 p-4 bg-surface-hover rounded-xl border border-border-default"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bot features */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Что умеют чат-боты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {botFeatures.map((f, i) => (
              <div
                key={i}
                className="reveal p-8 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-violet-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-heading">
                    {f.title}
                  </h3>
                </div>
                <p className="text-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B tasks */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Какие B2B-задачи можно передать боту
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {b2bTasks.map((t, i) => (
              <div
                key={i}
                className="reveal flex gap-4 p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-heading mb-1">
                    {t.title}
                  </h3>
                  <p className="text-sm text-body">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto reveal">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 p-10 md:p-14">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.08] pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-[clamp(24px,4vw,36px)] tracking-[-0.02em] text-heading mb-4">
                Уведомления о заказах через бота
              </h3>
              <p className="text-body max-w-lg mb-8 leading-relaxed">
                Мгновенные сообщения о действиях клиентов — под рукой
                в Telegram-аккаунте менеджера
              </p>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                Узнать подробности
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading text-center mb-16">
            Этапы разработки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div
                key={i}
                className="reveal p-8 bg-surface-hover rounded-2xl border border-border-default"
              >
                <span className="font-heading font-bold text-4xl gradient-text mb-4 block">
                  {s.num}
                </span>
                <h3 className="font-heading font-semibold text-xl text-heading mb-2">
                  {s.title}
                </h3>
                <p className="text-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA custom */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="aurora-orb w-[700px] h-[400px] bg-gradient-to-r from-violet-500/12 via-[#8B5CF6]/10 to-[#3B82F6]/12 blur-[140px] opacity-40 dark:opacity-100"
            style={{ animationDuration: "15s" }}
          />
        </div>
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="reveal font-heading font-bold text-[clamp(36px,6vw,56px)] tracking-[-0.02em] text-heading mb-6">
            Подключите <span className="gradient-text-animated">умного ассистента</span>{" "}
            для своего бизнеса
          </h2>
          <p className="reveal text-lg text-subtle mb-10 max-w-xl mx-auto leading-relaxed">
            Поможем создать персонального помощника, который возьмёт ваши задачи
            на себя
          </p>
          <div className="reveal mb-12">
            <a
              href="mailto:hello@b2b-dvizhenie.ru"
              className="shimmer-btn inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-lg font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 hover:brightness-110"
            >
              Запросить консультацию
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dim">
            <a
              href="tel:+74993503436"
              className="hover:text-body transition-colors duration-300"
            >
              +7 (499) 350-34-36
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border-subtle" />
            <a
              href="mailto:ageev@b2bmotion.ru"
              className="hover:text-body transition-colors duration-300"
            >
              ageev@b2bmotion.ru
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
