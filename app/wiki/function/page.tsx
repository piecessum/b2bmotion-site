import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki/wiki-shell";
import { WikiSectionView } from "@/components/wiki/wiki-section-view";
import { getSection } from "@/lib/wiki-tree";

export const metadata = {
  title: "Функционал системы — База знаний B2B Движение",
  description:
    "Базовый функционал платформы B2B Движение: личные кабинеты, каталог, поиск, оплата, доставка, документооборот.",
};

export default function WikiFunctionSectionPage() {
  const section = getSection("function");
  if (!section) notFound();
  return (
    <WikiShell activeSection="function">
      <WikiSectionView section={section} />
    </WikiShell>
  );
}
