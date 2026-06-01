import { getAllAuthors, getAuthorBySlug } from "@/lib/authors";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";
import { Calendar, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

function pluralizeMaterials(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "материал";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return "материала";
  return "материалов";
}

export function generateStaticParams() {
  return getAllAuthors("blog").map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getAuthorBySlug("blog", slug);
  if (!data) return {};
  return {
    title: `${data.author.name} — статьи на B2B Движение`,
    description: `Все статьи и материалы автора ${data.author.name}.`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getAuthorBySlug("blog", slug);

  if (!data) notFound();

  const { author, entries } = data;

  const ctaLabel = (kind: string) =>
    kind === "Видео" ? "Смотреть" : kind === "Отчёт" ? "Открыть" : "Читать";

  const otherAuthors = getAllAuthors("blog").filter(
    (a) => a.slug !== author.slug,
  );

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            Блог
          </BackButton>

          {/* Author header */}
          <div className="mb-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 border border-gray-200 dark:border-white/[0.06] p-6 md:p-8">
            <div className="flex items-start gap-5">
              {author.photo && (
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top border-2 border-[#3B82F6]/20 shrink-0"
                />
              )}
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#60A5FA] mb-1">
                  Автор
                </div>
                <h1 className="font-heading font-bold text-[clamp(24px,4vw,36px)] tracking-[-0.02em] text-heading mb-1">
                  {author.name}
                </h1>
                <p className="text-sm font-medium text-subtle mb-2">
                  {author.role}
                </p>
                {author.bio && (
                  <p className="text-sm text-dim leading-relaxed">
                    {author.bio}
                  </p>
                )}
                <p className="mt-3 text-xs text-dim">
                  {author.postCount} {pluralizeMaterials(author.postCount)}
                </p>
              </div>
            </div>
          </div>

          {/* Materials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {entries.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="group relative rounded-2xl glass-card overflow-hidden"
              >
                {entry.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3 text-[11px] sm:text-xs text-dim">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <time className="whitespace-nowrap">
                      {new Date(entry.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-dimmest shrink-0" />
                    <span className="whitespace-nowrap">{entry.kind}</span>
                  </div>

                  <h2 className="font-heading font-semibold text-lg text-heading mb-2 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug">
                    {entry.title}
                  </h2>

                  <p className="text-subtle leading-relaxed mb-4 text-sm line-clamp-2">
                    {entry.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                    {ctaLabel(entry.kind)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Other authors */}
          {otherAuthors.length > 0 && (
            <div className="mt-20">
              <h2 className="font-heading font-bold text-xl text-heading mb-6">
                Другие авторы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherAuthors.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/author/${a.slug}`}
                    className="group relative flex items-center gap-4 rounded-2xl glass-card p-5 transition-colors hover:border-[#3B82F6]/30"
                  >
                    {a.photo && (
                      <img
                        src={a.photo}
                        alt={a.name}
                        className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#3B82F6]/20 shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-base text-heading group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors truncate">
                        {a.name}
                      </h3>
                      <p className="text-xs text-subtle truncate">{a.role}</p>
                      <p className="mt-1 text-[11px] text-dim">
                        {a.postCount} {pluralizeMaterials(a.postCount)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-dim group-hover:text-[#60A5FA] shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
