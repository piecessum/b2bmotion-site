import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import { CTASection } from "@/components/cta-section";
import { TeamGlobe } from "@/components/team-globe";
import {
  ArrowRight,
  Building2,
  Code2,
  Database,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata = {
  title: "О компании — B2B Движение",
  description:
    "3DaVinci — продуктовая команда из Воронежа, с 2014 года разрабатывает B2B Движение: платформу для оптовой торговли. 21 специалист, 56+ реализованных проектов.",
};

const heroStats = [
  { value: "10+", label: "лет на рынке" },
  { value: "56+", label: "реализованных проектов" },
  { value: "21", label: "специалист в команде" },
  { value: "~6", label: "лет средний срок работы с клиентом" },
];

const timeline = [
  {
    year: "2014",
    title: "Основана 3DaVinci",
    desc: "Воронежская команда начинает заниматься разработкой ПО для бизнеса.",
  },
  {
    year: "2016",
    title: "Первые внедрения в электротехнике",
    desc: "Дистрибьюторы кабельной и электротехнической продукции получают первые версии будущей B2B-платформы.",
  },
  {
    year: "2019",
    title: "Выступление на «Электро-2019»",
    desc: "Артём Старченко участвует в панельной дискуссии о точках роста электротехнического рынка.",
  },
  {
    year: "2021",
    title: "Запуск мобильного приложения",
    desc: "Покупатели получают полноценный B2B-каталог, корзину и оплату прямо в смартфоне.",
  },
  {
    year: "2024",
    title: "10 лет платформе",
    desc: "B2B Движение работает у клиентов в нескольких отраслях — от FMCG до сетевой инфраструктуры.",
  },
  {
    year: "2026",
    title: "Сегодня",
    desc: "21 специалист, две продуктовые команды (B2B и MDM), распределённый формат работы.",
  },
];

const team = [
  {
    name: "Артём Старченко",
    role: "Основатель и директор",
    note: "Запустил 3DaVinci в 2014. Отвечает за продукт, стратегию и ключевых клиентов.",
    accent: "#3B82F6",
  },
  {
    name: "Илья Долгов",
    role: "Дизайнер, со-основатель",
    note: "С 2014 года формирует визуальный язык продуктов компании. Отвечает за дизайн платформы.",
    accent: "#EF4444",
  },
  {
    name: "Дмитрий Агеев",
    role: "Руководитель продаж",
    note: "Первая точка контакта для новых клиентов. Помогает определить, подходит ли вам B2B Движение.",
    accent: "#7C3AED",
  },
  {
    name: "Катерина Масленникова",
    role: "Руководитель администрации",
    note: "Главный менеджер: контролирует ход внедрений и сопровождение действующих клиентов.",
    accent: "#06B6D4",
  },
  {
    name: "Михаил Фурутин",
    role: "Главный фронтенд-разработчик",
    note: "Отвечает за интерфейс B2B-платформы и мобильного приложения. React, TypeScript, Redux.",
    accent: "#10B981",
  },
  {
    name: "Аслангери Мокаев",
    role: "Главный бэкенд-разработчик",
    note: "Архитектура B2B-системы: PHP 8 / Yii2, MySQL, ElasticSearch, интеграции с 1С и шлюзовыми таблицами.",
    accent: "#F59E0B",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

const teamBreakdown = [
  {
    icon: Code2,
    title: "B2B-платформа",
    count: "11 человек",
    desc: "Разработка, дизайн, тестирование и менеджмент B2B Движения.",
  },
  {
    icon: Database,
    title: "MDM-направление",
    count: "2 человека",
    desc: "Отдельная продуктовая команда систем управления мастер-данными.",
  },
  {
    icon: Users,
    title: "Поддержка и операции",
    count: "8 человек",
    desc: "Продажи, маркетинг, администрация, системная инженерия, редактура.",
  },
];

const techStack = [
  {
    title: "Бэкенд",
    items: ["PHP 8", "Yii2", "MySQL 8", "ElasticSearch", "REST API"],
  },
  {
    title: "Фронтенд",
    items: ["React", "Redux", "TypeScript", "HTML5/CSS3"],
  },
  {
    title: "Инфраструктура",
    items: ["Docker", "Kubernetes", "Ansible", "Terraform", "Selectel (РФ)"],
  },
  {
    title: "Наблюдаемость",
    items: ["Prometheus", "Grafana", "Zabbix", "Alertmanager", "Kibana"],
  },
];

const differentiators = [
  {
    icon: Building2,
    title: "Знаем отрасль",
    desc: "10 лет работаем с дистрибьюторами и оптовиками — электротехника, FMCG, стройматериалы, мебель, сантехника. Не маркетплейс общего профиля.",
  },
  {
    icon: Sparkles,
    title: "Готовое решение, не конструктор",
    desc: "На большую часть задач B2B-сегмента есть out-of-the-box функционал. Кастомизация — последние шаги, не основа.",
  },
  {
    icon: Code2,
    title: "Сами разрабатываем и внедряем",
    desc: "Без подрядчиков. Команда, которая писала код, сопровождает клиента после запуска — иногда годами.",
  },
];

const featuredCases = [
  {
    name: "БазаЭлектро",
    industry: "Электротехника",
    slug: "keis-baza-el",
  },
  {
    name: "Древиз",
    industry: "Мебельные материалы",
    slug: "keis-dreviz",
  },
  {
    name: "Строймикс",
    industry: "Стройматериалы",
    slug: "keis-stroymix",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA] mb-5">
              О компании
            </span>
            <h1 className="font-heading font-bold text-[clamp(36px,7vw,64px)] leading-[1.05] tracking-[-0.02em] mb-6">
              <span className="text-heading">Делаем </span>
              <span className="gradient-text">B2B-платформу</span>
              <br className="hidden sm:block" />
              <span className="text-heading"> с 2014 года</span>
            </h1>
            <p className="text-lg sm:text-xl text-subtle max-w-2xl mx-auto leading-relaxed">
              <strong className="text-heading font-semibold">3DaVinci</strong>{" "}
              — продуктовая команда из Воронежа. Создаём{" "}
              <strong className="text-heading font-semibold">
                B2B Движение
              </strong>
              {" "}— платформу для оптовой торговли электроникой,
              стройматериалами, FMCG и другими отраслями. Работаем с
              производителями и дистрибьюторами, у которых тысячи SKU и сотни
              контрагентов.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-2xl bg-overlay-2 border border-glass-border"
              >
                <div className="font-heading font-bold text-3xl sm:text-4xl text-heading">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs text-dim mt-2 tracking-wide uppercase leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              История
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Двенадцать лет одного продукта
            </h2>
          </div>

          <ol className="relative border-l border-glass-border ml-3 space-y-10">
            {timeline.map((item) => (
              <li key={item.year} className="pl-8 relative">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] ring-4 ring-page" />
                <div className="font-heading font-bold text-2xl text-heading">
                  {item.year}
                </div>
                <div className="font-heading font-semibold text-base text-subheading mt-1">
                  {item.title}
                </div>
                <p className="text-sm text-body leading-relaxed mt-2 max-w-2xl">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT WE DO — 3DaVinci ↔ B2B Motion */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Что мы делаем
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              3DaVinci разрабатывает B2B Движение
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              3DaVinci — материнская компания, B2B Движение — её флагманский
              продукт. Это разные сайты и бренды, но одна команда.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-overlay-2 border border-glass-border">
              <div className="text-[11px] uppercase tracking-[0.18em] text-dim mb-3">
                Компания
              </div>
              <h3 className="font-heading font-bold text-2xl text-heading mb-3">
                3DaVinci
              </h3>
              <p className="text-sm text-body leading-relaxed mb-5">
                Продуктовая компания, разработка ПО (ОКВЭД 62.01). Базируется в
                Воронеже, команда распределённая. Помимо B2B Движения, у нас
                есть отдельное направление MDM — система управления
                мастер-данными.
              </p>
              <a
                href="https://3davinci.ru"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] hover:gap-2 transition-all"
              >
                3davinci.ru <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-8 rounded-2xl bg-overlay-2 border border-glass-border">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-3">
                Продукт
              </div>
              <h3 className="font-heading font-bold text-2xl text-heading mb-3">
                B2B Движение
              </h3>
              <p className="text-sm text-body leading-relaxed mb-5">
                Готовая платформа для оптовых продаж: каталог, корзина, оплата,
                документооборот, интеграция с 1С. Развёртывается у клиента или
                как SaaS, кастомизируется под отраслевую специфику.
              </p>
              <Link
                href="/platform"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] hover:gap-2 transition-all"
              >
                Возможности платформы <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Команда
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              С кем вы будете работать
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Ключевые роли — продажи, разработка, дизайн, управление
              внедрениями. Все эти люди реально работают с клиентами, а не
              только числятся в штате.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((person) => (
              <div
                key={person.name}
                className="flex gap-5 p-6 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/20 transition-colors"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-bold text-xl text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${person.accent}, ${person.accent}99)`,
                  }}
                >
                  {initials(person.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-base text-heading">
                    {person.name}
                  </h3>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#60A5FA] mt-1 mb-2">
                    {person.role}
                  </div>
                  <p className="text-xs text-body leading-relaxed">
                    {person.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="mt-16">
            <h3 className="font-heading font-semibold text-lg text-heading mb-5 text-center">
              Структура команды — 21 человек
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamBreakdown.map((b) => (
                <div
                  key={b.title}
                  className="flex gap-4 p-5 rounded-2xl bg-overlay-2 border border-glass-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm text-heading">
                      {b.title}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-[#60A5FA] mt-0.5 mb-1.5">
                      {b.count}
                    </div>
                    <p className="text-xs text-body leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="text-center mb-10">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
                  География
                </span>
                <h3 className="font-heading font-semibold text-xl text-heading mt-3">
                  Команда распределённая — четыре города, одна работа
                </h3>
                <p className="text-sm text-subtle mt-3 max-w-xl mx-auto">
                  Воронеж — основной офис. Остальные ребята — в Санкт-Петербурге,
                  Бийске и Батуми. Работаем синхронно по будням, разница часовых
                  поясов учитывается в графике созвонов.
                </p>
              </div>
              <TeamGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Технологии
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              На чём всё это работает
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Стек, требования и инфраструктура подробно описаны в{" "}
              <Link
                href="/wiki/tech"
                className="text-[#60A5FA] hover:underline"
              >
                технических сведениях
              </Link>
              . Здесь — сжатый обзор для технического отдела заказчика.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((g) => (
              <div
                key={g.title}
                className="p-6 rounded-2xl bg-overlay-2 border border-glass-border"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-3">
                  {g.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="px-3 py-1 rounded-lg text-xs text-body bg-overlay-3 border border-glass-border"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-dim text-center mt-8 max-w-3xl mx-auto leading-relaxed">
            Хостинг — российский провайдер Selectel. Возможна установка на
            мощностях клиента (on-premise). Полный список интеграций — 1С,
            шлюзовые таблицы, БД РАЭК, экспорт для Яндекс Маркет / Google
            Merchant — в{" "}
            <Link href="/wiki/tech" className="text-[#60A5FA] hover:underline">
              базе знаний
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CLIENTS — logo cloud */}
      <LogoCloud />

      {/* FEATURED CASES */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Кейсы
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Из разных отраслей
            </h2>
            <p className="text-base text-subtle mt-4 max-w-2xl mx-auto">
              Под капотом — одна и та же платформа, но в каждой отрасли своя
              специфика прайсов, доставки и интеграций. Полный список —{" "}
              <Link href="/blog" className="text-[#60A5FA] hover:underline">
                в блоге
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCases.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/${c.slug}`}
                className="group p-6 rounded-2xl bg-overlay-2 border border-glass-border hover:border-[#3B82F6]/30 transition-all"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#60A5FA] mb-3">
                  {c.industry}
                </div>
                <h3 className="font-heading font-bold text-xl text-heading mb-4">
                  {c.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-body group-hover:text-[#60A5FA] group-hover:gap-2 transition-all">
                  Читать кейс <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Почему выбирают нас
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
              Что важно знать перед стартом
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="p-6 rounded-2xl bg-overlay-2 border border-glass-border"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#7C3AED]/15 flex items-center justify-center mb-5">
                  <d.icon className="w-6 h-6 text-[#60A5FA]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-heading mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGAL */}
      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-overlay-2 border border-glass-border">
          <div className="text-[11px] uppercase tracking-[0.18em] text-dim mb-3">
            Юридическое лицо
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <div>
              <div className="text-dim text-xs mb-1">Название</div>
              <div className="text-body">ООО «ТриДаВинчи»</div>
            </div>
            <div>
              <div className="text-dim text-xs mb-1">ИНН</div>
              <div className="text-body">3666150357</div>
            </div>
            <div>
              <div className="text-dim text-xs mb-1">ОКВЭД</div>
              <div className="text-body">62.01 — Разработка ПО</div>
            </div>
            <div>
              <div className="text-dim text-xs mb-1">Адрес</div>
              <div className="text-body">
                Воронеж, ул. 60 Армии, д. 26
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-glass-border flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href="mailto:info@b2bmotion.ru"
              className="text-body hover:text-[#60A5FA] transition-colors"
            >
              info@b2bmotion.ru
            </a>
            <a
              href="tel:+74993503436"
              className="text-body hover:text-[#60A5FA] transition-colors"
            >
              +7 (499) 350-34-36
            </a>
            <Link
              href="/contacts"
              className="text-[#60A5FA] hover:underline ml-auto"
            >
              Все контакты →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
