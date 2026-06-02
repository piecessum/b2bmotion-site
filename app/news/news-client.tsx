"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Newspaper } from "lucide-react";
import type { NewsItem } from "@/lib/b2b-news";
import type { Rates } from "@/lib/rates";
import { NewsSidebar } from "./news-sidebar";

type TabKey = "b2b" | "platform";

const TABS: { key: TabKey; label: string }[] = [
  { key: "b2b", label: "Новости B2B" },
  { key: "platform", label: "Новости платформы" },
];

const TAG_LABELS: Record<string, string> = {
  b2bmotion: "B2B Движение",
  новый_функционал: "Новый функционал",
  интеграции: "Интеграции",
  мобильная_версия: "Мобильная версия",
  mdm: "MDM",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsRow({ item }: { item: NewsItem }) {
  const inner = (
    <>
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-inner)] sm:w-28">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-dimmer">
            <Newspaper className="h-7 w-7" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-heading text-base font-semibold leading-snug text-heading transition-colors group-hover:text-[#8B5CF6] dark:group-hover:text-white sm:text-lg line-clamp-3">
          {item.title}
        </h3>
        <div className="mt-auto pt-2.5">
          <time className="block text-xs text-dim">{formatDate(item.date)}</time>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#C084FC]">
            {item.external && <ExternalLink className="h-3 w-3" />}
            {item.source}
          </span>
        </div>
      </div>
    </>
  );

  const className =
    "group flex gap-4 rounded-2xl glass-card p-4 sm:gap-5 sm:p-5";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}

function NewsList({ items, emptyText }: { items: NewsItem[]; emptyText: string }) {
  if (items.length === 0) {
    return <p className="py-16 text-center text-dim">{emptyText}</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <NewsRow key={item.href} item={item} />
      ))}
    </div>
  );
}

function TopicChips({
  items,
  activeTag,
  onChange,
}: {
  items: NewsItem[];
  activeTag: string | null;
  onChange: (tag: string | null) => void;
}) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      for (const tag of item.tags ?? []) set.add(tag);
    }
    return Array.from(set).sort(
      (a, b) =>
        items.filter((p) => p.tags?.includes(b)).length -
        items.filter((p) => p.tags?.includes(a)).length,
    );
  }, [items]);

  if (tags.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
          activeTag === null
            ? "border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            : "border-white/10 bg-white/5 text-dim hover:bg-white/10 hover:text-body"
        }`}
      >
        Все
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag === activeTag ? null : tag)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeTag === tag
              ? "border-[#8B5CF6] bg-transparent text-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              : "border-white/10 bg-white/5 text-dim hover:bg-white/10 hover:text-body"
          }`}
        >
          {TAG_LABELS[tag] || tag}
        </button>
      ))}
    </div>
  );
}

export function NewsClient({
  b2bItems,
  platformItems,
  rates,
  today,
}: {
  b2bItems: NewsItem[];
  platformItems: NewsItem[];
  rates: Rates | null;
  today: { y: number; m: number; d: number };
}) {
  const [tab, setTab] = useState<TabKey>("b2b");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPlatform = activeTag
    ? platformItems.filter((p) => p.tags?.includes(activeTag))
    : platformItems;

  return (
    <div>
      {/* Табы — сегментированный переключатель, на месте тега */}
      <div className="mb-6 inline-flex gap-1 rounded-full border border-glass-border bg-overlay-4 p-1 shadow-sm backdrop-blur-md">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 sm:px-6 ${
              tab === t.key
                ? "bg-overlay-8 text-heading"
                : "text-dim hover:text-body"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Заголовок и подзаголовок */}
      <div className="mb-12">
        <h1 className="font-heading text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.02em] text-heading">
          Новости <span className="gradient-text">B2B-рынка</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-subtle">
          Всё важное о B2B-рынке РФ с разных площадок и обновления платформы — в одном месте.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        {/* Основная колонка */}
        <div>
          {tab === "b2b" ? (
            <NewsList
              items={b2bItems}
              emptyText="Новости с внешних площадок временно недоступны. Загляните позже."
            />
          ) : (
            <>
              <TopicChips
                items={platformItems}
                activeTag={activeTag}
                onChange={setActiveTag}
              />
              <NewsList
                items={filteredPlatform}
                emptyText="Нет новостей по выбранной теме."
              />
            </>
          )}
        </div>

        {/* Сайдбар */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <NewsSidebar today={today} rates={rates} />
        </aside>
      </div>
    </div>
  );
}
