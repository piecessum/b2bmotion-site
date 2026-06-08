"use client";

import { useMemo, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Newspaper, Flame } from "lucide-react";
import type { NewsItem } from "@/lib/b2b-news";
import type { Rates } from "@/lib/rates";
import { NewsSidebar } from "./news-sidebar";

type TabKey = "b2b" | "platform";

// Ключ для сохранения позиции скролла ленты при уходе на конкретную новость.
// Suspense + клиентский рендер через useSearchParams ломают штатное
// восстановление скролла в App Router, поэтому возвращаем его сами.
const SCROLL_KEY = "news-list-scroll";

function rememberScroll() {
  try {
    sessionStorage.setItem(
      SCROLL_KEY,
      JSON.stringify({ y: window.scrollY, url: window.location.href }),
    );
  } catch {
    /* sessionStorage недоступен — не критично */
  }
}

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
          <span className="mt-1 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#C084FC]">
            {item.source}
            {(item.coverage ?? 1) >= 2 && (
              <span className="rounded-full bg-[#8B5CF6]/10 px-2 py-0.5 text-[11px] text-[#C084FC]">
                + ещё {item.coverage! - 1}{" "}
                {item.coverage! - 1 === 1 ? "источник" : "источников"}
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <Link
      href={item.href}
      onClick={rememberScroll}
      className="group flex gap-4 rounded-2xl glass-card p-4 sm:gap-5 sm:p-5"
    >
      {inner}
    </Link>
  );
}

function WeeklyDigest({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-8 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/[0.05] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Flame className="h-4 w-4 text-[#C084FC]" />
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#C084FC]">
          Главное за неделю
        </h2>
      </div>
      <ol className="flex flex-col divide-y divide-border-subtle">
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={rememberScroll}
              className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="font-heading text-lg font-bold text-[#8B5CF6]/60 tabular-nums">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="font-medium leading-snug text-body transition-colors group-hover:text-[#8B5CF6] dark:group-hover:text-white">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs text-dim">
                  {item.source}
                  {(item.coverage ?? 1) >= 2 &&
                    ` · осветили ${item.coverage} источников`}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
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

type NewsData = {
  b2bItems: NewsItem[];
  platformItems: NewsItem[];
  digest: NewsItem[];
  rates: Rates | null;
  today: { y: number; m: number; d: number };
};

// Презентационная разметка. Состояние (таб/фильтр) приходит сверху, чтобы её
// можно было одинаково отрисовать и в Suspense-фолбэке, и в интерактивной версии.
function NewsLayout({
  tab,
  activeTag,
  onTabChange,
  onTagChange,
  b2bItems,
  platformItems,
  digest,
  rates,
  today,
}: NewsData & {
  tab: TabKey;
  activeTag: string | null;
  onTabChange: (tab: TabKey) => void;
  onTagChange: (tag: string | null) => void;
}) {
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
            onClick={() => onTabChange(t.key)}
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
            <>
              <WeeklyDigest items={digest} />
              <NewsList
                items={b2bItems}
                emptyText="Новости с внешних площадок временно недоступны. Загляните позже."
              />
            </>
          ) : (
            <>
              <TopicChips
                items={platformItems}
                activeTag={activeTag}
                onChange={onTagChange}
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

// Источник истины для таба и фильтра — query-параметры URL. Это даёт шарящиеся
// ссылки на конкретный таб/фильтр и восстановление состояния (плюс позиции
// скролла — её возвращает App Router) при возврате «назад» со страницы новости.
function NewsClientInner(data: NewsData) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab: TabKey = searchParams.get("tab") === "platform" ? "platform" : "b2b";
  const activeTag = tab === "platform" ? searchParams.get("tag") || null : null;

  // Возврат «назад» с новости: восстанавливаем позицию скролла ленты, если URL
  // совпадает с тем, откуда ушли. App Router (плюс Suspense-граница) сам
  // прокручивает наверх, причём асинхронно, поэтому навязываем нужную позицию
  // несколько кадров подряд, а ключ удаляем только после восстановления.
  useEffect(() => {
    let saved: { y: number; url: string } | null = null;
    try {
      const raw = sessionStorage.getItem(SCROLL_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {
      return;
    }
    if (!saved || saved.url !== window.location.href) return;

    const target = saved.y;
    const start = performance.now();
    let reachedAt = 0;
    let frame = 0;
    const tick = () => {
      const now = performance.now();
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const goal = Math.min(target, Math.max(0, maxScroll));
      window.scrollTo(0, goal);

      // Цель достигнута, когда контент дорисовался до нужной высоты и позиция
      // встала. После этого удерживаем ещё ~150мс (страховка от позднего
      // скролла-наверх) и завершаем, чтобы не мешать прокрутке пользователя.
      const reached = maxScroll >= target - 2 && Math.abs(window.scrollY - goal) < 2;
      if (reached && !reachedAt) reachedAt = now;

      const done = (reachedAt && now - reachedAt > 150) || now - start > 1500;
      if (!done) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.removeItem(SCROLL_KEY);
        } catch {
          /* не критично */
        }
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const setParams = useCallback(
    (nextTab: TabKey, nextTag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextTab === "platform") params.set("tab", nextTab);
      else params.delete("tab");

      // Фильтр по теме имеет смысл только на табе платформы.
      if (nextTab === "platform" && nextTag) params.set("tag", nextTag);
      else params.delete("tag");

      const qs = params.toString();
      // replace, а не push: переключение таба/фильтра не плодит лишние записи в
      // истории — «назад» с новости возвращает к актуальному состоянию.
      router.replace(qs ? `/news?${qs}` : "/news", { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <NewsLayout
      {...data}
      tab={tab}
      activeTag={activeTag}
      onTabChange={(nextTab) =>
        setParams(nextTab, nextTab === "platform" ? activeTag : null)
      }
      onTagChange={(nextTag) => setParams("platform", nextTag)}
    />
  );
}

export function NewsClient(data: NewsData) {
  // useSearchParams требует Suspense-границу; фолбэк отрисовывает таб по
  // умолчанию, чтобы первый рендер не был пустым.
  return (
    <Suspense
      fallback={
        <NewsLayout
          {...data}
          tab="b2b"
          activeTag={null}
          onTabChange={() => {}}
          onTagChange={() => {}}
        />
      }
    >
      <NewsClientInner {...data} />
    </Suspense>
  );
}
