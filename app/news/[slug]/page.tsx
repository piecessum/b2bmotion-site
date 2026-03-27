import { getAllPosts, getPostBySlug } from "@/lib/content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function generateStaticParams() {
  const posts = getAllPosts("news")
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug("news", slug)
  if (!post) return {}
  return {
    title: `${post.title} — B2B Движение`,
    description: post.description,
  }
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug("news", slug)

  if (!post) notFound()

  return (
    <main className="relative min-h-screen bg-[#06060A] noise-overlay">
      <Navbar />

      <article className="pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-[#52525B] hover:text-[#A1A1AA] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все новости
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4 text-xs text-[#52525B]">
              <Calendar className="w-3.5 h-3.5" />
              <time>
                {new Date(post.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-[#F5F5F5] leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-[#71717A]">{post.description}</p>
          </header>

          <div className="section-divider mb-12" />

          {/* Content */}
          <div className="prose-custom">
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim()
              if (!trimmed) return <br key={i} />
              if (trimmed.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="font-heading font-semibold text-xl text-[#F5F5F5] mt-10 mb-4"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                )
              if (trimmed.startsWith("### "))
                return (
                  <h3
                    key={i}
                    className="font-heading font-semibold text-lg text-[#E4E4E7] mt-8 mb-3"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                )
              if (trimmed.startsWith("- "))
                return (
                  <li
                    key={i}
                    className="text-[#A1A1AA] leading-relaxed ml-4 mb-1 list-disc marker:text-[#8B5CF6]"
                  >
                    {renderInline(trimmed.replace("- ", ""))}
                  </li>
                )
              return (
                <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4">
                  {renderInline(trimmed)}
                </p>
              )
            })}
          </div>

          <div className="section-divider mt-16 mb-10" />

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#C084FC] hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Все новости
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[#E4E4E7] font-medium">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
