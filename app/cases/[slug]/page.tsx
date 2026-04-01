import { getAllPosts, getPostBySlug } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RelatedCases } from "@/components/related-cases";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  CheckCircle2,
  Quote,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function generateStaticParams() {
  const posts = getAllPosts("blog");
  const caseStudies = posts.filter(
    (post) => post.tags?.includes("кейс") || post.slug.startsWith("keis-"),
  );
  return caseStudies.map((post) => ({ slug: post.slug }));
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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  // Get all case studies for related section
  const allPosts = getAllPosts("blog");
  const caseStudies = allPosts.filter(
    (p) => p.tags?.includes("кейс") || p.slug.startsWith("keis-"),
  );

  // Parse frontmatter data
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
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все кейсы
          </Link>

          {/* Hero Header */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              {logo && (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="h-10 w-auto object-contain opacity-80 dark:invert"
                  />
                </div>
              )}
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] bg-[#3B82F6]/10 px-3 py-1 rounded-full">
                  {clientInfo?.industry || post.tags?.[1] || "Кейс"}
                </span>
              </div>
            </div>

            <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-heading leading-tight mb-6">
              {post.title.replace("Кейс: ", "")}
            </h1>

            <p className="text-xl text-subtle leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Date and type */}
            <div className="flex items-center gap-3 text-sm text-dim">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/10 p-4 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-heading font-bold text-[#60A5FA] mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-dim leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </header>

          {/* Cover image */}
          {post.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-12">
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
            <section className="mb-16">
              <div className="rounded-2xl glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-5 h-5 text-[#60A5FA]" />
                  <h2 className="font-heading font-semibold text-xl text-heading">
                    О клиенте
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {clientInfo.name && (
                    <div className="flex gap-3">
                      <Building2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-dim mb-1">Компания</div>
                        <div className="text-body font-medium">
                          {clientInfo.name}
                        </div>
                      </div>
                    </div>
                  )}
                  {clientInfo.location && (
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-dim mb-1">Локация</div>
                        <div className="text-body">{clientInfo.location}</div>
                      </div>
                    </div>
                  )}
                  {clientInfo.founded && (
                    <div className="flex gap-3">
                      <Calendar className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-dim mb-1">
                          Год основания
                        </div>
                        <div className="text-body">{clientInfo.founded}</div>
                      </div>
                    </div>
                  )}
                  {clientInfo.clients && (
                    <div className="flex gap-3">
                      <Users className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-dim mb-1">Клиентов</div>
                        <div className="text-body">{clientInfo.clients}</div>
                      </div>
                    </div>
                  )}
                </div>

                {clientInfo.brands && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex gap-3">
                      <Package className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-dim mb-1">
                          Бренды в портфеле
                        </div>
                        <div className="text-body">{clientInfo.brands}</div>
                      </div>
                    </div>
                  </div>
                )}

                {clientInfo.branches && (
                  <div className="mt-4">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-body">{clientInfo.branches}</div>
                      </div>
                    </div>
                  </div>
                )}

                {clientInfo.businessModel && (
                  <div className="mt-6 p-4 rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/10">
                    <div className="text-xs text-dim mb-1">Бизнес-модель</div>
                    <div className="text-body">{clientInfo.businessModel}</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Problems Block */}
          {problems.length > 0 && (
            <section className="mb-16">
              <div className="rounded-2xl glass-card p-8">
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">
                  Задача и боли до внедрения
                </h2>

                <ul className="space-y-3">
                  {problems.map((problem: string, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-red-400 shrink-0 mt-0.5">•</span>
                      <span className="text-body">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Solution Block */}
          {solution.length > 0 && (
            <section className="mb-16">
              <div className="rounded-2xl glass-card p-8">
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">
                  Решение
                </h2>

                <ul className="space-y-3">
                  {solution.map((sol: string, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-body">{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Results Block */}
          {results.length > 0 && (
            <section className="mb-16">
              <div className="rounded-2xl glass-card p-8">
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">
                  Результаты
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-dim font-medium">
                          Показатель
                        </th>
                        <th className="text-left py-3 px-4 text-dim font-medium">
                          До
                        </th>
                        <th className="text-left py-3 px-4 text-dim font-medium">
                          После
                        </th>
                        <th className="text-left py-3 px-4 text-dim font-medium">
                          Изменение
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result: any, i: number) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-3 px-4 text-body">
                            {result.metric}
                          </td>
                          <td className="py-3 px-4 text-dim">
                            {result.before}
                          </td>
                          <td className="py-3 px-4 text-body">
                            {result.after}
                          </td>
                          <td className="py-3 px-4 text-[#10B981] font-medium">
                            {result.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Quote Block */}
          {quote && (
            <section className="mb-16">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/15 via-[#8B5CF6]/10 to-[#06B6D4]/15" />
                <div className="absolute inset-0 border border-[#3B82F6]/20 rounded-2xl" />
                <div className="relative p-8 md:p-12">
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      <Quote className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <blockquote className="text-xl md:text-2xl font-heading font-medium text-heading text-center leading-relaxed mb-6 max-w-3xl mx-auto">
                    «{quote.text}»
                  </blockquote>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#60A5FA]" />
                    <cite className="text-sm font-medium text-[#60A5FA] not-italic uppercase tracking-[0.1em]">
                      {quote.author}
                    </cite>
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#60A5FA]" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Integrations Block */}
          {integrations.length > 0 && (
            <section className="mb-16">
              <div className="rounded-2xl glass-card p-8">
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">
                  Интеграции
                </h2>

                <ul className="space-y-3">
                  {integrations.map((integration: string, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-body">{integration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Content Body */}
          <div className="prose-custom">
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <br key={i} />;
              if (trimmed.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="font-heading font-semibold text-xl text-heading mt-10 mb-4"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              if (trimmed.startsWith("### "))
                return (
                  <h3
                    key={i}
                    className="font-heading font-semibold text-lg text-subheading mt-8 mb-3"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              if (trimmed.startsWith("- "))
                return (
                  <li
                    key={i}
                    className="text-body leading-relaxed ml-4 mb-1 list-disc marker:text-[#3B82F6]"
                  >
                    {renderInline(trimmed.replace("- ", ""))}
                  </li>
                );
              if (trimmed.startsWith("|")) {
                // Skip markdown tables as they're handled in structured blocks
                return null;
              }
              return (
                <p key={i} className="text-body leading-relaxed mb-4">
                  {renderInline(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Bottom divider */}
          <div className="section-divider mt-16 mb-10" />

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
            href="/cases"
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

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-subheading font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
