"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import type { Post } from "@/lib/content"

const TAG_LABELS: Record<string, string> = {
  b2bmotion: "B2B Движение",
  новый_функционал: "Новый функционал",
  интеграции: "Интеграции",
  мобильная_версия: "Мобильная версия",
  mdm: "MDM",
}

export function NewsGrid({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const set = new Set<string>()
    for (const post of posts) {
      for (const tag of post.tags ?? []) set.add(tag)
    }
    return Array.from(set).sort(
      (a, b) =>
        posts.filter((p) => p.tags?.includes(b)).length -
        posts.filter((p) => p.tags?.includes(a)).length
    )
  }, [posts])

  const filtered = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-2 text-sm rounded-full border transition-colors duration-200 ${
            activeTag === null
              ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#C084FC]"
              : "border-white/[0.06] text-dim hover:text-body hover:border-white/10"
          }`}
        >
          Все
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`px-4 py-2 text-sm rounded-full border transition-colors duration-200 ${
              activeTag === tag
                ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#C084FC]"
                : "border-white/[0.06] text-dim hover:text-body hover:border-white/10"
            }`}
          >
            {TAG_LABELS[tag] || tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/news/${post.slug}`}
            className="group relative rounded-2xl glass-card overflow-hidden"
          >
            {post.image && (
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3 mb-3 text-xs text-dim">
                <Calendar className="w-3.5 h-3.5" />
                <time>
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h2 className="font-heading font-semibold text-lg text-heading mb-2 group-hover:text-[#8B5CF6] dark:group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-subtle leading-relaxed mb-4 text-sm line-clamp-2">
                {post.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C084FC] group-hover:gap-3 transition-all duration-300">
                Читать
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-dim py-16">
          Нет новостей по выбранной теме.
        </p>
      )}
    </>
  )
}
