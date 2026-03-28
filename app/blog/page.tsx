import { getAllPosts } from "@/lib/content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

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
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative p-8 rounded-2xl glass-card overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#3B82F6]/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
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

                  <h2 className="font-heading font-semibold text-xl text-heading mb-2 group-hover:text-white transition-colors">
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
