import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";
import {
  ArrowRight,
  Database,
  Cable,
  KeyRound,
  Mail,
  Layers,
  CreditCard,
  Boxes,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Интеграции — B2B Движение",
  description:
    "Интеграция B2B Движения с 1С (УТ, КА, УПП), ERP-системами, БД РАЭК для электротехники, API для клиентов, UniSender и платежами. Полный список синхронизируемых данных и этапы внедрения.",
};

const integrationCategories = [
  {
    icon: Database,
    title: "1С и ERP-системы",
    badge: "Основная интеграция",
    desc: "Стандартная обработка обмена для конфигураций 1С: УТ (Управление торговлей), КА (Комплексная автоматизация), УПП (Управление производственным предприятием). Для других конфигураций обработка дорабатывается под вас.",
    items: [
      "Каталог, бренды, разделы",
      "Цены и индивидуальные цены по контрагентам",
      "Остатки по складам",
      "Контрагенты, адреса, ИНН",
      "Заказы и статусы",
      "Документы реализации",
    ],
    wikiHref: "/wiki/tech/integratsiya-s-1s-ili-dr-erp-sistemami",
    wikiLabel: "Подробно про обмен с 1С",
  },
  {
    icon: Layers,
    title: "БД РАЭК для электротехники",
    badge: "Отраслевое",
    desc: "Подключение карточек товаров в международном стандарте ETIM. Полезно дистрибьюторам и производителям электротехники: готовые описания, свойства и параметры из общеотраслевой базы.",
    items: [
      "Свойства и классы ETIM",
      "Сертификаты и инструкции",
      "Изображения и галереи",
      "Коды Русский свет / ЭТМ",
      "Маркетинговые серии и синонимы",
      "Остатки у производителей",
    ],
    wikiHref:
      "/wiki/tech/integratsiya-s-raek-dlya-elektrotekhnicheskikh-kompaniy",
    wikiLabel: "Подробно про РАЭК и ETIM",
  },
  {
    icon: KeyRound,
    title: "API для ваших клиентов",
    badge: "B2B-2-B2B",
    desc: "Крупные покупатели могут забирать ваш каталог и оформлять заказы напрямую из своих систем — интернет-магазина или 1С. Уникальный API-ключ, открытая документация, поддержка от нашей команды.",
    items: [
      "Интеграция с интернет-магазином клиента",
      "Интеграция с 1С клиента",
      "REST API на чтение и запись",
      "Уникальный токен на пользователя",
      "Открытая документация",
      "Консультация программистов клиента",
    ],
    wikiHref:
      "/wiki/tech/podklyuchenie-po-api-dostup-k-b2b-sisteme-dlya-vashikh-klientov",
    wikiLabel: "Документация API и сценарии",
  },
  {
    icon: Mail,
    title: "Email-маркетинг — UniSender",
    badge: "Маркетинг",
    desc: "Автоматические рассылки по этапам вовлечения покупателя: триггеры на регистрацию, брошенную корзину, отказников, лояльных клиентов. Списки контактов и корзины передаются в UniSender автоматически.",
    items: [
      "Сегментация по этапу вовлечения",
      "Передача корзин и заказов",
      "Триггерные рассылки",
      "Готовые шаблоны от нас",
      "Сортировка по менеджеру и сумме",
    ],
    wikiHref: "/wiki/function/integratsiya-s-unisender",
    wikiLabel: "Настройка модуля рассылок",
  },
  {
    icon: CreditCard,
    title: "Платежи и эквайринг",
    badge: "Финансы",
    desc: "Онлайн-оплата заказов картой через эквайринг. Выгрузка бухгалтерских и юридических документов клиентам прямо в личный кабинет.",
    items: [
      "Онлайн-оплата картой",
      "Счета и счета-фактуры",
      "Графики платежей из 1С",
      "Бухгалтерские документы",
    ],
    wikiHref: "/wiki/custom/onlayn-oplata-kartoy",
    wikiLabel: "Как настроена онлайн-оплата",
  },
  {
    icon: Boxes,
    title: "Опциональные системы",
    badge: "По запросу",
    desc: "Помимо ERP, мы умеем интегрироваться с другими системами заказчика: CRM, PIM, MDM. Состав и формат обмена обсуждается индивидуально.",
    items: [
      "CRM-системы",
      "PIM (управление товарной информацией)",
      "MDM (мастер-данные) — у нас своя продуктовая команда",
      "Маркетплейсы и фиды",
    ],
    wikiHref: "/wiki/tech",
    wikiLabel: "Все технические материалы",
  },
];

