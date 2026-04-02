import { Navbar } from "@/components/navbar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {
  FileText, Search, DollarSign, ShoppingCart, CreditCard, FileCheck2,
  Check, ArrowRight, ArrowLeft, ImageIcon,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Товары и заказы — Функционал B2B Движение",
  description: "Управление товарами, каталогом, ценами, заказами, оплатой и документооборотом в B2B-платформе.",
}

const sections = [
  {
    icon: FileText,
    title: "Данные о товаре",
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
    features: [
      "Передача документов к заказу из 1С с факсимильными подписью и печатью: счёт, накладная, счёт-фактура",
      "Неоднократное перевыставление счёта, если произошла корректировка заказа",
      "Возможность контрагента запросить акт сверки",
    ],
  },
]

const otherPages = [
  { title: "Личный кабинет покупателя", href: "/platform/cabinet", desc: "Персональные условия и управление данными" },
  { title: "Маркетинг и аналитика", href: "/platform/marketing", desc: "Акции, статистика и увеличение продаж" },
]

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Функционал
          </Link>
          <span className="block mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6]">
            01 / Функционал
          </span>
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] text-heading mb-5">
            Товары и <span className="gradient-text">заказы</span>
          </h1>
          <p className="text-lg text-body max-w-2xl">
            Полное управление товарным каталогом, гибкое ценообразование, бесшовная обработка заказов и электронный документооборот — всё в одной системе.
          </p>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon
        const reversed = idx % 2 !== 0

        return (
          <section
            key={section.title}
            className={`py-20 px-6 ${idx % 2 === 0 ? "bg-page" : "bg-page-alt"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <h2 className="font-heading font-bold text-[clamp(24px,3.5vw,32px)] tracking-[-0.02em] text-heading">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Image placeholder */}
                <div className={`${reversed ? "lg:order-2" : ""}`}>
                  <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.04] via-[#8B5CF6]/[0.03] to-[#06B6D4]/[0.04] border border-border-default flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-[#3B82F6]/30" />
                      </div>
                      <span className="text-sm text-dim">Скриншот раздела</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className={`space-y-3 ${reversed ? "lg:order-1" : ""}`}>
                  {section.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 rounded-xl bg-surface border border-border-default"
                    >
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-sm text-body leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Other pages nav */}
      <section className="py-20 px-6 bg-page">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading font-semibold text-lg text-heading mb-6 text-center">
            Другие разделы функционала
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-6 rounded-2xl bg-surface border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500 glow-card"
              >
                <h4 className="font-heading font-semibold text-heading mb-2 group-hover:text-[#3B82F6] transition-colors">
                  {page.title}
                </h4>
                <p className="text-sm text-subtle mb-3">{page.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
