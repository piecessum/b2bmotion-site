import { getAllPosts, getPostBySlug } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogBanner } from "@/components/blog-banner";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  const posts = getAllPosts("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);
  if (!post) return {};
  return {
    title: `${post.title} — B2B Движение`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <article className="pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4 text-xs text-dim">
              <Calendar className="w-3.5 h-3.5" />
              <time>
                {new Date(post.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-dimmest" />
              <span>
                {post.tags?.includes("кейс") || post.slug.startsWith("keis-")
                  ? "История успеха"
                  : "Публикация"}
              </span>
            </div>

            <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-heading leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-subtle">{post.description}</p>
          </header>

          {/* Cover image */}
          {post.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Divider */}
          <div className="section-divider mb-12" />

          {/* Content */}
          <div className="prose-custom">
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <br key={i} />;
              if (trimmed.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="font-heading font-semibold text-xl text-heading mt-10 mb-4"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              if (trimmed.startsWith("### "))
                return (
                  <h3
                    key={i}
                    className="font-heading font-semibold text-lg text-subheading mt-8 mb-3"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              if (trimmed.startsWith("- "))
                return (
                  <li
                    key={i}
                    className="text-body leading-relaxed ml-4 mb-1 list-disc marker:text-[#3B82F6]"
                  >
                    {renderInline(trimmed.replace("- ", ""))}
                  </li>
                );
              return (
                <p key={i} className="text-body leading-relaxed mb-4">
                  {renderInline(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Blog Banner */}
          <BlogBanner />

          {/* Bottom divider */}
          <div className="section-divider mt-16 mb-10" />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-subheading font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
