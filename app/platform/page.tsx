"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { CtaButton } from "@/components/cta-button";
import { TechStackSections } from "../tech-stack/tech-stack-client";
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
} from "lucide-react";
import Image from "next/image";

/* ── Functional sections (flat, in display order) ── */

type FuncSection = {
  id: string;
  navLabel: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  image: string;
  color: string;
  features: string[];
};

const productsColor = "#3B82F6";
const cabinetColor = "#8B5CF6";
const marketingColor = "#06B6D4";

const functionalSections: FuncSection[] = [
  {
    id: "data-product",
    navLabel: "Данные о товаре",
    icon: FileText,
    title: "Данные о товаре",
    image: "ui-screenshots/product.png",
    color: productsColor,
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
    id: "catalog",
    navLabel: "Каталог и поиск",
    icon: Search,
    title: "Каталог и поиск",
    image: "ui-screenshots/catalog-searc.png",
    color: productsColor,
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
    id: "pricing",
    navLabel: "Ценообразование",
    icon: DollarSign,
    title: "Ценообразование",
    image: "ui-screenshots/pricing.png",
    color: productsColor,
    features: [
      "Тарифы — настраиваемые типы цен + настройка базового тарифа для новых пользователей",
      "Сегментирование компаний-контрагентов и настройка индивидуальных скидок",
      "Скидки на конкретный товар с ограниченным сроком действия",
      "Скидки от объёма корзины + напоминание, сколько ещё добавить, чтобы применилась скидка",
      "Отображение цены в зависимости от региона покупателя",
    ],
  },
  {
    id: "orders",
    navLabel: "Заказы",
    icon: ShoppingCart,
    title: "Заказы",
    image: "ui-screenshots/orders.png",
    color: productsColor,
    features: [
      "Бесшовная передача заказов клиентов сразу в 1С или другую ERP-систему без дополнительной обработки менеджером",
      "Отслеживание текущего состояния заказа клиентом — статуса заказа и отдельных позиций внутри заказа",
      "Создание покупателем предзаказов на будущее из своих рабочих спецификаций и возможность поделиться ими",
      "Возможность покупателя повторить заказ из своего регулярного ассортимента",
      "Раздельное оформление заказов от нескольких продавцов",
    ],
  },
  {
    id: "payment",
    navLabel: "Оплата и доставка",
    icon: CreditCard,
    title: "Оплата и доставка",
    image: "ui-screenshots/payment-delivery.png",
    color: productsColor,
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
    id: "documents",
    navLabel: "Документооборот",
    icon: FileCheck2,
    title: "Документооборот",
    image: "ui-screenshots/documents.png",
    color: productsColor,
    features: [
      "Передача документов к заказу из 1С с факсимильными подписью и печатью: счёт, накладная, счёт-фактура",
      "Неоднократное перевыставление счёта, если произошла корректировка заказа",
      "Возможность контрагента запросить акт сверки",
    ],
  },
  {
    id: "personal-offers",
    navLabel: "Персональные предложения",
    icon: Gift,
    title: "Персональные предложения",
    image: "ui-screenshots/personal-offers.png",
    color: cabinetColor,
    features: [
      "Индивидуальные скидки для конкретного клиента",
      "Рекомендованные спецификации от менеджера с предложением лучших условий",
      "Центр уведомлений, чтобы не пропускать выгодные акции",
      "Бонусные программы лояльности",
    ],
  },
  {
    id: "buyer-data",
    navLabel: "Данные о покупателе",
    icon: Building2,
    title: "Данные о компании покупателя",
    image: "ui-screenshots/company-data.png",
    color: cabinetColor,
    features: [
      "Мультикомпании — возможность работать от лица нескольких компаний и переключаться между ними",
      "Отображение кредитного лимита, дебиторской задолженности и дней просрочки",
      "График платежей",
      "Настройка удобного формата уведомлений: E-mail, СМС или всплывающие уведомления на телефон",
      "Контакты персонального менеджера",
    ],
  },
  {
    id: "avg-check",
    navLabel: "Увеличение среднего чека",
    icon: TrendingUp,
    title: "Увеличение среднего чека",
    image: "ui-screenshots/avg-check.png",
    color: marketingColor,
    features: [
      "Предложение комплектов товаров, например, расходников и аксессуаров",
      "Распродажа уценённых товаров — можно указать степень дефектов",
      "Рекомендованные спецификации от менеджера с лучшими условиями и скидками",
    ],
  },
  {
    id: "promotions",
    navLabel: "Акции и предложения",
    icon: Tag,
    title: "Акции и предложения",
    image: "ui-screenshots/promotions.png",
    color: marketingColor,
    features: [
      "Спецпредложения и хиты продаж на главной странице",
      "Маркировка акционных товаров визуальными элементами в каталоге",
      "Указание срока действия акций с таймером",
    ],
  },
  {
    id: "abandoned-carts",
    navLabel: "Работа с брошенными корзинами",
    icon: ShoppingBag,
    title: "Работа с брошенными корзинами",
    image: "ui-screenshots/abandoned-carts.png",
    color: marketingColor,
    features: [
      "Сегментация собранных, но неоформленных корзин по среднему чеку",
      "Отправка уведомлений менеджерам о самых крупных брошенных корзинах клиентов",
    ],
  },
  {
    id: "marketing-promo",
    navLabel: "Продвижение и маркетинг",
    icon: Globe,
    title: "Продвижение и маркетинг",
    image: "ui-screenshots/marketing.png",
    color: marketingColor,
    features: [
      "Настройка главной страницы",
      "Проценка сторонних смет и предложений от конкурентов при загрузке списком или готовым Excel-документом",
      "Возможность выставления КП от лица покупателей их клиентам с наценкой",
      "Поисковое (SEO) продвижение для лучшей индексации",
    ],
  },
  {
    id: "statistics",
    navLabel: "Статистика",
    icon: BarChart3,
    title: "Статистика",
    image: "ui-screenshots/statistics.png",
    color: marketingColor,
    features: [
      "Отчёты продаж по менеджерам и эффективности их работы",
      "Отчёты по заказам, отгрузкам, среднему чеку",
      "Отчёты по новым регистрациям",
      "Статистика «потерянных» клиентов — тех, что раньше покупали, но перестали",
    ],
  },
];

