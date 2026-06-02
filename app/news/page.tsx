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
    tags: post.tags,
  }));

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="px-6 pb-28 pt-36">
        <div className="mx-auto max-w-6xl">
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
