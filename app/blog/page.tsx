import { getAllPosts } from "@/lib/content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Calendar, Play, BarChart3 } from "lucide-react"

export const metadata = {
  title: "Блог — B2B Движение",
  description: "Статьи о B2B-продажах, автоматизации и e-commerce для оптовых компаний.",
}

export default function BlogPage() {
  const posts = getAllPosts("blog")

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
              Блог
            </span>
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
              Статьи и <span className="gradient-text">материалы</span>
            </h1>
            <p className="mt-4 text-lg text-subtle max-w-xl">
              Делимся опытом автоматизации оптовых продаж, кейсами и полезными инструментами.
            </p>
          </div>

          {/* Posts */}
          <div className="flex flex-col gap-5">
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
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">Видео</span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-dim bg-overlay-3 px-2 py-0.5 rounded-full">Закреплено</span>
                  </div>
                  <h2 className="font-heading font-semibold text-xl text-heading mb-1 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                    В2В Движение — оптимальное решение для оптового бизнеса
                  </h2>
                  <p className="text-subtle leading-relaxed text-sm">
                    Практические подходы к организации B2B-взаимодействия и масштабированию оптовых продаж
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
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-full">Отчёт</span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-dim bg-overlay-3 px-2 py-0.5 rounded-full">Закреплено</span>
                  </div>
                  <h2 className="font-heading font-semibold text-xl text-heading mb-1 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                    B2B eCommerce Платформы: Россия vs Мировой рынок
                  </h2>
                  <p className="text-subtle leading-relaxed text-sm">
                    Комплексный обзор 13 платформ — функциональность, дизайн лендингов, цены и рекомендации
                  </p>
                </div>
              </div>
            </Link>

            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
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

                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-3 mb-4 text-xs text-dim">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>
                      {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    {post.author && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-dimmest" />
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>

                  <h2 className="font-heading font-semibold text-xl text-heading mb-2 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-subtle leading-relaxed mb-4">
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

          {posts.length === 0 && (
            <p className="text-center text-dim py-20">
              Пока нет статей. Скоро здесь появятся материалы.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
