import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/content";
import { getAllAuthors } from "@/lib/authors";
import { allWikiArticles, wikiSections } from "@/lib/wiki-tree";

export const dynamic = "force-static";

/** Статические маршруты сайта с приоритетами для поисковиков. */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
  { path: "/platform/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/cabinet", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/marketing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mobile-app", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chatbots", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mdm", priority: 0.7, changeFrequency: "monthly" },
  // Отраслевые лендинги
  { path: "/fmcg", priority: 0.8, changeFrequency: "monthly" },
  { path: "/electro", priority: 0.8, changeFrequency: "monthly" },
  { path: "/computers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/building", priority: 0.8, changeFrequency: "monthly" },
  // Разделы
  { path: "/cases", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/wiki", priority: 0.7, changeFrequency: "weekly" },
  { path: "/clients", priority: 0.6, changeFrequency: "monthly" },
  { path: "/video", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contacts", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/agreement", priority: 0.2, changeFrequency: "yearly" },
];

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Статьи блога
  const blogPosts = getAllPosts("blog");
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parseDate(post.date) ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Новости
  const newsPosts = getAllPosts("news");
  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: parseDate(post.date) ?? now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Страницы авторов блога
  const authorEntries: MetadataRoute.Sitemap = getAllAuthors("blog").map((author) => ({
    url: `${SITE_URL}/blog/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  // Wiki: секции, категории, статьи
  const wikiSectionEntries: MetadataRoute.Sitemap = wikiSections.flatMap((section) => [
    {
      url: `${SITE_URL}/wiki/${section.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...section.categories.map((c) => ({
      url: `${SITE_URL}/wiki/${section.id}/category/${c.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ]);

  const wikiArticleEntries: MetadataRoute.Sitemap = allWikiArticles.map((article) => ({
    url: `${SITE_URL}${article.url}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...newsEntries,
    ...authorEntries,
    ...wikiSectionEntries,
    ...wikiArticleEntries,
  ];
}
