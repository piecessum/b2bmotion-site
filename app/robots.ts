import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEXING } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // На тестовом домене индексация закрыта полностью, чтобы не создавать
  // дублей будущего боевого сайта. После переезда выставить
  // NEXT_PUBLIC_ALLOW_INDEXING=true — правила откроют сайт автоматически.
  if (!ALLOW_INDEXING) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
