import { getAllPosts } from "@/lib/content";
import { fetchB2BNews, type NewsItem } from "@/lib/b2b-news";
import { fetchRates } from "@/lib/rates";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NewsClient } from "./news-client";

export const metadata = {
  title: "Новости — B2B Движение",
  description:
    "Новости B2B-рынка РФ со всех площадок и обновления платформы B2B Движение — в одном месте.",
};

// Лента внешних новостей и курсы кешируются на час (ISR).
export const revalidate = 3600;

function moscowToday(): { y: number; m: number; d: number } {
  const msk = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  );
  return { y: msk.getFullYear(), m: msk.getMonth(), d: msk.getDate() };
}

export default async function NewsPage() {
  const [b2bItems, rates] = await Promise.all([fetchB2BNews(), fetchRates()]);

  // Новости платформы — из локальных markdown-файлов, приводим к единому виду.
  const platformItems: NewsItem[] = getAllPosts("news").map((post) => ({
    title: post.title,
    date: post.date,
    image: post.image,
    source: post.source?.text || "B2B Движение",
    href: `/news/${post.slug}`,
    external: false,
  }));

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="px-6 pb-28 pt-36">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/[0.1] bg-[#8B5CF6]/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#C084FC]">
              Новости
            </span>
            <h1 className="font-heading text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.02em] text-heading">
              Новости <span className="gradient-text">B2B-рынка</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-subtle">
              Всё важное о B2B-рынке РФ с разных площадок и обновления платформы — в одном месте.
            </p>
          </div>

          <NewsClient
            b2bItems={b2bItems}
            platformItems={platformItems}
            rates={rates}
            today={moscowToday()}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