/* ── Sidebar groups ── */

const sidebarGroups = [
  {
    title: "Товары и заказы",
    color: productsColor,
    ids: ["data-product", "catalog", "pricing", "orders", "payment", "documents"],
  },
  {
    title: "Личный кабинет",
    color: cabinetColor,
    ids: ["personal-offers", "buyer-data"],
  },
  {
    title: "Маркетинг и аналитика",
    color: marketingColor,
    ids: ["avg-check", "promotions", "abandoned-carts", "marketing-promo", "statistics"],
  },
];

const sectionById = Object.fromEntries(
  functionalSections.map((s) => [s.id, s]),
);

/* ── Roadmap ── */

const roadmap = [
  {
    status: "done" as const,
    title: "SEO-оптимизация",
    desc: "Качественная индексация поисковыми роботами",
  },
  {
    status: "done" as const,
    title: "Мобильное приложение",
    desc: "iOS и Android, синхронизация с веб",
  },
  {
    status: "wip" as const,
    title: "Новый дизайн V3",
    desc: "Обновление интерфейса по стандартам UX/UI",
  },
  {
    status: "planned" as const,
    title: "ИИ-рекомендации",
    desc: "Прогноз продаж, умные рекомендации",
  },
  {
    status: "planned" as const,
    title: "Офлайн-режим",
    desc: "Работа без интернета",
  },
  {
    status: "planned" as const,
    title: "Обучение пользователей",
    desc: "Интерактивные подсказки в интерфейсе",
  },
];

/* ── ts-reveal observer (covers tech-stack view too) ── */

