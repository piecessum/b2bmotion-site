import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WikiBreadcrumbs } from "@/components/wiki/wiki-breadcrumbs";
import {
  type WikiSection,
  type WikiCategory,
  type WikiGroup,
  categoryUrl,
} from "@/lib/wiki-tree";

/* ── Section view: lists groups → categories → articles ── */

export function WikiSectionView({ section }: { section: WikiSection }) {
  return (
    <article>
      <WikiBreadcrumbs items={[{ label: section.title }]} />

      <header className="mb-10">
        <span
          className="inline-block w-12 h-1 rounded-full mb-5"
          style={{ backgroundColor: section.accent }}
        />
        <h1 className="font-heading font-bold text-[clamp(26px,3.5vw,36px)] leading-[1.2] tracking-[-0.02em] text-heading mb-3">
          {section.title}
        </h1>
        <p className="text-base text-subtle max-w-2xl">{section.description}</p>
        <div className="mt-4 flex items-center gap-3 text-[12px] text-dim">
          <span className="tabular-nums">
            {section.articleCount} статей
          </span>
          <span>·</span>
          <span className="tabular-nums">
            {section.groups.length} групп
          </span>
        </div>
      </header>

      <div className="space-y-12">
        {section.groups.map((group) => (
          <GroupBlock key={group.id} section={section} group={group} />
        ))}
      </div>
    </article>
  );
}

function GroupBlock({
  section,
  group,
}: {
  section: WikiSection;
  group: WikiGroup;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-glass-border">
        <div>
          <h2 className="font-heading font-semibold text-lg text-heading">
            {group.title}
          </h2>
          {group.description && (
            <p className="text-[13px] text-subtle mt-1">{group.description}</p>
          )}
        </div>
        <span className="text-[11px] text-dim tabular-nums shrink-0">
          {group.articleCount} ст.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {group.categories.map((cat) => (
          <Link
            key={cat.id}
            href={categoryUrl(section.id, cat.id)}
            className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/30 hover:bg-overlay-4 transition-all"
          >
            <div className="min-w-0">
              <p className="font-medium text-[14px] text-heading group-hover:text-[#3B82F6] transition-colors truncate">
                {cat.title}
              </p>
              <p className="text-[11.5px] text-dim mt-0.5 tabular-nums">
                {cat.articles.length}{" "}
                {pluralizeArticles(cat.articles.length)}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-dim group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Category view: lists articles ── */

export function WikiCategoryView({
  section,
  group,
  category,
}: {
  section: WikiSection;
  group: WikiGroup;
  category: WikiCategory;
}) {
  return (
    <article>
      <WikiBreadcrumbs
        items={[
          { label: section.title, href: `/wiki/${section.id}` },
          { label: category.title },
        ]}
      />

      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-dim mb-2">
          {group.title}
        </p>
        <h1 className="font-heading font-bold text-[clamp(24px,3vw,32px)] leading-[1.2] tracking-[-0.02em] text-heading">
          {category.title}
        </h1>
        <p className="mt-2 text-[13px] text-dim tabular-nums">
          {category.articles.length}{" "}
          {pluralizeArticles(category.articles.length)} в этой категории
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {category.articles.map((article) => (
          <li key={article.id}>
            <Link
              href={article.url}
              className="group flex flex-col h-full rounded-2xl glass-card overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300"
            >
              {article.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-inner">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-heading font-semibold text-[15px] text-heading group-hover:text-[#3B82F6] transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-[12px] text-subtle leading-relaxed line-clamp-3 flex-1">
                  {article.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#3B82F6] opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  Читать
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function pluralizeArticles(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "статья";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "статьи";
  return "статей";
}
