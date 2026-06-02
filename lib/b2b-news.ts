// Агрегатор внешних новостей по B2B-рынку РФ.
// Тянет RSS с профильных площадок, фильтрует по релевантности B2B/опт/e-com,
// дедуплицирует и сортирует по дате. Выполняется на сервере (ISR-кеш).

export interface NewsItem {
  title: string;
  date: string; // ISO
  image?: string;
  source: string;
  href: string;
  external: boolean;
}

// Профильные ленты. Добавляйте/убирайте источники здесь.
const FEEDS: { source: string; url: string }[] = [
  { source: "New Retail", url: "https://new-retail.ru/rss/" },
  { source: "Retail.ru", url: "https://www.retail.ru/rss/news/" },
  { source: "Oborot.ru", url: "https://oborot.ru/rss" },
  { source: "TAdviser", url: "https://www.tadviser.ru/xml/tadviser.xml" },
];

// Ключевые слова релевантности B2B-рынку РФ (в нижнем регистре).
// Достаточно совпадения в заголовке ИЛИ описании.
const KEYWORDS = [
  "b2b",
  "оптов",
  "оптом",
  "мелкоопт",
  "дистрибуц",
  "дистрибьютор",
  "дистрибутор",
  "дистрибьюшн",
  "поставщик",
  "поставк",
  "закуп",
  "снабжен",
  "тендер",
  "маркетплейс",
  "e-commerce",
  "e-com",
  "электронная коммерц",
  "электронной коммерц",
  "дилер",
];

const REVALIDATE_SECONDS = 3600; // обновлять ленту раз в час
const MAX_ITEMS = 40;

interface RawItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  source: string;
}

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

function stripTags(input: string): string {
  return decodeEntities(input)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match ? match[1] : "";
}

// Убираем хвост вида " | New Retail" из заголовков.
function cleanTitle(title: string): string {
  return title.replace(/\s*[|—–-]\s*[^|—–-]{0,30}$/u, (m) =>
    /retail|oborot|tadviser|\.ru/i.test(m) ? "" : m,
  ).trim() || title.trim();
}

function extractImage(block: string): string | undefined {
  const enclosure = block.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
  if (enclosure) return enclosure[1];
  const media = block.match(/<media:content[^>]*url=["']([^"']+)["']/i);
  if (media) return media[1];
  // Картинка внутри description / content:encoded (oborot.ru и др.)
  const img = block.match(/<img[^>]*src=["']([^"']+)["']/i);
  if (img) return decodeEntities(img[1]);
  return undefined;
}

function parseRss(xml: string, source: string): RawItem[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return blocks.map((block) => ({
    title: stripTags(getTag(block, "title")),
    link: stripTags(getTag(block, "link")),
    description: stripTags(getTag(block, "description")),
    pubDate: stripTags(getTag(block, "pubDate")),
    image: extractImage(block),
    source,
  }));
}

function isRelevant(item: RawItem): boolean {
  const haystack = `${item.title} ${item.description}`.toLowerCase();
  return KEYWORDS.some((kw) => haystack.includes(kw));
}

function toIso(pubDate: string): string {
  const parsed = new Date(pubDate);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
}

export async function fetchB2BNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; b2bmotion-news-bot/1.0)",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) return [] as RawItem[];
      const xml = await res.text();
      return parseRss(xml, feed.source);
    }),
  );

  const all = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );

  const seen = new Set<string>();
  const items: NewsItem[] = [];

  for (const raw of all) {
    if (!raw.link || !raw.title) continue;
    if (!isRelevant(raw)) continue;
    const key = raw.link.split("?")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      title: cleanTitle(raw.title),
      date: toIso(raw.pubDate),
      image: raw.image,
      source: raw.source,
      href: raw.link,
      external: true,
    });
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items.slice(0, MAX_ITEMS);
}
