import { getAllPosts } from "@/lib/content";
import { getAllAuthors } from "@/lib/authors";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogContent } from "@/components/blog-content";
import { Stories } from "@/components/stories";
import Link from "next/link";

export const metadata = {
  title: "Блог — B2B Движение",
  description:
    "Статьи о B2B-продажах, автоматизации и e-commerce для оптовых компаний.",
};

interface BlogPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getAllPosts("blog");
  const authors = getAllAuthors("blog");
  const params = await searchParams;
  const initialFilter =
    params.tab === "cases"
      ? "cases"
      : params.tab === "publications"
        ? "publications"
        : "all";

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
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

            {/* Авторы блога */}
            {authors.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                <span className="text-xs text-dim mr-0.5">Авторы:</span>
                {authors.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/author/${a.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] py-1 pl-1 pr-3 transition-colors hover:border-[#3B82F6]/30"
                  >
                    {a.photo && (
                      <img
                        src={a.photo}
                        alt={a.name}
                        className="w-6 h-6 rounded-full object-cover object-top shrink-0"
                      />
                    )}
                    <span className="text-xs font-medium text-subtle group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors whitespace-nowrap">
                      {a.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Stories />

          <BlogContent posts={posts} initialFilter={initialFilter} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
