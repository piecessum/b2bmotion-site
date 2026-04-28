import Link from "next/link";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { RichTextRenderer } from "@/components/wiki/rich-text-renderer";
import { WikiBreadcrumbs } from "@/components/wiki/wiki-breadcrumbs";
import {
  type SectionId,
  type WikiArticle,
  getSection,
  categoryUrl,
} from "@/lib/wiki-tree";

interface WikiArticleViewProps {
  article: WikiArticle;
  /** All articles within the same section (raw) for related */
  allArticlesInSection: Array<{
    slug: string;
    title: string;
    image: string;
    category: string;
    text: any[];
  }>;
}

export function WikiArticleView({
  article,
  allArticlesInSection,
}: WikiArticleViewProps) {
  const section = getSection(article.section)!;

  // Find category id (slug-style) by matching title
  const categoryCtx = section.groups
    .flatMap((g) => g.categories.map((c) => ({ group: g, category: c })))
    .find((x) => x.category.title === article.category);

  const related = allArticlesInSection
    .filter(
      (a) =>
        a.category === article.category &&
        a.slug !== article.slug &&
        a.text.length > 0,
    )
    .slice(0, 4);

  const relatedHrefBase = `/wiki/${article.section}`;

  const breadcrumbs = [
    { label: section.title, href: `/wiki/${section.id}` },
    ...(categoryCtx
      ? [
          {
            label: categoryCtx.category.title,
            href: categoryUrl(section.id, categoryCtx.category.id),
          },
        ]
      : []),
    { label: article.title },
  ];

  return (
    <article className="max-w-3xl">
      <WikiBreadcrumbs items={breadcrumbs} />

      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] mb-3 block">
        {article.category}
      </span>

      <h1 className="font-heading font-bold text-[clamp(26px,3.5vw,38px)] leading-[1.2] tracking-[-0.02em] text-heading mb-8">
        {article.title}
      </h1>

      {article.image && (
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-inner mb-10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <RichTextRenderer content={article.raw} />

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-glass-border">
          <h2 className="font-heading font-semibold text-xl text-heading mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#60A5FA]" />
            Похожие статьи
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`${relatedHrefBase}/${r.slug}`}
                className="group flex gap-4 p-4 rounded-xl bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/20 transition-all duration-300"
              >
                <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-surface-inner">
                  <Image
                    src={r.image}
                    alt={r.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] block mb-1">
                    {r.category}
                  </span>
                  <p className="text-sm text-heading font-medium line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                    {r.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export type { SectionId };
