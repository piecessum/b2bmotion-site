import { getAllPosts, getPostBySlug } from "@/lib/content";
import { authorSlug } from "@/lib/authors";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogBanner } from "@/components/blog-banner";
import { RelatedCases } from "@/components/related-cases";
import { CtaButton } from "@/components/cta-button";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Quote,
  Package,
  BookOpen,
  ExternalLink,
  Users,
  Sparkles,
  Zap,
  Truck,
  TrendingUp,
  Eye,
  BarChart3,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BackButton } from "@/components/back-button";

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
          {/* Back to blog */}
          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            Блог
          </BackButton>

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

          <p className="text-lg text-subtle mb-6">{post.description}</p>

          {/* Audience */}
          {post.audience && post.audience.length > 0 && (
            <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-5 mb-8">
              <div className="flex items-center gap-2.5 mb-3">
                <Users className="w-4 h-4 text-[#60A5FA]" />
                <span className="font-heading font-semibold text-sm text-heading">
                  Для кого эта статья
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.audience.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-sm text-body bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-lg px-3.5 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Source note */}
          {(post as any).source && (
            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#3B82F6]/5 to-[#8B5CF6]/5 border border-[#3B82F6]/15 px-5 py-3.5 mb-8">
              <ExternalLink className="w-4 h-4 text-[#60A5FA] shrink-0" />
              <p className="text-sm text-subtle">
                {(post as any).source.text}{" "}
                <a
                  href={(post as any).source.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#60A5FA] hover:text-[#93C5FD] font-medium underline underline-offset-2 decoration-[#3B82F6]/30 hover:decoration-[#3B82F6]/60 transition-colors"
                >
                  {(post as any).source.linkText}
                </a>
              </p>
            </div>
          )}

          {/* Interviewee Card */}
          {(post as any).intervieweeCard && (
            <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 border border-gray-200 dark:border-white/[0.06] p-6 md:p-8">
              <div className="flex items-start gap-5">
                <img
                  src={(post as any).intervieweeCard.photo}
                  alt={(post as any).intervieweeCard.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-2 border-[#3B82F6]/20 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#60A5FA] mb-1">
                    Интервьюируемый
                  </div>
                  <h4 className="font-heading font-bold text-lg text-heading mb-0.5">
                    {(post as any).intervieweeCard.name}
                  </h4>
                  <p className="text-sm font-medium text-subtle mb-2">
                    {(post as any).intervieweeCard.role}
                  </p>
                  <p className="text-sm text-dim leading-relaxed">
                    {(post as any).intervieweeCard.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Table of Contents */}
          {(() => {
            const headings = extractHeadings(post.content);
            if (headings.length < 3) return null;
            return (
              <nav className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6 mb-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <BookOpen className="w-4 h-4 text-[#60A5FA]" />
                  <span className="font-heading font-semibold text-sm text-heading">
                    Содержание
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {headings.map((h, idx) => (
                    <li key={idx} className={h.level === 3 ? "pl-5" : ""}>
                      <a
                        href={`#${h.id}`}
                        className={`text-sm hover:text-[#60A5FA] transition-colors leading-relaxed ${
                          h.level === 2
                            ? "font-medium text-body"
                            : "text-subtle"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })()}

          {/* Content */}
          <div className="prose-custom">{renderBlogContent(post.content)}</div>

          {/* Author Card(s) */}
          <AuthorCards post={post} />

          {/* Blog Banner */}
          <BlogBanner />

          {/* Bottom divider */}
          <div className="section-divider mt-16 mb-10" />

          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300"
          >
            Блог
          </BackButton>
        </div>
      </article>

      <Footer />
    </main>
  );
}

// Карточки автора и соавтора материала (статьи или кейса)
function AuthorCards({ post }: { post: any }) {
  if (!post.authorCard) return null;
  const authors = [post.authorCard, post.coAuthorCard].filter(Boolean);
  const isMulti = authors.length > 1;
  return (
    <div
      className={`mt-14 mb-10 grid gap-4 ${
        isMulti ? "md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {authors.map((author: any, ai: number) => (
        <Link
          key={ai}
          href={`/blog/author/${authorSlug(author.name)}`}
          className="group block rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 border border-gray-200 dark:border-white/[0.06] p-6 md:p-8 transition-colors hover:border-[#3B82F6]/30"
        >
          <div className="flex items-start gap-5">
            <img
              src={author.photo}
              alt={author.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-2 border-[#3B82F6]/20 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#60A5FA] mb-1">
                {isMulti ? (ai === 0 ? "Автор" : "Соавтор") : "Автор"}
              </div>
              <h4 className="font-heading font-bold text-lg text-heading mb-0.5 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                {author.name}
              </h4>
              <p className="text-sm font-medium text-subtle mb-2">
                {author.role}
              </p>
              <p className="text-sm text-dim leading-relaxed">{author.bio}</p>
              <span className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                Все материалы автора
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
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
          {/* Back to blog */}
          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            Блог
          </BackButton>

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
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">
                      Компания
                    </div>
                    <div className="text-sm text-body font-medium">
                      {clientInfo.name}
                    </div>
                  </div>
                )}
                {clientInfo.location && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">
                      Локация
                    </div>
                    <div className="text-sm text-body">
                      {clientInfo.location}
                    </div>
                  </div>
                )}
                {clientInfo.founded && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">
                      Основание
                    </div>
                    <div className="text-sm text-body">
                      {clientInfo.founded} год
                    </div>
                  </div>
                )}
                {clientInfo.clients && (
                  <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4">
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1">
                      Клиентов
                    </div>
                    <div className="text-sm text-body">
                      {clientInfo.clients}
                    </div>
                  </div>
                )}
              </div>

              {(clientInfo.brands ||
                clientInfo.branches ||
                clientInfo.businessModel) && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-5 space-y-3">
                  {clientInfo.businessModel && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">
                        Бизнес-модель:{" "}
                      </span>
                      <span className="text-sm text-body">
                        {clientInfo.businessModel}
                      </span>
                    </div>
                  )}
                  {clientInfo.brands && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">
                        Бренды:{" "}
                      </span>
                      <span className="text-sm text-body">
                        {clientInfo.brands}
                      </span>
                    </div>
                  )}
                  {clientInfo.branches && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-dim">
                        Филиалы:{" "}
                      </span>
                      <span className="text-sm text-body">
                        {clientInfo.branches}
                      </span>
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
                        <span className="text-red-400/80 shrink-0 mt-0.5 text-xs">
                          &#x2716;
                        </span>
                        <span className="text-body leading-relaxed">
                          {problem}
                        </span>
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
                  <div
                    key={i}
                    className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-4"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-2">
                      {result.metric}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-dim line-through">
                        {result.before}
                      </span>
                      <span className="text-sm text-body font-medium">
                        {result.after}
                      </span>
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
                      <span className="text-body leading-relaxed">
                        {integration}
                      </span>
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

          {/* Author Card(s) */}
          <AuthorCards post={post} />

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
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Автоматизировать
              </CtaButton>
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-body font-medium hover:bg-white/10 transition-colors">
                Запросить демо
              </CtaButton>
            </div>
          </section>

          {/* Related Cases */}
          <RelatedCases cases={caseStudies} currentSlug={slug} />

          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300 mt-10"
          >
            Блог
          </BackButton>
        </div>
      </article>

      <Footer />
    </main>
  );
}

// Пятицветная шкала этапов вовлечения (воронка B2B Движение):
// красный → янтарный → оранжевый → зелёный → бирюзовый.
// Цвета задаются инлайн-стилями, чтобы не зависеть от JIT-очистки Tailwind.
const STAGE_COLORS = [
  { key: "red", hex: "#EF4444", name: "Красный" },
  { key: "amber", hex: "#F59E0B", name: "Янтарный" },
  { key: "orange", hex: "#F97316", name: "Оранжевый" },
  { key: "green", hex: "#22C55E", name: "Зелёный" },
  { key: "teal", hex: "#14B8A6", name: "Бирюзовый" },
] as const;

function stageColor(key: string) {
  return STAGE_COLORS.find((s) => s.key === key) || STAGE_COLORS[0];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(content: string) {
  const lines = content.split("\n");
  const headings: { level: number; text: string; id: string }[] = [];
  let inStats = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "<!-- stats -->") {
      inStats = true;
      continue;
    }
    if (trimmed === "<!-- /stats -->") {
      inStats = false;
      continue;
    }
    if (inStats) continue;

    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace("## ", "");
      headings.push({ level: 2, text, id: slugify(text) });
    } else if (trimmed.startsWith("### ")) {
      const raw = trimmed.replace("### ", "");
      const numMatch = raw.match(/^(\d+)\.\s*(.*)/);
      const text = numMatch ? `${numMatch[1]}. ${numMatch[2]}` : raw;
      headings.push({ level: 3, text, id: slugify(text) });
    }
  }
  return headings;
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
        <div
          key={`stats-${statItems[0].key}`}
          className={`grid gap-3 my-6 ${statItems.length === 2 ? "grid-cols-2" : statItems.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}
        >
          {statItems.map((s) => (
            <div
              key={s.key}
              className="text-center py-4 px-3 rounded-xl bg-surface-hover border border-border-subtle"
            >
              <div className="font-heading font-bold text-lg md:text-xl gradient-text">
                {s.value}
              </div>
              <div className="text-xs text-subtle mt-1">{s.label}</div>
            </div>
          ))}
        </div>,
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

    // Features block (functional analysis cards)
    if (trimmed === "<!-- features -->") {
      const groups: { type: string; title: string; items: string[] }[] = [];
      let currentGroup: {
        type: string;
        title: string;
        items: string[];
      } | null = null;
      i++;
      while (i < lines.length) {
        const fl = lines[i].trim();
        if (fl === "<!-- /features -->") {
          i++;
          break;
        }
        const groupMatch = fl.match(/^<!-- group:(\w+):(.+) -->$/);
        if (groupMatch) {
          if (currentGroup) groups.push(currentGroup);
          currentGroup = {
            type: groupMatch[1],
            title: groupMatch[2],
            items: [],
          };
          i++;
          continue;
        }
        if (currentGroup && (fl.startsWith("* ") || fl.startsWith("- "))) {
          currentGroup.items.push(fl.replace(/^[*-]\s+/, ""));
        }
        i++;
      }
      if (currentGroup) groups.push(currentGroup);

      const colorMap: Record<
        string,
        {
          border: string;
          bg: string;
          icon: string;
          badge: string;
          badgeText: string;
        }
      > = {
        required: {
          border: "border-[#8B5CF6]/30",
          bg: "bg-[#8B5CF6]/5",
          icon: "text-[#8B5CF6]",
          badge: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
          badgeText: "Обязательно",
        },
        desired: {
          border: "border-amber-400/30",
          bg: "bg-amber-500/5",
          icon: "text-amber-400",
          badge: "bg-amber-500/10 text-amber-500",
          badgeText: "Желательно",
        },
        recommended: {
          border: "border-emerald-400/30",
          bg: "bg-emerald-500/5",
          icon: "text-emerald-400",
          badge: "bg-emerald-500/10 text-emerald-400",
          badgeText: "Рекомендуется",
        },
        optimal: {
          border: "border-[#8B5CF6]/30",
          bg: "bg-[#8B5CF6]/5",
          icon: "text-[#8B5CF6]",
          badge: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
          badgeText: "Оптимально",
        },
        good: {
          border: "border-emerald-400/30",
          bg: "bg-emerald-500/5",
          icon: "text-emerald-400",
          badge: "bg-emerald-500/10 text-emerald-400",
          badgeText: "Хорошо",
        },
        bad: {
          border: "border-red-400/30",
          bg: "bg-red-500/5",
          icon: "text-red-400",
          badge: "bg-red-500/10 text-red-400",
          badgeText: "Плохо",
        },
      };

      elements.push(
        <div key={`features-${i}`} className="grid gap-4 my-6 md:grid-cols-3">
          {groups.map((g, gi) => {
            const c = colorMap[g.type] || colorMap.recommended;
            return (
              <div
                key={gi}
                className={`rounded-xl border ${c.border} ${c.bg} p-5`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${c.badge}`}
                  >
                    {c.badgeText}
                  </span>
                </div>
                <h4 className="font-heading font-semibold text-base text-heading mb-3">
                  {g.title}
                </h4>
                <ul className="space-y-2">
                  {g.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="flex items-start gap-2.5 text-sm text-body leading-relaxed"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${c.icon} shrink-0 mt-0.5`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>,
      );
      continue;
    }

    // Callout block — info plashka with gradient bg and italic text
    if (trimmed === "<!-- callout -->") {
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length) {
        const cl = lines[i].trim();
        if (cl === "<!-- /callout -->") {
          i++;
          break;
        }
        calloutLines.push(lines[i]);
        i++;
      }
      const paragraphs: string[] = [];
      let buf = "";
      for (const cl of calloutLines) {
        if (!cl.trim()) {
          if (buf) {
            paragraphs.push(buf.trim());
            buf = "";
          }
        } else {
          buf += (buf ? " " : "") + cl.trim();
        }
      }
      if (buf) paragraphs.push(buf.trim());

      elements.push(
        <div
          key={`callout-${i}`}
          className="my-8 relative rounded-2xl bg-gradient-to-br from-[#3B82F6]/8 via-[#8B5CF6]/6 to-[#06B6D4]/8 border border-[#3B82F6]/15 p-6 md:p-7 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
            </div>
            <div className="space-y-3 text-base md:text-[17px] text-body leading-relaxed">
              {paragraphs.map((p, pi) => (
                <p key={pi} className="italic">
                  {renderInline(p)}
                </p>
              ))}
            </div>
          </div>
        </div>,
      );
      continue;
    }

    // Benefits block — 3x2 grid of icon cards (title | subtitle)
    if (trimmed === "<!-- benefits -->") {
      const items: { title: string; subtitle: string }[] = [];
      i++;
      while (i < lines.length) {
        const bl = lines[i].trim();
        if (bl === "<!-- /benefits -->") {
          i++;
          break;
        }
        const match = bl.match(/^[*-]\s+\*\*([^*]+)\*\*\s*\|\s*(.+)$/);
        if (match) {
          items.push({ title: match[1].trim(), subtitle: match[2].trim() });
        }
        i++;
      }

      const icons = [Zap, Truck, Users, TrendingUp, Eye, BarChart3];
      elements.push(
        <div
          key={`benefits-${i}`}
          className="grid gap-4 my-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-5 hover:border-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 border border-[#3B82F6]/15 flex items-center justify-center mb-4 group-hover:from-[#3B82F6]/25 group-hover:to-[#8B5CF6]/25 transition-colors">
                  <Icon className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <h4 className="font-heading font-semibold text-[15px] text-heading mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-dim leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>,
      );
      continue;
    }

    // Showcase block — large gradient hero with title/subtitle + image
    if (trimmed === "<!-- showcase -->") {
      let title = "";
      let subtitle = "";
      let image = "";
      i++;
      while (i < lines.length) {
        const sl = lines[i].trim();
        if (sl === "<!-- /showcase -->") {
          i++;
          break;
        }
        const tm = sl.match(/^\*\*title:\*\*\s*(.+)$/);
        const stm = sl.match(/^\*\*subtitle:\*\*\s*(.+)$/);
        const im = sl.match(/^\*\*image:\*\*\s*(.+)$/);
        if (tm) title = tm[1].trim();
        else if (stm) subtitle = stm[1].trim();
        else if (im) image = im[1].trim();
        i++;
      }

      elements.push(
        <div
          key={`showcase-${i}`}
          className="my-12 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#312E81] via-[#581C87] to-[#1E1B4B] border border-white/10 p-8 md:p-12"
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3B82F6]/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/30 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h3 className="font-heading font-bold text-2xl md:text-4xl text-white leading-tight mb-3 tracking-[-0.02em]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-base md:text-xl text-white/80 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
            {image && (
              <img
                src={image}
                alt={title}
                className="mt-8 w-full rounded-xl border border-white/10 shadow-2xl"
              />
            )}
          </div>
        </div>,
      );
      continue;
    }

    // Banner block — CTA banner with title, two action buttons and image
    if (trimmed === "<!-- banner -->") {
      let title = "";
      let btn1Text = "";
      let btn1Url = "";
      let btn2Text = "";
      let btn2Url = "";
      let image = "";
      let bgMode = false;
      i++;
      while (i < lines.length) {
        const bl = lines[i].trim();
        if (bl === "<!-- /banner -->") {
          i++;
          break;
        }
        const tm = bl.match(/^\*\*title:\*\*\s*(.+)$/);
        const b1 = bl.match(/^\*\*button1:\*\*\s*(.+?)\s*\|\s*(.+)$/);
        const b2 = bl.match(/^\*\*button2:\*\*\s*(.+?)\s*\|\s*(.+)$/);
        const im = bl.match(/^\*\*image:\*\*\s*(.+)$/);
        const bg = bl.match(/^\*\*bg:\*\*\s*(.+)$/);
        if (tm) title = tm[1].trim();
        else if (b1) {
          btn1Text = b1[1].trim();
          btn1Url = b1[2].trim();
        } else if (b2) {
          btn2Text = b2[1].trim();
          btn2Url = b2[2].trim();
        } else if (im) image = im[1].trim();
        else if (bg) bgMode = /cover|full|background/i.test(bg[1].trim());
        i++;
      }

      // Background mode — image fills the whole banner, text overlaid on top
      if (bgMode && image) {
        elements.push(
          <div
            key={`banner-${i}`}
            className="my-12 relative rounded-2xl overflow-hidden border border-glass-border min-h-[280px] md:min-h-[320px] flex items-center p-8 md:p-12"
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1020]/90 via-[#0B1020]/70 to-[#0B1020]/30" />
            <div className="relative max-w-2xl">
              <h3
                style={{ color: "#ffffff" }}
                className="font-heading font-bold text-2xl md:text-[32px] leading-tight mb-7 max-w-xl"
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {btn1Text && (
                  <Link
                    href={btn1Url}
                    className="group inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-medium text-sm rounded-xl hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-300"
                  >
                    {btn1Text}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {btn2Text && (
                  <Link
                    href={btn2Url}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm text-white font-medium text-sm rounded-xl border border-white/25 hover:bg-white/20 hover:border-white/40 transition-colors"
                  >
                    {btn2Text}
                  </Link>
                )}
              </div>
            </div>
          </div>,
        );
        continue;
      }

      elements.push(
        <div
          key={`banner-${i}`}
          className="my-12 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20 border border-glass-border p-8 md:p-10"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h3 className="font-heading font-bold text-2xl md:text-[28px] text-heading leading-tight mb-6 max-w-xl">
                {title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {btn1Text && (
                  <Link
                    href={btn1Url}
                    className="group inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-medium text-sm rounded-xl hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-300"
                  >
                    {btn1Text}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {btn2Text && (
                  <Link
                    href={btn2Url}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-black/10 dark:bg-white/10 text-body dark:text-white font-medium text-sm rounded-xl border border-black/20 dark:border-white/20 hover:bg-black/15 dark:hover:bg-white/15 hover:border-black/30 dark:hover:border-white/30 transition-colors"
                  >
                    {btn2Text}
                  </Link>
                )}
              </div>
            </div>
            {image && (
              <div className="relative hidden md:block">
                <img
                  src={image}
                  alt={title}
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                />
              </div>
            )}
          </div>
        </div>,
      );
      continue;
    }

    // Highlight block — large emphasized stat with growth-style visual
    if (trimmed === "<!-- highlight -->") {
      const buf: string[] = [];
      i++;
      while (i < lines.length) {
        const hl = lines[i].trim();
        if (hl === "<!-- /highlight -->") {
          i++;
          break;
        }
        if (hl) buf.push(hl);
        i++;
      }
      const text = buf.join(" ");
      const numMatch = text.match(/^\*\*([^*]+)\*\*\s*(.*)/);
      const bigNum = numMatch ? numMatch[1] : "";
      const rest = numMatch ? numMatch[2] : text;

      elements.push(
        <div
          key={`highlight-${i}`}
          className="my-12 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/8 via-[#8B5CF6]/6 to-[#06B6D4]/8 border border-[#3B82F6]/20 p-6 md:p-8"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#3B82F6]/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#8B5CF6]/15 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {bigNum && (
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/40 to-[#8B5CF6]/40 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex flex-col items-center justify-center shadow-xl shadow-[#3B82F6]/30">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white/80 mb-1" />
                  <div className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight">
                    {bigNum}
                  </div>
                </div>
              </div>
            )}
            <p className="font-heading font-semibold text-lg md:text-2xl text-heading leading-tight tracking-[-0.01em]">
              {renderInline(rest)}
            </p>
          </div>
        </div>,
      );
      continue;
    }

    // Chart block — horizontal bar chart
    // <!-- chart: Заголовок --> then `* Подпись | 3500 | 3–4 млрд ₽`
    const chartMatch = trimmed.match(/^<!--\s*chart:\s*(.+?)\s*-->$/);
    if (chartMatch) {
      const title = chartMatch[1];
      const bars: { label: string; value: number; display: string }[] = [];
      let caption = "";
      i++;
      while (i < lines.length) {
        const cl = lines[i].trim();
        if (cl === "<!-- /chart -->") {
          i++;
          break;
        }
        const capMatch = cl.match(/^>\s*(.+)$/);
        const barMatch = cl.match(/^[*-]\s+(.+?)\s*\|\s*([\d.,]+)\s*\|\s*(.+)$/);
        if (barMatch) {
          bars.push({
            label: barMatch[1].trim(),
            value: parseFloat(barMatch[2].replace(",", ".")),
            display: barMatch[3].trim(),
          });
        } else if (capMatch) {
          caption = capMatch[1].trim();
        }
        i++;
      }
      const max = Math.max(...bars.map((b) => b.value), 1);

      elements.push(
        <figure
          key={`chart-${i}`}
          className="my-8 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6 md:p-7"
        >
          <figcaption className="flex items-center gap-2.5 mb-6">
            <BarChart3 className="w-4 h-4 text-[#60A5FA] shrink-0" />
            <span className="font-heading font-semibold text-sm md:text-base text-heading leading-snug">
              {title}
            </span>
          </figcaption>
          <div className="space-y-4">
            {bars.map((b, bi) => (
              <div key={bi}>
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="text-sm text-body leading-snug">
                    {b.label}
                  </span>
                  <span className="text-sm font-heading font-semibold gradient-text whitespace-nowrap shrink-0">
                    {b.display}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-overlay-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                    style={{ width: `${Math.max((b.value / max) * 100, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {caption && (
            <p className="text-xs text-dim mt-5 leading-relaxed">{caption}</p>
          )}
        </figure>,
      );
      continue;
    }

    // Testimonials block — client reviews (mirrors the home page)
    if (trimmed === "<!-- testimonials -->") {
      i++;
      while (i < lines.length && lines[i].trim() !== "<!-- /testimonials -->") {
        i++;
      }
      if (i < lines.length) i++;

      const blogTestimonials = [
        {
          quote:
            "Запуск прошёл быстро и без лишней бюрократии. Поддержка реагирует оперативно, внедрение проходит в диалоге: нас слушают и предлагают решения. Видно постоянное развитие сервиса — новые функции выходят регулярно. Для нас это надёжный технологический партнёр и трамплин для роста. Тандем — 100%.",
          company: "РЭЙД-21",
          industry: "FMCG",
          logo: "/logos/raid-fav.svg",
        },
        {
          quote:
            "Нас хвалят партнёры, нас копируют конкуренты. Работы впереди много, но у нас крепкий тандем с разработчиками — мы постоянно в креативе и движении. Клиенты отмечают, что по удобству интерфейса мы не уступаем маркетплейсам, а в ряде сценариев превосходим их за счёт отраслевых функций. Спасибо за профессионализм и ответственность. Так держать!",
          company: "ХОГАРТ",
          industry: "Сантехника",
          logo: "/logos/hogart-fav.svg",
        },
        {
          quote:
            "Выбрали вас благодаря адекватной цене, сильной поддержке, заметному портфелю клиентов и опыту команды — и ни разу не пожалели. Платформа даёт нам постоянный доступ к складу и стала обязательным инструментом продаж. Отдельная благодарность службе поддержки — реагируют оперативно, задачи доводят до результата.",
          company: "ПРОТЭК",
          industry: "Безопасность",
          logo: "/logos/protek-fav.svg",
        },
        {
          quote:
            "Нравится, что можем гибко управлять ассортиментом: запускать акции, улучшать контент и оперативно обновлять наличие. Работа менеджера — 5/5: на связи, быстро реагирует, помогает с внедрением и доработками. Мы не просто быстрее оформляем заказы, а получаем новые возможности для роста и удержания клиентов.",
          company: "Древиз",
          industry: "Мебель",
          logo: "/logos/dreviz-fav.svg",
        },
        {
          quote:
            "Мы искали не просто «коробку», а комплексный подход. И нам предложили именно это: глубокий анализ наших процессов и адаптацию системы под реальные нужды. Уже на этапе демонстрации мы увидели не список функций, а решение конкретных задач. Для нас платформа стала мощным конкурентным преимуществом. А еще для нас скорость реакции и клиентоориентированность важны так же сильно, как и технические возможности системы. Коллеги полностью оправдывают наши ожидания.",
          company: "Санлайт",
          industry: "Светотехника",
          logo: "/logos/sanlight-fav.svg",
        },
        {
          quote:
            "При выборе решения для автоматизации оптовых продаж мы ориентировались на два ключевых фактора: скорость запуска и наличие у разработчика успешных кейсов именно в нашей отрасли. Платформа B2B Движение полностью соответствовала этим критериям. На данный момент мы перевели часть клиентов на самообслуживание через платформу, что позволило существенно снизить операционную нагрузку на менеджеров.",
          company: "Авента",
          industry: "Электротехника",
          logo: "/logos/aventa-fav.svg",
        },
      ];

      elements.push(
        <div
          key={`testimonials-${i}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8"
        >
          {blogTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-6 overflow-hidden hover:border-[#3B82F6]/25 transition-colors"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] opacity-70 group-hover:opacity-100 transition-opacity" />
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#3B82F6]/10 group-hover:text-[#3B82F6]/15 transition-colors" />
              <blockquote className="relative pl-3">
                <p className="text-sm md:text-base text-body leading-relaxed mb-5 italic">
                  «{t.quote}»
                </p>
                <footer className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={t.logo}
                      alt={t.company}
                      className="w-full h-full object-contain dark:invert opacity-70"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-heading font-semibold text-sm text-heading">
                      {t.company}
                    </div>
                    <div className="text-xs text-dim">{t.industry}</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>,
      );
      continue;
    }

    // Bignum — large emphasized stat without any card frame
    // <!-- bignum --> **9,3 млн** подпись... <!-- /bignum -->
    if (trimmed === "<!-- bignum -->") {
      const buf: string[] = [];
      i++;
      while (i < lines.length) {
        const bl = lines[i].trim();
        if (bl === "<!-- /bignum -->") {
          i++;
          break;
        }
        if (bl) buf.push(bl);
        i++;
      }
      const text = buf.join(" ");
      const numMatch = text.match(/^\*\*([^*]+)\*\*\s*(.*)/);
      const bigNum = numMatch ? numMatch[1] : text;
      const rest = numMatch ? numMatch[2] : "";

      elements.push(
        <div
          key={`bignum-${i}`}
          className="my-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-7"
        >
          <div className="font-heading font-bold text-5xl md:text-7xl gradient-text leading-none tracking-tight shrink-0">
            {bigNum}
          </div>
          {rest && (
            <p className="text-lg md:text-xl text-subheading leading-snug sm:border-l sm:border-border-subtle sm:pl-7">
              {renderInline(rest)}
            </p>
          )}
        </div>,
      );
      continue;
    }

    // Brand card — logo + name + short description, floated beside the text
    // <!-- brand: /logo.png | Название | Краткое описание -->
    const brandMatch = trimmed.match(
      /^<!--\s*brand:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*-->$/,
    );
    if (brandMatch) {
      elements.push(
        <aside
          key={i}
          className="mb-4 w-full sm:float-left sm:mr-6 sm:mb-3 sm:w-60 rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] p-5"
        >
          <span className="inline-flex items-center justify-center h-11 px-4 rounded-lg bg-white border border-gray-200 shadow-sm mb-3">
            <img
              src={brandMatch[1]}
              alt={brandMatch[2]}
              className="h-6 w-auto object-contain"
            />
          </span>
          <div className="font-heading font-semibold text-sm text-heading mb-1">
            {brandMatch[2]}
          </div>
          <p className="text-xs text-dim leading-relaxed">{brandMatch[3]}</p>
        </aside>,
      );
      i++;
      continue;
    }

    // Logo badge — company logo on a white pill, readable in any theme
    // <!-- logo: /path.png | Название -->
    const logoMatch = trimmed.match(/^<!--\s*logo:\s*(.+?)\s*\|\s*(.+?)\s*-->$/);
    if (logoMatch) {
      elements.push(
        <div key={i} className="my-5">
          <span className="inline-flex items-center justify-center h-14 px-6 rounded-xl bg-white border border-gray-200 dark:border-white/10 shadow-sm">
            <img
              src={logoMatch[1]}
              alt={logoMatch[2]}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </span>
        </div>,
      );
      i++;
      continue;
    }

    // Image band — fixed-height cropped cover image (good for tall photos)
    // <!-- band: /path.jpg | подпись -->
    const bandMatch = trimmed.match(/^<!--\s*band:\s*(.+?)\s*\|\s*(.+?)\s*-->$/);
    if (bandMatch) {
      elements.push(
        <figure key={i} className="my-8">
          <div className="relative w-full h-52 md:h-64 rounded-xl overflow-hidden border border-border-subtle">
            <img
              src={bandMatch[1]}
              alt={bandMatch[2]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {bandMatch[2] && (
            <figcaption className="text-xs text-dim mt-2 text-center">
              {bandMatch[2]}
            </figcaption>
          )}
        </figure>,
      );
      i++;
      continue;
    }

    // Raw image — full-width <img> without figure wrapper, border or rounded corners
    const rawImgMatch = trimmed.match(/^<!--\s*raw-image:\s*(.+?)\s*-->$/);
    if (rawImgMatch) {
      elements.push(
        <img
          key={i}
          src={rawImgMatch[1]}
          alt=""
          className="block w-full my-8"
        />,
      );
      i++;
      continue;
    }

    // Stages block — сдержанный текстовый список этапов (цветом подсвечено только название)
    // <!-- stages --> then `* red | Регистрация | Короткое описание` <!-- /stages -->
    if (trimmed === "<!-- stages -->") {
      const stages: { color: string; name: string; desc: string }[] = [];
      i++;
      while (i < lines.length) {
        const sl = lines[i].trim();
        if (sl === "<!-- /stages -->") {
          i++;
          break;
        }
        const m = sl.match(/^[*-]\s+(\w+)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
        if (m) stages.push({ color: m[1], name: m[2], desc: m[3] });
        i++;
      }
      elements.push(
        <div
          key={`stages-${i}`}
          className="my-8 border-y border-gray-100 dark:border-white/[0.06] divide-y divide-gray-100 dark:divide-white/[0.06]"
        >
          {stages.map((s, si) => {
            const c = stageColor(s.color);
            return (
              <div key={si} className="flex items-baseline gap-3.5 py-3">
                <span
                  className="shrink-0 w-2.5 h-2.5 rounded-full translate-y-1"
                  style={{ background: c.hex }}
                />
                <p className="text-body leading-relaxed">
                  <span className="font-heading font-semibold text-subheading">
                    {s.name}
                  </span>
                  <span className="text-dim"> — {s.desc}</span>
                </p>
              </div>
            );
          })}
        </div>,
      );
      continue;
    }

    // Roadmap block — горизонтальная дорожная карта из 5 цветных точек
    // <!-- roadmap --> then `* red | Регистрация | 1. Красный: Регистрация` <!-- /roadmap -->
    // Третье поле (необязательное) — текст заголовка раздела, к которому скроллит клик по точке.
    if (trimmed === "<!-- roadmap -->") {
      const stops: { color: string; label: string; anchor?: string }[] = [];
      i++;
      while (i < lines.length) {
        const rl = lines[i].trim();
        if (rl === "<!-- /roadmap -->") {
          i++;
          break;
        }
        const m = rl.match(/^[*-]\s+(\w+)\s*\|\s*(.+?)(?:\s*\|\s*(.+))?$/);
        if (m)
          stops.push({
            color: m[1],
            label: m[2],
            anchor: m[3] ? slugify(m[3]) : undefined,
          });
        i++;
      }
      const gradient = `linear-gradient(90deg, ${stops
        .map((s) => stageColor(s.color).hex)
        .join(", ")})`;
      elements.push(
        <div
          key={`roadmap-${i}`}
          className="my-12 relative flex justify-between items-start"
        >
          {/* Соединительная линия за точками — во всю ширину текстовой колонки */}
          <div
            className="absolute top-3 md:top-4 left-[10%] right-[10%] h-1 rounded-full opacity-80"
            style={{ background: gradient }}
          />
          {stops.map((s, si) => {
            const c = stageColor(s.color);
            const dot = (
              <>
                <span
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white dark:border-[#0B1020] flex items-center justify-center text-white font-heading font-bold text-[10px] md:text-xs transition-transform duration-300 group-hover:scale-125"
                  style={{
                    background: c.hex,
                    boxShadow: `0 0 0 4px ${c.hex}33, 0 6px 16px ${c.hex}55`,
                  }}
                >
                  {si + 1}
                </span>
                <span
                  className="text-[11px] md:text-sm font-semibold text-center leading-tight transition-opacity group-hover:opacity-80"
                  style={{ color: c.hex }}
                >
                  {s.label}
                </span>
              </>
            );
            const cls =
              "relative z-10 flex flex-col items-center gap-3 flex-1 group";
            return s.anchor ? (
              <a key={si} href={`#${s.anchor}`} className={`${cls} cursor-pointer`}>
                {dot}
              </a>
            ) : (
              <div key={si} className={`${cls} cursor-default`}>
                {dot}
              </div>
            );
          })}
        </div>,
      );
      continue;
    }

    // Indicator block — мини-прогресс из 5 сегментов, подсвечивает активный этап
    // <!-- indicator: 3 -->
    const indicatorMatch = trimmed.match(/^<!--\s*indicator:\s*(\d)\s*-->$/);
    if (indicatorMatch) {
      const active = parseInt(indicatorMatch[1], 10);
      const cur = STAGE_COLORS[Math.min(Math.max(active, 1), 5) - 1];
      elements.push(
        <div
          key={`indicator-${i}`}
          className="my-6 flex items-center gap-4 flex-wrap"
        >
          <div className="flex-1 min-w-[180px] grid grid-cols-5 gap-1.5">
            {STAGE_COLORS.map((s, si) => {
              const done = si <= active - 1;
              return (
                <span
                  key={si}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    background: s.hex,
                    opacity: done ? 1 : 0.16,
                  }}
                />
              );
            })}
          </div>
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full"
            style={{ background: `${cur.hex}1A`, color: cur.hex }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: cur.hex }}
            />
            Этап {active} из 5 · {cur.name}
          </span>
        </div>,
      );
      i++;
      continue;
    }

    // Checklist block — сдержанный текстовый чек-лист (акцент этапа — только точка у заголовка)
    // <!-- checklist: red | Чек-лист первого этапа --> then `1. Пункт` <!-- /checklist -->
    const checklistMatch = trimmed.match(
      /^<!--\s*checklist:\s*(\w+)\s*\|\s*(.+?)\s*-->$/,
    );
    if (checklistMatch) {
      const c = stageColor(checklistMatch[1]);
      const title = checklistMatch[2];
      const items: string[] = [];
      i++;
      while (i < lines.length) {
        const cl = lines[i].trim();
        if (cl === "<!-- /checklist -->") {
          i++;
          break;
        }
        const m = cl.match(/^\d+\.\s+(.*)/);
        if (m) items.push(m[1]);
        i++;
      }
      elements.push(
        <div key={`checklist-${i}`} className="my-8">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: c.hex }}
            />
            <h4 className="font-heading font-semibold text-base text-subheading">
              {title}
            </h4>
          </div>
          <ol className="space-y-2 ml-0.5">
            {items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-body leading-relaxed">
                <span className="shrink-0 w-5 text-right tabular-nums text-dim">
                  {ii + 1}.
                </span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        </div>,
      );
      continue;
    }

    // Challenge block — сноска «Основная сложность» цветной карточкой этапа
    // <!-- challenge: red --> **Основная сложность:** ... <!-- /challenge -->
    const challengeMatch = trimmed.match(/^<!--\s*challenge:\s*(\w+)\s*-->$/);
    if (challengeMatch) {
      const c = stageColor(challengeMatch[1]);
      const buf: string[] = [];
      i++;
      while (i < lines.length) {
        const cl = lines[i].trim();
        if (cl === "<!-- /challenge -->") {
          i++;
          break;
        }
        if (cl) buf.push(cl);
        i++;
      }
      const text = buf.join(" ").replace(/^«\s*/, "").replace(/\s*»$/, "");
      elements.push(
        <div
          key={`challenge-${i}`}
          className="my-8 flex items-start gap-4 rounded-2xl p-5 md:p-6"
          style={{
            background: `${c.hex}0F`,
            border: `1px solid ${c.hex}33`,
            borderLeft: `4px solid ${c.hex}`,
          }}
        >
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${c.hex}1F` }}
          >
            <AlertTriangle className="w-[18px] h-[18px]" style={{ color: c.hex }} />
          </span>
          <p className="text-[15px] md:text-base text-body leading-relaxed">
            {renderInline(text)}
          </p>
        </div>,
      );
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
        <div
          key={i}
          id={slugify(text)}
          className="clear-both mt-14 mb-6 first:mt-0 scroll-mt-24"
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-heading tracking-[-0.02em]">
            {text}
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full" />
        </div>,
      );
      i++;
      continue;
    }

    // ### Numbered heading — card with number badge
    if (trimmed.startsWith("### ")) {
      const raw = trimmed.replace("### ", "");
      const numMatch = raw.match(/^(\d+)\.\s*(.*)/);
      if (numMatch) {
        const headingId = slugify(`${numMatch[1]}. ${numMatch[2]}`);
        elements.push(
          <div
            key={i}
            id={headingId}
            className="clear-both flex items-start gap-4 mt-10 mb-4 scroll-mt-24"
          >
            <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-heading font-bold text-sm shadow-lg shadow-[#3B82F6]/20">
              {numMatch[1]}
            </span>
            <h3 className="font-heading font-semibold text-xl text-heading pt-1.5">
              {numMatch[2]}
            </h3>
          </div>,
        );
      } else {
        elements.push(
          <h3
            key={i}
            id={slugify(raw)}
            className="clear-both font-heading font-semibold text-lg text-subheading mt-8 mb-3 scroll-mt-24"
          >
            {raw}
          </h3>,
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
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="w-full rounded-xl border border-border-subtle"
          />
          {imgMatch[1] && (
            <figcaption className="text-xs text-dim mt-2 text-center">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>,
      );
      i++;
      continue;
    }

    // Table rows (start with |)
    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith("|")) {
          const cells = l
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
          rows.push(cells);
          i++;
        } else break;
      }
      // Remove separator row (contains ---)
      const dataRows = rows.filter(
        (row) => !row.every((cell) => /^[-:| ]*$/.test(cell)),
      );
      if (dataRows.length > 0) {
        const headers = dataRows[0];
        const bodyRows = dataRows.slice(1);
        elements.push(
          <div
            key={`table-${i}`}
            className="my-6 overflow-x-auto rounded-xl border border-border-subtle"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10">
                  {headers.map((h, ci) => (
                    <th
                      key={ci}
                      className="text-left px-4 py-3 font-heading font-semibold text-subheading whitespace-nowrap"
                    >
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={
                      ri % 2 === 0 ? "bg-gray-50/50 dark:bg-white/[0.01]" : ""
                    }
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-body leading-relaxed"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }
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
            <li
              key={item.key}
              className="flex items-start gap-3 text-body leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Blockquote / quote with person
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }

      // Separate quote text and attribution
      let quoteText = "";
      let authorName = "";
      let authorRole = "";
      for (const ql of quoteLines) {
        if (ql.startsWith("— ") || ql.startsWith("- ") || ql.startsWith("– ")) {
          const attr = ql.replace(/^[—–-]\s*/, "").replace(/\*\*/g, "");
          const commaIdx = attr.indexOf(",");
          if (commaIdx !== -1) {
            authorName = attr.slice(0, commaIdx).trim();
            authorRole = attr.slice(commaIdx + 1).trim();
          } else {
            authorName = attr.trim();
          }
        } else {
          const cleaned = ql
            .replace(/^\*\*Цитата:\*\*\s*/, "")
            .replace(/^«|»$/g, "");
          quoteText += (quoteText ? " " : "") + cleaned;
        }
      }

      // Strip surrounding quotes if present
      quoteText = quoteText.replace(/^«\s*/, "").replace(/\s*»$/, "");

      const personMap: Record<string, { photo: string; role: string }> = {
        "Артём Старченко": {
          photo: "/team/Artem.png",
          role: "Основатель компании и директор",
        },
        "Артем Старченко": {
          photo: "/team/Artem.png",
          role: "Основатель компании и директор",
        },
        "Екатерина Масленникова": {
          photo: "/team/Kate.png",
          role: "Руководитель B2B-проектов",
        },
        "Екатерина Масленикова": {
          photo: "/team/Kate.png",
          role: "Руководитель B2B-проектов",
        },
        "Дмитрий Агеев": {
          photo: "/team/dmitriy.png",
          role: "Руководитель отдела продаж",
        },
        "Елена Головина": { photo: "/team/Elena.png", role: "Автор, редактор" },
        "Илья Долгов": { photo: "/team/Ilya.png", role: "Ведущий дизайнер" },
      };

      const person = personMap[authorName];

      elements.push(
        <div
          key={`quote-${i}`}
          className="my-8 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 border border-gray-200 dark:border-white/[0.06] p-6 md:p-8"
        >
          <Quote className="w-8 h-8 text-[#3B82F6]/20 mb-4" />
          <p className="text-base md:text-lg text-body leading-relaxed italic mb-5">
            «{quoteText}»
          </p>
          {authorName && (
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-white/[0.06]">
              {person?.photo && (
                <img
                  src={person.photo}
                  alt={authorName}
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#3B82F6]/20 shrink-0"
                />
              )}
              <div>
                <div className="font-heading font-semibold text-sm text-heading">
                  {authorName}
                </div>
                <div className="text-xs text-dim">
                  {person?.role || authorRole}
                </div>
              </div>
            </div>
          )}
        </div>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-body leading-relaxed mb-4">
        {renderInline(trimmed)}
      </p>,
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
        <strong key={i} className="text-subheading font-semibold">
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
      const href = linkMatch[2];
      const isInternal = href.startsWith("/") || href.startsWith("#");
      return (
        <a
          key={i}
          href={href}
          {...(isInternal
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-2 decoration-[#3B82F6]/30 hover:decoration-[#3B82F6]/60 transition-colors"
        >
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
        <h2
          key={i}
          className="font-heading font-semibold text-lg text-heading mt-8 mb-3"
        >
          {trimmed.replace("## ", "")}
        </h2>,
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-heading font-semibold text-base text-subheading mt-6 mb-2"
        >
          {trimmed.replace("### ", "")}
        </h3>,
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
            <li
              key={item.key}
              className="text-base text-body leading-relaxed list-disc marker:text-[#3B82F6]"
            >
              {renderInline(item.text)}
            </li>
          ))}
        </ul>,
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
        <ol
          key={`ol-${items[0].key}`}
          className="ml-4 space-y-1 mb-3"
          start={items[0].num}
        >
          {items.map((item) => (
            <li
              key={item.key}
              className="text-base text-body leading-relaxed list-decimal marker:text-[#3B82F6]"
            >
              {renderInline(item.text)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    elements.push(
      <p key={i} className="text-base text-body leading-relaxed mb-3">
        {renderInline(trimmed)}
      </p>,
    );
    i++;
  }

  return elements;
}
