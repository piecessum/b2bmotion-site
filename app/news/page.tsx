import { getAllPosts } from "@/lib/content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

export const metadata = {
  title: "Новости — B2B Движение",
  description: "Новости компании, обновления платформы и события отрасли.",
}

export default function NewsPage() {
  const posts = getAllPosts("news")

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#C084FC] bg-[#8B5CF6]/[0.06] border border-[#8B5CF6]/[0.1] rounded-full">
              Новости
            </span>
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
              Последние <span className="gradient-text">новости</span>
            </h1>
            <p className="mt-4 text-lg text-subtle max-w-xl">
              Обновления платформы, новые клиенты и события компании.
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group relative p-7 rounded-2xl glass-card overflow-hidden"
              >
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8B5CF6]/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-xs text-dim">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>
                      {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="font-heading font-semibold text-lg text-heading mb-2 group-hover:text-white transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-subtle leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C084FC] group-hover:gap-3 transition-all duration-300">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-dim py-20">
              Пока нет новостей. Скоро здесь появятся обновления.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
