import { getAllPosts } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NewsGrid } from "./news-grid";

export const metadata = {
  title: "Новости — B2B Движение",
  description: "Новости компании, обновления платформы и события отрасли.",
};

interface NewsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const posts = getAllPosts("news");
  const params = await searchParams;
  const initialTag = params.tag || null;

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
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

          <NewsGrid posts={posts} initialTag={initialTag} />

          {posts.length === 0 && (
            <p className="text-center text-dim py-20">
              Пока нет новостей. Скоро здесь появятся обновления.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
