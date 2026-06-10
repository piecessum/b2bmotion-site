import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEXING, ALLOW_AI_BOTS } from "@/lib/site";

export const dynamic = "force-static";

// AI-краулеры. Две группы:
//  • search/answer — ходят за ответом в реальном времени и ставят ссылку на нас
//    (дают трафик и цитаты в ChatGPT/Perplexity). Это и есть цель GEO.
//  • training — забирают контент в обучение моделей, прямого трафика не дают.
// Закрыть только training можно, убрав их из массива (оставив search-группу).
const AI_BOTS = [
  // search / answer
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  // training
  "GPTBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // На тестовом домене всё закрыто, чтобы не плодить дублей будущего сайта.
  // После переезда NEXT_PUBLIC_ALLOW_INDEXING=true откроет правила.
  if (!ALLOW_INDEXING) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/", disallow: ["/api/"] },
  ];

  // Явно приглашаем (или закрываем) AI-краулеры — флаг NEXT_PUBLIC_ALLOW_AI_BOTS.
  rules.push({
    userAgent: AI_BOTS,
    ...(ALLOW_AI_BOTS ? { allow: "/", disallow: ["/api/"] } : { disallow: "/" }),
  });

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
