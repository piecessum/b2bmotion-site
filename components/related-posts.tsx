"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
}

interface RelatedPostsProps {
  posts: Post[];
  currentSlug: string;
  currentTags?: string[];
  title?: string;
}

// «Читать ещё» — подборка других статей блога карточками с превью.
// Ранжирование: сначала по числу общих тегов, затем по свежести.
export function RelatedPosts({
  posts,
  currentSlug,
  currentTags = [],
  title = "Читать ещё",
}: RelatedPostsProps) {
  const others = posts.filter((p) => p.slug !== currentSlug);

  // Сначала 3 самых свежих
  const byDate = [...others].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latest = byDate.slice(0, 3);
  const taken = new Set(latest.map((p) => p.slug));

  // Затем 3 по смыслу (по числу общих тегов), исключая уже взятые
  const byTopic = others
    .filter((p) => !taken.has(p.slug))
    .map((p) => ({
      post: p,
      shared: (p.tags || []).filter((t) => currentTags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .slice(0, 3)
    .map((x) => x.post);

  const related = [...latest, ...byTopic];
  byTopic.forEach((p) => taken.add(p.slug));

  // Если связанных не хватило — добираем до 6 следующими по свежести
  if (related.length < 6) {
    for (const p of byDate) {
      if (taken.has(p.slug)) continue;
      related.push(p);
      taken.add(p.slug);
      if (related.length >= 6) break;
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="section-divider mb-8" />

      <h2 className="font-heading font-bold text-xl md:text-2xl text-heading mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative rounded-2xl glass-card overflow-hidden"
          >
            {post.image ? (
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              <div className="w-full h-44 bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20" />
            )}

            <div className="relative z-10 p-5">
              <div className="flex items-center gap-2 mb-2 text-[11px] text-dim">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <time className="whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h3 className="font-heading font-semibold text-base text-heading mb-2 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>

              <p className="text-subtle leading-relaxed mb-4 text-sm line-clamp-2">
                {post.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                Читать
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