const exchangeData = [
  {
    title: "Каталог",
    items: ["Дерево разделов", "Номенклатура с реквизитами", "Бренды и производители", "Доп. свойства и характеристики"],
  },
  {
    title: "Цены и склады",
    items: ["Типы цен", "Цены по типам", "Индивидуальные цены по контрагентам", "Скидки на номенклатуру", "Остатки по складам"],
  },
  {
    title: "Контрагенты",
    items: ["Юр/физ лица и ИНН", "Адреса", "Задолженность и просрочка", "Графики платежей по реализациям"],
  },
  {
    title: "Заказы и документы",
    items: ["Загрузка заказов в 1С", "Статусы заказов из 1С", "Реализации и счета-фактуры", "Печатные формы документов"],
  },
];

const stages = [
  {
    step: "01",
    title: "Подготовка инфраструктуры",
    desc: "Настройка домена, почтового сервера, регистрация в SMSC.ru, развёртывание B2B-системы.",
  },
  {
    step: "02",
    title: "Подключение 1С",
    desc: "Установка обработки обмена в 1С, настройка регламента обменов, первичная выгрузка каталога, цен, остатков.",
  },
  {
    step: "03",
    title: "Настройка платформы",
    desc: "Регионы, склады, компании и их типы цен, индивидуальные скидки, статусы заказов, шаблоны документов, уровни доступа.",
  },
  {
    step: "04",
    title: "Брендирование и контент",
    desc: "Логотип, стили, страница регистрации/авторизации, каталог (фильтры, синонимы, поиск), уведомления SMS и e-mail.",
  },
  {
    step: "05",
    title: "Запуск и обучение",
    desc: "Регистрация менеджеров, обучение команды, передача в эксплуатацию, переход к сопровождению.",
  },
];

