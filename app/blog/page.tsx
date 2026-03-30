import { getAllPosts } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogContent } from "@/components/blog-content";

export const metadata = {
  title: "Блог — B2B Движение",
  description:
    "Статьи о B2B-продажах, автоматизации и e-commerce для оптовых компаний.",
};

export default function BlogPage() {
  const posts = getAllPosts("blog");

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
              Блог
            </span>
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
              Статьи и <span className="gradient-text">материалы</span>
            </h1>
            <p className="mt-4 text-lg text-subtle max-w-xl">
              Делимся опытом автоматизации оптовых продаж, кейсами и полезными
              инструментами.
            </p>
          </div>

          <BlogContent posts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
