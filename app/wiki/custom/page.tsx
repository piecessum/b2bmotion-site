import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiSectionView } from "@/components/wiki/wiki-section-view";
import { getSection } from "@/lib/wiki-tree";

export const metadata = {
  title: "Кастомизация под клиента — База знаний B2B Движение",
  description:
    "Настройки и доработки B2B-системы под конкретного клиента: витрина, пользователи, документы, реклама, SEO.",
};

export default function WikiCustomSectionPage() {
  const section = getSection("custom");
  if (!section) notFound();
  return (
    <WikiShell activeSection="custom">
      <WikiSectionView section={section} />
    </WikiShell>
  );
}