export default function IntegrationsPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA] mb-5">
              Интеграции
            </span>
            <h1 className="font-heading font-bold text-[clamp(36px,7vw,64px)] leading-[1.05] tracking-[-0.02em] mb-6">
              <span className="text-heading">Платформа </span>
              <span className="gradient-text">в экосистеме</span>
              <br className="hidden sm:block" />
              <span className="text-heading"> вашего бизнеса</span>
            </h1>
            <p className="text-lg sm:text-xl text-subtle max-w-2xl mx-auto leading-relaxed">
              B2B Движение — не изолированный портал. Платформа двусторонне
              синхронизируется с вашей 1С или ERP, отдаёт каталог клиентам по
              API, отправляет триггерные рассылки и принимает онлайн-оплату.
              Большинство интеграций уже готовы из коробки.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-sm font-semibold hover:brightness-110 transition-all"
              >
                Что мы умеем интегрировать
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/wiki/tech"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-overlay-2 border border-glass-border text-sm font-medium text-body hover:text-heading transition-colors"
              >
                Технические материалы в базе знаний
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              С чем интегрируемся
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Шесть направлений интеграций
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Часть из них — обязательная база (1С, платежи), часть подключается
              по запросу (РАЭК, API для клиентов, UniSender). Каждое направление
              ведёт в базу знаний с техническими деталями.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {integrationCategories.map((cat) => (
              <div
                key={cat.title}
                className="p-7 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/25 transition-colors flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center flex-shrink-0">
                    <cat.icon className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-1.5">
                      {cat.badge}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-heading">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-body leading-relaxed mb-5">
                  {cat.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={cat.wikiHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] hover:gap-2 transition-all mt-auto"
                >
                  {cat.wikiLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA EXCHANGE — what gets synced with 1C */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Обмен данными
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Что синхронизируется с 1С
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Полный обмен — двусторонний. 1С остаётся источником правды по
              ценам, остаткам и контрагентам, а B2B-система передаёт обратно
              заказы клиентов и статусы. Регламент обменов настраивается в
              удобное время (полный обмен обычно ночью).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exchangeData.map((g) => (
              <div
                key={g.title}
                className="p-6 rounded-2xl bg-overlay-2 border border-glass-border"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-4">
                  {g.title}
                </div>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-body leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] flex-shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-dim text-center mt-8 max-w-3xl mx-auto leading-relaxed">
            Технические детали — структура шлюзовых таблиц, поля и форматы — в{" "}
            <Link
              href="/wiki/tech/spisok-shlyuzovykh-tablits-sht"
              className="text-[#60A5FA] hover:underline"
            >
              списке шлюзовых таблиц
            </Link>{" "}
            и{" "}
            <Link
              href="/wiki/tech/struktura-bd"
              className="text-[#60A5FA] hover:underline"
            >
              описании структуры БД
            </Link>
            .
          </p>
        </div>
      </section>

      {/* STAGES — implementation timeline */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Этапы внедрения
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              От нуля до запуска — 2–3 месяца
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Полная техническая интеграция и настройка платформы версии
              Enterprise обычно занимает 2–3 месяца. Этапы можно вести
              параллельно, чтобы сократить срок.
            </p>
          </div>

          <ol className="relative border-l border-glass-border ml-3 space-y-8">
            {stages.map((s) => (
              <li key={s.step} className="pl-8 relative">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] ring-4 ring-page" />
                <div className="font-heading font-bold text-2xl text-heading">
                  {s.step}
                </div>
                <div className="font-heading font-semibold text-base text-subheading mt-1">
                  {s.title}
                </div>
                <p className="text-sm text-body leading-relaxed mt-2 max-w-2xl">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link
              href="/wiki/tech/etapy-tekhnicheskoy-integratsii"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] hover:gap-2 transition-all"
            >
              Полный список этапов в базе знаний
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST / FAQ-LITE */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Что важно знать
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Безопасность и сопровождение
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-overlay-2 border border-glass-border">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-heading mb-3">
                Российский хостинг
              </h3>
              <p className="text-sm text-body leading-relaxed">
                Размещение на Selectel или на ваших мощностях (on-premise).
                Хранение данных не выходит за пределы РФ.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-overlay-2 border border-glass-border">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-heading mb-3">
                Логи синхронизации
              </h3>
              <p className="text-sm text-body leading-relaxed">
                В админке доступны логи всех обменов с 1С. Видно расписание,
                статусы и любые ошибки — без помощи разработчика.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-overlay-2 border border-glass-border">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-heading mb-3">
                Команда сопровождает после запуска
              </h3>
              <p className="text-sm text-body leading-relaxed">
                Мы сами разрабатываем платформу и сами её обслуживаем. Средний
                срок работы с клиентом — около 6 лет.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP-DIVE LINKS */}
      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto p-8 rounded-2xl bg-overlay-2 border border-glass-border">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center flex-shrink-0">
              <Cable className="w-6 h-6 text-[#60A5FA]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-1.5">
                Для технического отдела
              </div>
              <h3 className="font-heading font-bold text-xl text-heading">
                Технические материалы
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                href: "/wiki/tech/etapy-tekhnicheskoy-integratsii",
                label: "Этапы технической интеграции",
              },
              {
                href: "/wiki/tech/integratsiya-s-1s-ili-dr-erp-sistemami",
                label: "Интеграция с 1С и ERP",
              },
              {
                href: "/wiki/tech/spisok-shlyuzovykh-tablits-sht",
                label: "Список шлюзовых таблиц",
              },
              {
                href: "/wiki/tech/opisanie-poley-shlyuzovykh-tablits",
                label: "Описание полей шлюзовых таблиц",
              },
              {
                href: "/wiki/tech/struktura-bd",
                label: "Структура базы данных",
              },
              {
                href: "/wiki/tech/podklyuchenie-po-api-dostup-k-b2b-sisteme-dlya-vashikh-klientov",
                label: "Подключение по API",
              },
              {
                href: "/wiki/tech/integratsiya-s-raek-dlya-elektrotekhnicheskikh-kompaniy",
                label: "Интеграция с БД РАЭК",
              },
              {
                href: "/wiki/tech",
                label: "Все технические статьи",
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/30 transition-colors"
              >
                <span className="text-sm text-body group-hover:text-heading transition-colors">
                  {l.label}
                </span>
                <ArrowRight className="w-4 h-4 text-dim group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
