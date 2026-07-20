import { getPublicationCards } from "@/lib/content";
import { RelatedPosts } from "@/components/related-posts";
import { B2BPlatformsReport } from "./report";

export const metadata = {
  title: "B2B Платформы: Россия vs Мир — B2B Движение",
  description:
    "Сравнение российских и мировых B2B-платформ: функции, цены, сроки внедрения и рекомендации",
};

export default function Page() {
  const publications = getPublicationCards();
  return (
    <B2BPlatformsReport
      related={
        <RelatedPosts
          posts={publications}
          currentSlug="b2b-platforms-report"
          title="Читать другие статьи"
        />
      }
    />
  );
}
