"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {
  FileText,
  Search,
  DollarSign,
  ShoppingCart,
  CreditCard,
  FileCheck2,
  Gift,
  Building2,
  TrendingUp,
  Tag,
  ShoppingBag,
  Globe,
  BarChart3,
  Check,
  Map,
} from "lucide-react"
import Image from "next/image"

/* ── Data: Товары и заказы ── */

const productsSections = [
  {
    icon: FileText,
    title: "Данные о товаре",
    image: "product.png",
    features: [
      "Заполнение описания, свойств, бренда, серии, артикулов и штрихкодов к товару",
      "Галерея фото, видео, сертификатов, гарантий и других необходимых документов",
      "Передача остатков по складам и сроков доставки будущих поставок",
      "Передача нескольких типов цен/тарифов к товару",
      "Пересчёт цены товара в разных единицах измерения",
      "Учёт кратности и минимально допустимой партии товара",
      "Передача весогабаритных характеристик товара, тары и упаковки",
      "Возможность листать карточки товара как журнал",
      "Настраиваемая цветовая палитра к товарам",
      "MDM-система для массового управления данными",
    ],
  },
  {
    icon: Search,
    title: "Каталог и поиск",
    image: "catalog-searc.png",
    features: [
      "Распределение товаров по дереву каталога компании",
      "Интеллектуальный поиск по любым совпадениям: код товара, название, свойства и т.п.",
      "Подбор товаров по параметрам с помощью удобных фильтров",
      "Актуальная информация о товарах в режиме реального времени: наличие по складам, индивидуальная цена",
      "Автоматический подбор аналогов и связанных товаров",
      "Быстрые кнопки на добавление товара в корзину/спецификацию без открытия лишних окон",
    ],
  },
  {
    icon: DollarSign,
    title: "Ценообразование",
    image: "pricing.png",
    features: [
      "Тарифы — настраиваемые типы цен + настройка базового тарифа для новых пользователей",
      "Сегментирование компаний-контрагентов и настройка индивидуальных скидок",
      "Скидки на конкретный товар с ограниченным сроком действия",
      "Скидки от объёма корзины + напоминание, сколько ещё добавить, чтобы применилась скидка",
      "Отображение цены в зависимости от региона покупателя",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Заказы",
    image: "orders.png",
    features: [
      "Бесшовная передача заказов клиентов сразу в 1С или другую ERP-систему без дополнительной обработки менеджером",
      "Отслеживание текущего состояния заказа клиентом — статуса заказа и отдельных позиций внутри заказа",
      "Создание покупателем предзаказов на будущее из своих рабочих спецификаций и возможность поделиться ими",
      "Возможность покупателя повторить заказ из своего регулярного ассортимента",
      "Раздельное оформление заказов от нескольких продавцов",
    ],
  },
  {
    icon: CreditCard,
    title: "Оплата и доставка",
    image: "payment-delivery.png",
    features: [
      "Оплата через выставление счёта контрагенту",
      "Эквайринг — оплата картой",
      "Оплата через платёжные сервисы",
      "Оплата по QR-коду",
      "Доставка до адреса покупателя с расчётом в зависимости от зон доставки",
      "Самовывоз + выбор точек самовывоза",
    ],
  },
  {
    icon: FileCheck2,
    title: "Документооборот",
    image: "documents.png",
    features: [
      "Передача документов к заказу из 1С с факсимильными подписью и печатью: счёт, накладная, счёт-фактура",
      "Неоднократное перевыставление счёта, если произошла корректировка заказа",
      "Возможность контрагента запросить акт сверки",
    ],
  },
]

/* ── Data: Личный кабинет ── */

const cabinetSections = [
  {
    icon: Gift,
    title: "Персональные предложения",
    image: "personal-offers.png",
    features: [
      "Индивидуальные скидки для конкретного клиента",
      "Рекомендованные спецификации от менеджера с предложением лучших условий",
      "Центр уведомлений, чтобы не пропускать выгодные акции",
      "Бонусные программы лояльности",
    ],
  },
  {
    icon: Building2,
    title: "Данные о компании покупателя",
    image: "company-data.png",
    features: [
      "Мультикомпании — возможность работать от лица нескольких компаний и переключаться между ними",
      "Отображение кредитного лимита, дебиторской задолженности и дней просрочки",
      "График платежей",
      "Настройка удобного формата уведомлений: E-mail, СМС или всплывающие уведомления на телефон",
      "Контакты персонального менеджера",
    ],
  },
]

/* ── Data: Маркетинг и аналитика ── */

const marketingSections = [
  {
    icon: TrendingUp,
    title: "Увеличение среднего чека",
    image: "avg-check.png",
    features: [
      "Предложение комплектов товаров, например, расходников и аксессуаров",
      "Распродажа уценённых товаров — можно указать степень дефектов",
      "Рекомендованные спецификации от менеджера с лучшими условиями и скидками",
    ],
  },
  {
    icon: Tag,
    title: "Акции и предложения",
    image: "promotions.png",
    features: [
      "Спецпредложения и хиты продаж на главной странице",
      "Маркировка акционных товаров визуальными элементами в каталоге",
      "Указание срока действия акций с таймером",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Работа с брошенными корзинами",
    image: "abandoned-carts.png",
    features: [
      "Сегментация собранных, но неоформленных корзин по среднему чеку",
      "Отправка уведомлений менеджерам о самых крупных брошенных корзинах клиентов",
    ],
  },
  {
    icon: Globe,
    title: "Продвижение и маркетинг",
    image: "marketing.png",
    features: [
      "Настройка главной страницы",
      "Проценка сторонних смет и предложений от конкурентов при загрузке списком или готовым Excel-документом",
      "Возможность выставления КП от лица покупателей их клиентам с наценкой",
      "Поисковое (SEO) продвижение для лучшей индексации",
    ],
  },
  {
    icon: BarChart3,
    title: "Статистика",
    image: "statistics.png",
    features: [
      "Отчёты продаж по менеджерам и эффективности их работы",
      "Отчёты по заказам, отгрузкам, среднему чеку",
      "Отчёты по новым регистрациям",
      "Статистика «потерянных» клиентов — тех, что раньше покупали, но перестали",
    ],
  },
]

/* ── Tabs config ── */

const tabs = [
  { id: "products", title: "Товары и заказы", sections: productsSections, color: "#3B82F6" },
  { id: "cabinet", title: "Личный кабинет", sections: cabinetSections, color: "#8B5CF6" },
  { id: "marketing", title: "Маркетинг и аналитика", sections: marketingSections, color: "#06B6D4" },
]

/* ── Roadmap ── */

const roadmap = [
  { status: "done" as const, title: "SEO-оптимизация", desc: "Качественная индексация поисковыми роботами" },
  { status: "done" as const, title: "Мобильное приложение", desc: "iOS и Android, синхронизация с веб" },
  { status: "wip" as const, title: "Новый дизайн V3", desc: "Обновление интерфейса по стандартам UX/UI" },
  { status: "planned" as const, title: "ИИ-рекомендации", desc: "Прогноз продаж, умные рекомендации" },
  { status: "planned" as const, title: "Офлайн-режим", desc: "Работа без интернета" },
  { status: "planned" as const, title: "Обучение пользователей", desc: "Интерактивные подсказки в интерфейсе" },
]

/* ── Helpers ── */

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

/* ── Inner component ── */

function PlatformPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const initialTab = tabFromUrl === "products" ? 0 : tabFromUrl === "cabinet" ? 1 : tabFromUrl === "marketing" ? 2 : 0

  const [activeTab, setActiveTab] = useState(initialTab)
  const mainRef = useRef<HTMLElement>(null)
  useReveal(mainRef)

  useEffect(() => {
    const tabMap = ["products", "cabinet", "marketing"]
    router.replace(`?tab=${tabMap[activeTab]}`, { scroll: false })
  }, [activeTab, router])

  const currentTab = tabs[activeTab]

  return (
    <main ref={mainRef} className="relative min-h-screen bg-page noise-overlay overflow-x-hidden">
      <Navbar />

      {/* Hero — compact */}
      <section className="relative pt-36 pb-14 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/3d_white_bg.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/3d_bg.png"
            alt=""
            className="w-full h-full object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-white/30 dark:bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--page)] to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">
            Платформа
          </span>
          <h1 className="reveal font-heading font-bold text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-[-0.03em] mb-4">
            <span className="text-heading">Всё для автоматизации</span>
            <br />
            <span className="gradient-text">оптовых продаж</span>
          </h1>
          <p className="reveal text-base text-heading/80 max-w-xl mx-auto mb-8">
            Управление каталогом, заказами, ценами и клиентами — в одном решении с интеграцией в вашу 1С
          </p>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#cta"
              className="px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Запросить демо
            </a>
            <a
              href="/#pricing"
              className="px-7 py-3.5 border-2 border-heading/30 text-heading font-semibold rounded-full hover:bg-overlay-4 transition-all duration-300"
            >
              Смотреть цены
            </a>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-6">
        <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <div className="flex justify-center px-6 min-w-min">
            <nav className="inline-flex p-1 rounded-xl bg-overlay-4 border border-glass-border gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={`
                    px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all
                    ${
                      activeTab === i
                        ? "bg-white text-heading shadow-sm border border-black/10 dark:bg-white/[0.10] dark:border-white/[0.15]"
                        : "text-dim hover:text-body border border-transparent"
                    }
                  `}
                >
                  {tab.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Tab content — sections */}
      {currentTab.sections.map((section, idx) => {
        const Icon = section.icon
        const reversed = idx % 2 !== 0
        const color = currentTab.color

        return (
          <section key={`${currentTab.id}-${section.title}`} className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h2 className="font-heading font-bold text-[clamp(24px,3.5vw,32px)] tracking-[-0.02em] text-heading">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className={`${reversed ? "lg:order-2" : ""}`}>
                  <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/[0.04] via-[#8B5CF6]/[0.03] to-[#06B6D4]/[0.04] border border-border-default">
                    <Image
                      src={`/${section.image}`}
                      alt={section.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain p-4"
                      priority={idx < 2}
                    />
                  </div>
                </div>

                <div className={`space-y-3 ${reversed ? "lg:order-1" : ""}`}>
                  {section.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 rounded-xl bg-surface border border-border-default"
                    >
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-sm text-body leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Roadmap */}
      <section id="roadmap" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h2 className="reveal font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading">
              Дорожная карта развития
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.map((item, i) => (
              <div
                key={i}
                className="reveal p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500"
              >
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    item.status === "done"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : item.status === "wip"
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "bg-dimmest text-subtle"
                  }`}
                >
                  {item.status === "done" ? "Готово" : item.status === "wip" ? "В работе" : "В планах"}
                </span>
                <h3 className="font-heading font-semibold text-lg text-heading mb-2">{item.title}</h3>
                <p className="text-sm text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

/* ── Default export with Suspense ── */

export default function PlatformPage() {
  return (
    <Suspense fallback={null}>
      <PlatformPageInner />
    </Suspense>
  )
}
