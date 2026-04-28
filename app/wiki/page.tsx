import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiSearch } from "@/components/wiki/wiki-search";
import {
  wikiSections,
  onboardingSteps,
  sectionUrl,
  allWikiArticles,
} from "@/lib/wiki-tree";

export const metadata = {
  title: "База знаний — B2B Движение",
  description:
    "Документация, инструкции и руководства по работе с платформой B2B Движение: функционал, кастомизация, технические настройки.",
};

export default function WikiLandingPage() {
  const totalArticles = allWikiArticles.length;
  const totalCategories = wikiSections.reduce(
    (n, s) => n + s.groups.reduce((m, g) => m + g.categories.length, 0),
    0,
  );

  return (
    <WikiShell>
      {/* Hero */}
      <header className="mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-dim bg-overlay-4 border border-glass-border rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          База знаний
        </span>
        <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] leading-[1.15] tracking-[-0.025em] text-heading">
          Документация платформы{" "}
          <span className="gradient-text">«B2B Движение»</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base text-subtle">
          Руководства, инструкции и справочные материалы для команды клиента и
          новых сотрудников. {totalArticles} статей в {totalCategories}{" "}
          категориях — пользуйтесь оглавлением слева или поиском.
        </p>

        <div className="mt-6 max-w-xl">
          <WikiSearch
            variant="input"
            placeholder="Поиск по всем разделам — заголовок, категория, текст…"
          />
        </div>
      </header>

      {/* "С чего начать" */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-5">
          <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="font-heading font-semibold text-xl text-heading">
            С чего начать новому сотруднику
          </h2>
        </div>
        <p className="text-sm text-subtle max-w-2xl mb-6">
          Базовый маршрут обучения для новых сотрудников у клиента — пройдите
          по шагам, чтобы получить общее представление о том, как устроена
          B2B-платформа.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {onboardingSteps.map((step) => (
            <li key={step.slug}>
              <Link
                href={`/wiki/${step.section}/${step.slug}`}
                className="group flex flex-col h-full p-5 rounded-2xl glass-card hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] text-white text-[12px] font-semibold tabular-nums shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                    {step.step}
                  </span>
                  <ArrowRight className="w-4 h-4 text-dim group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-heading font-semibold text-[15px] text-heading group-hover:text-[#3B82F6] transition-colors mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[12.5px] text-subtle leading-relaxed line-clamp-3">
                  {step.hint}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Sections */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
          <h2 className="font-heading font-semibold text-xl text-heading">
            Разделы базы знаний
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {wikiSections.map((section) => (
            <Link
              key={section.id}
              href={sectionUrl(section.id)}
              className="group relative rounded-2xl glass-card p-6 hover:border-[#3B82F6]/30 transition-all duration-300 overflow-hidden"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ backgroundColor: section.accent }}
              />
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-heading font-semibold text-lg text-heading group-hover:text-[#3B82F6] transition-colors">
                  {section.title}
                </h3>
                <span className="text-[11px] text-dim tabular-nums">
                  {section.articleCount} ст.
                </span>
              </div>
              <p className="text-[13px] text-subtle leading-relaxed mb-4 line-clamp-3">
                {section.description}
              </p>
              <ul className="text-[12px] text-dim space-y-1">
                {section.groups.slice(0, 4).map((g) => (
                  <li key={g.id} className="flex items-center justify-between">
                    <span className="truncate">{g.title}</span>
                    <span className="tabular-nums ml-2">
                      {g.articleCount}
                    </span>
                  </li>
                ))}
                {section.groups.length > 4 && (
                  <li className="text-dim">
                    + ещё {section.groups.length - 4}
                  </li>
                )}
              </ul>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#3B82F6] group-hover:gap-2 transition-all">
                Открыть раздел
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <ContactBlock />
    </WikiShell>
  );
}

function ContactBlock() {
  return (
    <div className="relative mt-20 rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#8B5CF6]/[0.04] border border-[#3B82F6]/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8B5CF6]/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row sm:items-center">
        <div className="hidden sm:flex shrink-0 w-52 items-end justify-center self-end">
          <img
            src="/team/Portrett av smilende mann i skjorte 2.png"
            alt="Агеев Дмитрий"
            className="w-48 -mt-14 drop-shadow-lg"
          />
        </div>
        <div className="pt-8 px-8 pb-0 sm:py-8 sm:px-6 sm:pl-4">
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
        <div className="sm:hidden w-full h-52 overflow-hidden">
          <img
            src="/team/Portrett av smilende mann i skjorte 2.png"
            alt="Агеев Дмитрий"
            className="w-44 mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
