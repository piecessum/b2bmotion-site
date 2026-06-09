import { getB2BNewsItem } from "@/lib/b2b-news";
import { getArticleSummary } from "@/lib/article-summary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";
import { notFound } from "next/navigation";
import { Calendar, ExternalLink } from "lucide-react";
import { Suspense } from "react";

export const revalidate = 3600;

function normalizeSummary(summary?: string): string | null {
  const text = summary?.replace(/\s+/g, " ").trim();
  if (!text || text.length < 20) return null;
  return text;
}

function getFallbackSummary(item: {
  title: string;
  source: string;
  summary?: string;
}): string {
  const rssSummary = normalizeSummary(item.summary);
  if (rssSummary) return rssSummary;

  return `Источник ${item.source} сообщает: «${item.title}». Подробности и контекст доступны в оригинальной публикации.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getB2BNewsItem(id);
  if (!item) return {};
  const desc = (item.summary || item.title).slice(0, 160);
  return {
    title: `${item.title} — обзор | B2B Движение`,
    description: desc,
    // Канонический адрес — оригинал на источнике: защищает от штрафов
    // за неуникальный контент, отдаёт авторство первоисточнику.
    alternates: item.sourceUrl ? { canonical: item.sourceUrl } : undefined,
    openGraph: {
      title: item.title,
      description: desc,
      type: "article",
      ...(item.image ? { images: [item.image] } : {}),
    },
  };
}

// Пересказ грузится отдельным async-компонентом, чтобы не блокировать рендер
// всей страницы походом за оригиналом статьи. Шапка отдаётся мгновенно, а этот
// блок подтягивается потоком (Suspense) и заменяет скелетон по готовности.
async function NewsRecap({
  sourceUrl,
  fallbackSummary,
}: {
  sourceUrl?: string;
  fallbackSummary: string;
}) {
  // Пытаемся собрать настоящий пересказ из оригинала статьи (бесплатно, на
  // сервере). Не вышло — откатываемся на анонс из RSS-ленты.
  const recap = sourceUrl ? await getArticleSummary(sourceUrl) : null;

  if (!recap) {
    return (
      <p className="text-lg leading-relaxed text-body">{fallbackSummary}</p>
    );
  }

  return (
    <ul className="space-y-3">
      {recap.map((point, i) => (
        <li
          key={i}
          className="relative pl-6 text-lg leading-relaxed text-body before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#C084FC]"
        >
          {point}
        </li>
      ))}
    </ul>
  );
}

function RecapSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {[100, 92, 78].map((w, i) => (
        <div
          key={i}
          className="h-5 animate-pulse rounded bg-border-subtle"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

export default async function B2BNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getB2BNewsItem(id);

  if (!item) notFound();

  const fallbackSummary = getFallbackSummary(item);

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <article className="px-6 pb-28 pt-36">
        <div className="mx-auto max-w-3xl">
          <BackButton
            storageKey="news_back_url"
            fallback="/news"
            className="mb-10 inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-body"
          >
            Назад
          </BackButton>

          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-4 text-xs text-dim">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time>
                  {new Date(item.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
              <span className="rounded-full bg-[#8B5CF6]/10 px-2.5 py-1 font-medium text-[#C084FC]">
                {item.source}
              </span>
            </div>

            <h1 className="font-heading text-[clamp(26px,4vw,38px)] font-bold leading-tight tracking-[-0.02em] text-heading">
              {item.title}
            </h1>
          </header>

          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="mb-10 w-full rounded-2xl border border-border-subtle object-cover"
            />
          )}

          <div className="section-divider mb-10" />

          {/* Краткий пересказ */}
          <div className="prose-custom">
            <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-dim">
              Кратко
            </h2>
            <Suspense fallback={<RecapSkeleton />}>
              <NewsRecap
                sourceUrl={item.sourceUrl}
                fallbackSummary={fallbackSummary}
              />
            </Suspense>
          </div>

          {/* Ссылка на источник */}
          {item.sourceUrl && (
            <div className="mt-12">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.3)]"
              >
                Читать на источнике
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-3 text-xs text-dim">
                Источник: {item.source}
              </p>
            </div>
          )}

          <div className="section-divider mb-10 mt-16" />

          <BackButton
            storageKey="news_back_url"
            fallback="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#C084FC] transition-all duration-300 hover:gap-3"
          >
            Назад
          </BackButton>
        </div>
      </article>

      <Footer />
    </main>
  );
}
