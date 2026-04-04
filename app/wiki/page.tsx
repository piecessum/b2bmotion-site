"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookOpen, Search, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  wikiCustomArticles,
  wikiCustomCategories,
} from "@/lib/wiki-custom-data";
import {
  wikiFunctionArticles,
  wikiFunctionCategories,
} from "@/lib/wiki-function-data";
import { wikiTechArticles, wikiTechCategories } from "@/lib/wiki-tech-data";

/* ── Helpers ── */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function getDescription(text: any[]): string {
  const firstText = text.find((t: any) => t.ty === "text")?.te || "";
  const plain = stripHtml(firstText);
  return plain.length > 150 ? plain.substring(0, 150) + "…" : plain;
}

/* ── Data ── */

const tabs = [
  {
    id: "function",
    title: "Функционал системы",
    categories: ["Все", ...wikiFunctionCategories],
    articles: wikiFunctionArticles
      .filter((a) => a.image)
      .map((a) => ({
        title: a.title,
        description: getDescription(a.text),
        category: a.category,
        image: a.image,
        slug: a.slug,
      })),
  },
  {
    id: "custom",
    title: "Кастомизация под клиента",
    categories: ["Все", ...wikiCustomCategories],
    articles: wikiCustomArticles
      .filter((a) => a.image)
      .map((a) => ({
        title: a.title,
        description: getDescription(a.text),
        category: a.category,
        image: a.image,
        slug: a.slug,
      })),
  },
  {
    id: "tech",
    title: "Технические настройки",
    categories: ["Все", ...wikiTechCategories],
    articles: wikiTechArticles
      .filter((a) => a.image)
      .map((a) => ({
        title: a.title,
        description: getDescription(a.text),
        category: a.category,
        image: a.image,
        slug: a.slug,
      })),
  },
];

/* ── Component ── */

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const currentTab = tabs[activeTab];

  const filtered = useMemo(() => {
    return currentTab.articles.filter((a) => {
      const matchCategory =
        activeCategory === "Все" || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [currentTab, activeCategory, search]);

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setActiveCategory("Все");
    setSearch("");
  };

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-dim bg-overlay-4 border border-glass-border rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              База знаний
            </span>
            <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] leading-[1.15] tracking-[-0.025em] text-heading">
              Документация платформы{" "}
              <span className="gradient-text">«B2B Движение»</span>
            </h1>
            <p className="mt-3 text-base text-subtle">
              Руководства, инструкции и справочные материалы по работе с
              платформой от компании 3Davinci.
            </p>
          </div>

          {/* Tabs + Search row */}
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8 mb-6">
            {/* Tabs */}
            <div
              className="overflow-x-auto scrollbar-hide xl:shrink-0"
              style={{ scrollbarWidth: "none" }}
            >
              <nav className="inline-flex p-1 rounded-xl bg-overlay-4 border border-glass-border gap-1">
                {tabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(i)}
                    className={`
                      px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all
                      ${
                        activeTab === i
                          ? "bg-surface text-heading shadow-sm border border-glass-border"
                          : "text-dim hover:text-body border border-transparent"
                      }
                    `}
                  >
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Search — fills remaining space on desktop */}
            <div className="relative xl:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
              <input
                type="text"
                placeholder="Поиск по разделам и публикациям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-overlay-3 rounded-xl border border-glass-border text-sm text-body placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/30 transition-colors"
              />
            </div>
          </div>

          {/* Category filters */}
          {currentTab.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {currentTab.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : "bg-overlay-3 border border-glass-border text-subtle hover:text-body hover:border-[#3B82F6]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Articles grid */}
          {currentTab.articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((article, i) => (
                  <Link
                    key={i}
                    href={
                      "slug" in article
                        ? activeTab === 0
                          ? `/wiki/function/${article.slug}`
                          : activeTab === 1
                            ? `/wiki/custom/${article.slug}`
                            : `/wiki/tech/${article.slug}`
                        : `/wiki`
                    }
                    className="group rounded-2xl glass-card overflow-hidden hover:border-[#3B82F6]/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden bg-surface-inner">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={520}
                        height={520}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] mb-2 block">
                        {article.category}
                      </span>
                      <h3 className="font-heading font-semibold text-base text-heading mb-2 group-hover:text-[#3B82F6] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-subtle leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-center text-dim py-20">
                  Ничего не найдено. Попробуйте другой запрос.
                </p>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center py-20 rounded-2xl border border-dashed border-glass-border">
              <p className="text-dim text-sm">
                Раздел в разработке — контент скоро появится.
              </p>
            </div>
          )}

          {/* Contact block */}
          <div className="relative mt-32 rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#8B5CF6]/[0.04] border border-[#3B82F6]/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8B5CF6]/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center">
              {/* Photo desktop — margin-top отрицательный, фото выходит вверх */}
              <div className="hidden sm:flex shrink-0 w-52 items-end justify-center self-end">
                <img
                  src="/Portrett av smilende mann i skjorte 2.png"
                  alt="Агеев Дмитрий"
                  className="w-48 -mt-14 drop-shadow-lg"
                />
              </div>
              {/* Info */}
              <div className="pt-8 px-8 pb-0 sm:py-8 sm:px-6 sm:pl-4">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B82F6] mb-2">
                  Ваш персональный менеджер
                </p>
                <p className="font-heading font-semibold text-heading text-xl">
                  Агеев Дмитрий
                </p>
                <p className="text-subtle text-sm mt-1 mb-5">
                  Руководитель отдела продаж — ответит на любые вопросы по
                  платформе
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
              {/* Photo mobile */}
              <div className="sm:hidden w-full h-52 overflow-hidden">
                <img
                  src="/Portrett av smilende mann i skjorte 2.png"
                  alt="Агеев Дмитрий"
                  className="w-44 mx-auto drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
