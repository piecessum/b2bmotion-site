"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Play, BarChart3 } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
}

interface BlogContentProps {
  posts: Post[];
  initialFilter: "all" | "cases";
}

const industries = [
  "Электротехника",
  "Сантехника",
  "FMCG",
  "Видеонаблюдение",
  "Стройматериалы",
  "Мебель",
  "Светотехника",
  "Серверные",
  "Металлопрокат",
];

export function BlogContent({ posts, initialFilter }: BlogContentProps) {
  const [filter, setFilter] = useState<"all" | "cases">(initialFilter);
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);

  const isCaseStudy = (post: Post) =>
    post.tags?.includes("кейс") || post.slug.startsWith("keis-");

  const getIndustry = (post: Post): string => {
    const industryMap: Record<string, string> = {
      электротехника: "Электротехника",
      сантехника: "Сантехника",
      fmcg: "FMCG",
      видеонаблюдение: "Видеонаблюдение",
      стройматериалы: "Стройматериалы",
      мебель: "Мебель",
      "мебельная фурнитура": "Мебель",
      светотехника: "Светотехника",
      "комплектующие для серверных": "Серверные",
      металлопрокат: "Металлопрокат",
    };
    const tag = post.tags?.find((t) => t !== "кейс");
    return tag ? industryMap[tag.toLowerCase()] || tag : "";
  };

  const filteredPosts =
    filter === "cases"
      ? posts.filter(isCaseStudy).filter((post) => {
          if (!industryFilter) return true;
          return getIndustry(post) === industryFilter;
        })
      : posts;

  return (
    <>
      {/* Main filter chips */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => {
            setFilter("all");
            setIndustryFilter(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            filter === "all"
              ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              : "bg-white/5 text-dim border-white/10 hover:bg-white/10 hover:text-body"
          }`}
        >
          Все
        </button>
        <button
          onClick={() => {
            setFilter("cases");
            setIndustryFilter(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            filter === "cases"
              ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              : "bg-white/5 text-dim border-white/10 hover:bg-white/10 hover:text-body"
          }`}
        >
          Кейсы
        </button>
      </div>

      {/* Industry filters (only show when cases is selected) */}
      {filter === "cases" && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setIndustryFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              industryFilter === null
                ? "bg-transparent text-[#8B5CF6] border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                : "bg-white/5 text-dim border-white/10 hover:bg-white/10 hover:text-body"
            }`}
          >
            Все отрасли
          </button>
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setIndustryFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                industryFilter === industry
                  ? "bg-transparent text-[#8B5CF6] border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  : "bg-white/5 text-dim border-white/10 hover:bg-white/10 hover:text-body"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      )}

      {/* Pinned (only show on "all" filter) */}
      {filter === "all" && (
        <div className="flex flex-col gap-5 mb-5">
          {/* Pinned video */}
          <Link
            href="/video"
            className="group relative p-8 rounded-2xl glass-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/[0.06] via-[#8B5CF6]/[0.04] to-[#06B6D4]/[0.06]" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">
                    Видео
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-dim bg-overlay-3 px-2 py-0.5 rounded-full">
                    Закреплено
                  </span>
                </div>
                <h2 className="font-heading font-semibold text-xl text-heading mb-1 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                  В2В Движение — оптимальное решение для оптового бизнеса
                </h2>
                <p className="text-subtle leading-relaxed text-sm">
                  Практические подходы к организации B2B-взаимодействия и
                  масштабированию оптовых продаж
                </p>
              </div>
            </div>
          </Link>

          {/* Pinned report */}
          <Link
            href="/blog/b2b-platforms-report"
            className="group relative p-8 rounded-2xl glass-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/[0.06] via-[#3B82F6]/[0.04] to-[#8B5CF6]/[0.06]" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-full">
                    Отчёт
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-dim bg-overlay-3 px-2 py-0.5 rounded-full">
                    Закреплено
                  </span>
                </div>
                <h2 className="font-heading font-semibold text-xl text-heading mb-1 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                  B2B eCommerce Платформы: Россия vs Мировой рынок
                </h2>
                <p className="text-subtle leading-relaxed text-sm">
                  Комплексный обзор 13 платформ — функциональность, дизайн
                  лендингов, цены и рекомендации
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={isCaseStudy(post) ? `/cases/${post.slug}` : `/blog/${post.slug}`}
            className="group relative rounded-2xl glass-card overflow-hidden"
          >
            {post.image && (
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3 mb-3 text-[11px] sm:text-xs text-dim">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <time className="whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full bg-dimmest shrink-0" />
                <span className="whitespace-nowrap">
                  {isCaseStudy(post) ? "История успеха" : "Публикация"}
                </span>
              </div>

              <h2 className="font-heading font-semibold text-lg text-heading mb-2 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h2>

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

      {filteredPosts.length === 0 && (
        <p className="text-center text-dim py-20">
          Пока нет материалов. Скоро здесь появятся статьи.
        </p>
      )}
    </>
  );
}
