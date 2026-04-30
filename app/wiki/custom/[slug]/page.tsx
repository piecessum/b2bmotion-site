import { notFound } from "next/navigation";
import { wikiCustomArticles } from "@/lib/wiki-content";
import { getArticleBySlug } from "@/lib/wiki-tree";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiArticleView } from "@/components/wiki/wiki-article-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return wikiCustomArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("custom", slug);
  if (!article) return { title: "Статья не найдена — База знаний" };
  return {
    title: `${article.title} — База знаний B2B Движение`,
    description: article.description,
  };
}

export default async function WikiCustomArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("custom", slug);
  if (!article) notFound();

  return (
    <WikiShell activeSection="custom" activeArticleSlug={slug}>
      <WikiArticleView
        article={article}
        allArticlesInSection={wikiCustomArticles}
      />
    </WikiShell>
  );
}
