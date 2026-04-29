import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiCategoryView } from "@/components/wiki/wiki-section-view";
import { getCategory, getSection } from "@/lib/wiki-tree";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  const section = getSection("custom");
  if (!section) return [];
  return section.categories.map((c) => ({ categoryId: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categoryId } = await params;
  const ctx = getCategory("custom", categoryId);
  if (!ctx) return { title: "Категория не найдена — База знаний" };
  return {
    title: `${ctx.category.title} — ${ctx.section.title}`,
    description: `Статьи в категории «${ctx.category.title}» раздела «${ctx.section.title}».`,
  };
}

export default async function WikiCustomCategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const ctx = getCategory("custom", categoryId);
  if (!ctx) notFound();
  return (
    <WikiShell activeSection="custom" activeCategoryId={categoryId}>
      <WikiCategoryView section={ctx.section} category={ctx.category} />
    </WikiShell>
  );
}