function useReveal(ref: React.RefObject<HTMLElement | null>, dep: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ts-reveal-in");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    ref.current
      ?.querySelectorAll(".ts-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, dep]);
}

/* ── View switcher pill ── */

function ViewSwitcher({
  view,
  onChange,
}: {
  view: "functional" | "tech";
  onChange: (v: "functional" | "tech") => void;
}) {
  const items: { id: "functional" | "tech"; label: string }[] = [
    { id: "functional", label: "Функционал" },
    { id: "tech", label: "Технологический стек" },
  ];
  return (
    <div className="inline-flex p-1 rounded-full bg-overlay-4 border border-glass-border backdrop-blur-md shadow-sm gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`px-5 sm:px-6 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 ${
            view === item.id
              ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)]"
              : "text-dim hover:text-body"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ── Functional view ── */

function FunctionalView({ switcher }: { switcher: React.ReactNode }) {
  const [activeId, setActiveId] = useState(functionalSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    functionalSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-14 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/backgrounds/3d_white_bg.png"
            alt=""
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/backgrounds/3d_bg.png"
            alt=""
            className="w-full h-full object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-white/30 dark:bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--page)] to-transparent" />
        </div>

        <div className="relative z-10 flex justify-center mb-10">{switcher}</div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">
            Платформа
          </span>
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-[-0.03em] mb-4">
            <span className="text-heading">Всё для автоматизации</span>
            <br />
            <span className="gradient-text">оптовых продаж</span>
          </h1>
          <p className="text-base text-black dark:text-white max-w-xl mx-auto mb-8">
            Управление каталогом, заказами, ценами и клиентами — в одном решении
            с интеграцией в вашу 1С
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CtaButton className="px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">
              Запросить демо
            </CtaButton>
            <a
              href="/#pricing"
              className="px-7 py-3.5 border-2 border-heading/30 text-heading font-semibold rounded-full hover:bg-overlay-4 transition-all duration-300"
            >
              Смотреть цены
            </a>
          </div>
        </div>
      </section>

      {/* Sidebar + content */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-28 self-start">
            <nav className="space-y-6 rounded-2xl bg-surface border border-border-default p-5">
              {sidebarGroups.map((group) => (
                <div key={group.title}>
                  <div
                    className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
                    style={{ color: group.color }}
                  >
                    {group.title}
                  </div>
                  <ul className="space-y-1">
                    {group.ids.map((id) => {
                      const isActive = activeId === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className={`block pl-3 py-1.5 text-sm rounded-md border-l-2 transition-all duration-200 ${
                              isActive
                                ? "text-heading font-medium bg-overlay-4"
                                : "text-dim hover:text-body border-transparent"
                            }`}
                            style={
                              isActive
                                ? { borderColor: group.color }
                                : undefined
                            }
                          >
                            {sectionById[id].navLabel}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-20">
            {(() => {
              let globalIdx = -1;
              return sidebarGroups.map((group) => (
                <div key={group.title}>
                  {/* Group heading */}
                  <div className="mb-10 pb-5 border-b border-border-default flex items-center gap-3">
                    <span
                      className="w-1.5 h-9 rounded-full shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    <h2 className="font-heading font-bold text-[clamp(26px,4vw,40px)] tracking-[-0.02em] text-heading">
                      {group.title}
                    </h2>
                  </div>

                  <div className="space-y-16">
                    {group.ids.map((id) => {
                      globalIdx++;
                      const idx = globalIdx;
                      const section = sectionById[id];
                      const Icon = section.icon;
                      const reversed = idx % 2 !== 0;
                      return (
                        <div
                          key={section.id}
                          id={section.id}
                          className="scroll-mt-28"
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${section.color}15` }}
                            >
                              <Icon
                                className="w-5 h-5"
                                style={{ color: section.color }}
                              />
                            </div>
                            <h3 className="font-heading font-bold text-[clamp(20px,2.6vw,26px)] tracking-[-0.02em] text-heading">
                              {section.title}
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div className={reversed ? "lg:order-2" : ""}>
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

                            <ul
                              className={`space-y-3 ${reversed ? "lg:order-1" : ""}`}
                            >
                              {section.features.map((feature, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                                  <span className="text-sm text-body leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Roadmap — full width */}
      <section id="roadmap" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h2 className="font-heading font-bold text-[clamp(32px,5vw,44px)] tracking-[-0.02em] text-heading">
              Дорожная карта <span className="gradient-text">развития</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.map((item, i) => (
              <div
                key={i}
                className="p-6 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500"
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
                  {item.status === "done"
                    ? "Готово"
                    : item.status === "wip"
                      ? "В работе"
                      : "В планах"}
                </span>
                <h3 className="font-heading font-semibold text-lg text-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Inner component ── */

function PlatformPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewFromUrl = searchParams.get("view");
  const [view, setView] = useState<"functional" | "tech">(
    viewFromUrl === "tech" ? "tech" : "functional",
  );
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef, view);

  useEffect(() => {
    router.replace(`?view=${view}`, { scroll: false });
  }, [view, router]);

  const switcher = <ViewSwitcher view={view} onChange={setView} />;

  return (
    <main
      ref={mainRef}
      className={`relative min-h-screen noise-overlay overflow-x-clip ${
        view === "tech" ? "bg-page-alt" : "bg-page"
      }`}
    >
      <Navbar />

      {view === "tech" ? (
        <TechStackSections switcher={switcher} />
      ) : (
        <FunctionalView switcher={switcher} />
      )}

      <CTASection />
      <Footer />
    </main>
  );
}

/* ── Default export with Suspense ── */

export default function PlatformPage() {
  return (
    <Suspense fallback={null}>
      <PlatformPageInner />
    </Suspense>
  );
}
