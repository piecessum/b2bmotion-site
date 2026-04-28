import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiSectionView } from "@/components/wiki/wiki-section-view";
import { getSection } from "@/lib/wiki-tree";

export const metadata = {
  title: "Технические настройки — База знаний B2B Движение",
  description:
    "Техническая документация платформы B2B Движение: интеграция с 1С и ERP, API, РАЭК, шлюзовые таблицы.",
};

export default function WikiTechSectionPage() {
  const section = getSection("tech");
  if (!section) notFound();
  return (
    <WikiShell activeSection="tech">
      <WikiSectionView section={section} />
    </WikiShell>
  );
}
