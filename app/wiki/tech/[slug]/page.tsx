import { notFound } from "next/navigation";
import { wikiTechArticles } from "@/lib/wiki-tech-data";
import { getArticleBySlug } from "@/lib/wiki-tree";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiArticleView } from "@/components/wiki/wiki-article-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return wikiTechArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("tech", slug);
  if (!article) return { title: "Статья не найдена — База знаний" };
  return {
    title: `${article.title} — База знаний B2B Движение`,
    description: article.description,
  };
}

export default async function WikiTechArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug("tech", slug);
  if (!article) notFound();

  return (
    <WikiShell activeSection="tech" activeArticleSlug={slug}>
      <WikiArticleView
        article={article}
        allArticlesInSection={wikiTechArticles}
      />
    </WikiShell>
  );
}
