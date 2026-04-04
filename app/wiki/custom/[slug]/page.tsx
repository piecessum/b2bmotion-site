import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { wikiCustomArticles } from "@/lib/wiki-custom-data";
import { RichTextRenderer } from "@/components/wiki/rich-text-renderer";

interface WikiArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return wikiCustomArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function WikiCustomArticlePage({
  params,
}: WikiArticlePageProps) {
  const { slug } = await params;
  const article = wikiCustomArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
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
      </div>
    </main>
  );
}
