import { getAllPosts, getPostBySlug } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogBanner } from "@/components/blog-banner";
import { RelatedCases } from "@/components/related-cases";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Quote,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function generateStaticParams() {
  const posts = getAllPosts("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);
  if (!post) return {};
  return {
    title: `${post.title} — B2B Движение`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  const isCase = post.tags?.includes("кейс") || slug.startsWith("keis-");

  if (isCase) {
    return <CaseStudyView post={post} slug={slug} />;
  }

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <article className="pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>

          {/* Cover + Header */}
          {post.image && (
            <div className="relative rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 sm:h-80 md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-3 text-sm text-white/90">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-white/70" />
                  <span>Публикация</span>
                </div>
                <h1 className="font-heading font-bold text-[clamp(24px,4vw,36px)] tracking-[-0.02em] text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          {!post.image && (
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4 text-xs text-dim">
                <Calendar className="w-3.5 h-3.5" />
                <time>
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full bg-dimmest" />
                <span>Публикация</span>
              </div>
              <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-heading leading-tight">
                {post.title}
              </h1>
            </header>
          )}

          <p className="text-lg text-subtle mb-10">{post.description}</p>

          {/* Content */}
          <div className="prose-custom">
            {renderBlogContent(post.content)}
          </div>

          {/* Blog Banner */}
          <BlogBanner />

          {/* Bottom divider */}
          <div className="section-divider mt-16 mb-10" />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function CaseStudyView({ post, slug }: { post: any; slug: string }) {
  const allPosts = getAllPosts("blog");
  const caseStudies = allPosts.filter(
    (p) => p.tags?.includes("кейс") || p.slug.startsWith("keis-"),
  );

  const metrics = (post as any).metrics || [];
  const clientInfo = (post as any).clientInfo || null;
  const problems = (post as any).problems || [];
  const solution = (post as any).solution || [];
  const results = (post as any).results || [];
  const quote = (post as any).quote || null;
  const integrations = (post as any).integrations || [];
  const logo = (post as any).logo;

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <article className="pt-36 pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back */}
          <Link
            href="/blog?filter=cases"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все кейсы
          </Link>

          {/* Hero Header */}
          <header className="mb-10">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-5">
              {clientInfo?.industry || post.tags?.[1] || "Кейс"}
            </span>

            <div className="flex items-center gap-4 mb-5">
              {logo && (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0">
                  <Image
                    src={logo}
                    alt={post.title}
                    width={56}
                    height={56}
                    className="h-9 w-auto object-contain opacity-80 dark:invert"
                  />
                </div>
              )}
              <h1 className="font-heading font-bold text-[clamp(26px,3.5vw,38px)] tracking-[-0.02em] text-heading leading-tight">
                {post.title.replace("Кейс: ", "")}
              </h1>
            </div>

            <p className="text-lg text-subtle leading-relaxed mb-5">
              {post.description}
            </p>

            <div className="flex items-center gap-3 text-sm text-dim mb-8">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-dimmest" />
              <span>История успеха</span>
            </div>

            {/* Key Metrics */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metrics.map((metric: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4 text-center"
                  >
                    <div className="text-2xl font-heading font-bold text-[#60A5FA] mb-1">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-dim leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </header>

          {/* Cover image */}
          {post.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          {/* Client Info Block */}
          {clientInfo && (
            <section className="mb-10">
              <h2 className="font-heading font-semibold text-lg text-heading mb-4">
                О клиенте
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {clientInfo.name && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">Компания</div>
                    <div className="text-sm text-body font-medium">{clientInfo.name}</div>
                  </div>
                )}
                {clientInfo.location && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">Локация</div>
                    <div className="text-sm text-body">{clientInfo.location}</div>
                  </div>
                )}
                {clientInfo.founded && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">Основание</div>
                    <div className="text-sm text-body">{clientInfo.founded} год</div>
                  </div>
                )}
                {clientInfo.clients && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">Клиентов</div>
                    <div className="text-sm text-body">{clientInfo.clients}</div>
                  </div>
                )}
              </div>

              {(clientInfo.brands || clientInfo.branches || clientInfo.businessModel) && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-5 space-y-3">
                  {clientInfo.businessModel && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">Бизнес-модель: </span>
                      <span className="text-sm text-body">{clientInfo.businessModel}</span>
                    </div>
                  )}
                  {clientInfo.brands && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">Бренды: </span>
                      <span className="text-sm text-body">{clientInfo.brands}</span>
                    </div>
                  )}
                  {clientInfo.branches && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">Филиалы: </span>
                      <span className="text-sm text-body">{clientInfo.branches}</span>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Problems & Solution */}
          {(problems.length > 0 || solution.length > 0) && (
            <section className="mb-10 grid md:grid-cols-2 gap-4">
              {problems.length > 0 && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6">
                  <h2 className="font-heading font-semibold text-base text-heading mb-4">
                    Задачи и боли
                  </h2>
                  <ul className="space-y-2.5">
                    {problems.map((problem: string, i: number) => (
                      <li key={i} className="flex gap-2.5 items-start text-sm">
                        <span className="text-red-400/80 shrink-0 mt-0.5 text-xs">&#x2716;</span>
                        <span className="text-body leading-relaxed">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {solution.length > 0 && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6">
                  <h2 className="font-heading font-semibold text-base text-heading mb-4">
                    Решение
                  </h2>
                  <ul className="space-y-2.5">
                    {solution.map((sol: string, i: number) => (
                      <li key={i} className="flex gap-2.5 items-start text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-body leading-relaxed">{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Results Block */}
          {results.length > 0 && (
            <section className="mb-10">
              <h2 className="font-heading font-semibold text-lg text-heading mb-4">
                Результаты
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.map((result: any, i: number) => (
                  <div key={i} className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-2">
                      {result.metric}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-dim line-through">{result.before}</span>
                      <span className="text-sm text-body font-medium">{result.after}</span>
                    </div>
                    <div className="text-lg font-heading font-bold text-[#10B981]">
                      {result.change}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quote Block */}
          {quote && (
            <section className="mb-10">
              <div className="rounded-xl border-l-2 border-[#3B82F6]/40 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6 md:p-8">
                <Quote className="w-5 h-5 text-[#60A5FA]/50 mb-3" />
                <blockquote className="text-base md:text-lg text-body leading-relaxed mb-4">
                  «{quote.text}»
                </blockquote>
                <cite className="text-sm font-medium text-dim not-italic">
                  — {quote.author}
                </cite>
              </div>
            </section>
          )}

          {/* Integrations Block */}
          {integrations.length > 0 && (
            <section className="mb-10">
              <h2 className="font-heading font-semibold text-lg text-heading mb-4">
                Интеграции
              </h2>
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-5">
                <ul className="space-y-2">
                  {integrations.map((integration: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm">
                      <Package className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span className="text-body leading-relaxed">{integration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Content Body */}
          <div className="prose-custom">
            {renderCaseContentBlocks(post.content)}
          </div>

          {/* Bottom divider */}
          <div className="section-divider mt-10 mb-8" />

          {/* CTA Section */}
          <section className="rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/10 to-[#06B6D4]/20 border border-[#3B82F6]/20 p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-heading mb-4">
              Автоматизируйте свой бизнес
            </h2>
            <p className="text-subtle mb-8 max-w-xl mx-auto">
              3 месяца и готовый продукт, который будет работать 24/7
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                Автоматизировать
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-body font-medium hover:bg-white/10 transition-colors"
              >
                Запросить демо
              </Link>
            </div>
          </section>

          {/* Related Cases */}
          <RelatedCases cases={caseStudies} currentSlug={slug} />

          <Link
            href="/blog?filter=cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300 mt-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все кейсы
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function renderBlogContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let inStats = false;
  const statItems: { value: string; label: string; key: number }[] = [];

  function flushStats() {
    if (statItems.length > 0) {
      elements.push(
        <div key={`stats-${statItems[0].key}`} className={`grid gap-3 my-6 ${statItems.length === 2 ? 'grid-cols-2' : statItems.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
          {statItems.map((s) => (
            <div key={s.key} className="text-center py-4 px-3 rounded-xl bg-surface-hover border border-border-subtle">
              <div className="font-heading font-bold text-lg md:text-xl gradient-text">{s.value}</div>
              <div className="text-xs text-subtle mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      );
      statItems.length = 0;
    }
    inStats = false;
  }

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    // Stats block markers
    if (trimmed === "<!-- stats -->") {
      inStats = true;
      i++;
      continue;
    }
    if (trimmed === "<!-- /stats -->") {
      flushStats();
      i++;
      continue;
    }

    // Collect stat items
    if (inStats) {
      const statMatch = trimmed.match(/^\*\s+\*\*([^*]+):\*\*\s*(.*)/);
      if (statMatch) {
        statItems.push({ value: statMatch[1], label: statMatch[2], key: i });
      }
      i++;
      continue;
    }

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // HTML comments
    if (trimmed.startsWith("<!--")) {
      i++;
      continue;
    }

    // ## Main heading — bold with gradient underline
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace("## ", "");
      elements.push(
        <div key={i} className="mt-14 mb-6 first:mt-0">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-heading tracking-[-0.02em]">
            {text}
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full" />
        </div>
      );
      i++;
      continue;
    }

    // ### Numbered heading — card with number badge
    if (trimmed.startsWith("### ")) {
      const raw = trimmed.replace("### ", "");
      const numMatch = raw.match(/^(\d+)\.\s*(.*)/);
      if (numMatch) {
        elements.push(
          <div key={i} className="flex items-start gap-4 mt-10 mb-4">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-heading font-bold text-sm shadow-lg shadow-[#3B82F6]/20">
              {numMatch[1]}
            </span>
            <h3 className="font-heading font-semibold text-xl text-heading pt-1.5">
              {numMatch[2]}
            </h3>
          </div>
        );
      } else {
        elements.push(
          <h3 key={i} className="font-heading font-semibold text-lg text-subheading mt-8 mb-3">
            {raw}
          </h3>
        );
      }
      i++;
      continue;
    }

    // Images ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push(
        <figure key={i} className="my-8">
          <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-xl border border-border-subtle" />
          {imgMatch[1] && <figcaption className="text-xs text-dim mt-2 text-center">{imgMatch[1]}</figcaption>}
        </figure>
      );
      i++;
      continue;
    }

    // List items (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items: { text: string; key: number }[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith("- ") || l.startsWith("* ")) {
          items.push({ text: l.replace(/^[-*]\s+/, ""), key: i });
          i++;
        } else break;
      }
      elements.push(
        <ul key={`ul-${items[0].key}`} className="space-y-2 mb-5 ml-1">
          {items.map((item) => (
            <li key={item.key} className="flex items-start gap-3 text-body leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-body leading-relaxed mb-4">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-subheading font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="text-dim not-italic text-xs">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-2 decoration-[#3B82F6]/30 hover:decoration-[#3B82F6]/60 transition-colors">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function renderCaseContentBlocks(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed || trimmed.startsWith("|")) {
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-heading font-semibold text-lg text-heading mt-8 mb-3">
          {trimmed.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-heading font-semibold text-base text-subheading mt-6 mb-2">
          {trimmed.replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: { text: string; key: number }[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push({ text: lines[i].trim().replace("- ", ""), key: i });
        i++;
      }
      elements.push(
        <ul key={`ul-${items[0].key}`} className="ml-4 space-y-1 mb-3">
          {items.map((item) => (
            <li key={item.key} className="text-sm text-body leading-relaxed list-disc marker:text-[#3B82F6]">
              {renderInline(item.text)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: { text: string; num: number; key: number }[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const line = lines[i].trim();
        const num = parseInt(line.match(/^(\d+)\./)![1], 10);
        items.push({ text: line.replace(/^\d+\.\s/, ""), num, key: i });
        i++;
      }
      elements.push(
        <ol key={`ol-${items[0].key}`} className="ml-4 space-y-1 mb-3" start={items[0].num}>
          {items.map((item) => (
            <li key={item.key} className="text-sm text-body leading-relaxed list-decimal marker:text-[#3B82F6]">
              {renderInline(item.text)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(
      <p key={i} className="text-sm text-body leading-relaxed mb-3">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}
