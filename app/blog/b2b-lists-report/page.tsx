import { getPublicationCards } from "@/lib/content";
import { RelatedPosts } from "@/components/related-posts";
import { B2BListsReport } from "./report";

export const metadata = {
  title: "Списки товаров в B2B-маркетплейсах: отчёт 2026 — B2B Движение",
  description:
    "Как готовые подборки, спецификации и избранное меняют поведение B2B-покупателей",
};

export default function Page() {
  const publications = getPublicationCards();
  return (
    <B2BListsReport
      related={
        <RelatedPosts
          posts={publications}
          currentSlug="b2b-lists-report"
          title="Читать другие статьи"
        />
      }
    />
  );
}
