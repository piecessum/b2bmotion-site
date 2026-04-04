import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Link2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { wikiFunctionArticles } from "@/lib/wiki-function-data";
import { RichTextRenderer } from "@/components/wiki/rich-text-renderer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface WikiFunctionArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return wikiFunctionArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function WikiFunctionArticlePage({
  params,
}: WikiFunctionArticlePageProps) {
  const { slug } = await params;
  const article = wikiFunctionArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Find related articles by same category (max 4, exclude current)
  const relatedArticles = wikiFunctionArticles
    .filter(
      (a) =>
        a.category === article.category &&
        a.slug !== article.slug &&
        a.text.length > 0,
    )
    .slice(0, 4);

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Back button */}
        <Link
          href="/wiki"
          className="inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            База знаний
          </span>
        </Link>

        {/* Category badge */}
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] mb-4 block">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="font-heading font-bold text-[clamp(28px,4vw,40px)] leading-[1.2] tracking-[-0.025em] text-heading mb-8">
          {article.title}
        </h1>

        {/* Hero image */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-inner mb-10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Rich text content */}
        <RichTextRenderer content={article.text} />

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-glass-border">
            <h2 className="font-heading font-semibold text-xl text-heading mb-6 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#60A5FA]" />
              Похожие статьи
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/wiki/function/${related.slug}`}
                  className="group flex gap-4 p-4 rounded-xl bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/20 transition-all duration-300"
                >
                  <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-surface-inner">
                    <Image
                      src={related.image}
                      alt={related.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] block mb-1">
                      {related.category}
                    </span>
                    <p className="text-sm text-heading font-medium line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                      {related.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
