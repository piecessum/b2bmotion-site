// Агрегатор внешних новостей по B2B-рынку РФ.
// Тянет RSS с профильных площадок, фильтрует по релевантности B2B/опт/e-com,
// дедуплицирует и сортирует по дате. Выполняется на сервере (ISR-кеш).

export interface NewsItem {
  title: string;
  date: string; // ISO
  image?: string;
  source: string;
  href: string; // куда ведёт карточка (внутренний маршрут)
  external: boolean;
  tags?: string[];
  id?: string; // стабильный идентификатор внешней новости
  summary?: string; // краткий пересказ (анонс из ленты)
  sourceUrl?: string; // ссылка на оригинал
}

// Ленты-источники. Добавляйте/убирайте здесь.
// Общеновостные (РБК, Ведомости, Коммерсантъ, Forbes) проходят тот же
// keyword-фильтр, поэтому в ленту попадает только B2B-релевантное.
const FEEDS: { source: string; url: string }[] = [
  // Профильные (ритейл / e-com / B2B)
  { source: "New Retail", url: "https://new-retail.ru/rss/" },
  { source: "Retail.ru", url: "https://www.retail.ru/rss/news/" },
  { source: "Oborot.ru", url: "https://oborot.ru/rss" },
  // Деловые и общеновостные
  { source: "Ведомости", url: "https://www.vedomosti.ru/rss/news" },
  { source: "РБК", url: "https://rssexport.rbc.ru/rbcnews/news/30/full.rss" },
  { source: "Коммерсантъ", url: "https://www.kommersant.ru/RSS/news.xml" },
  { source: "Forbes", url: "https://www.forbes.ru/newrss.xml" },
  { source: "Rusbase", url: "https://rb.ru/feeds/all/" },
  { source: "E-xecutive", url: "https://www.e-xecutive.ru/rss/community" },
  // Технологии / телеком
  { source: "CNews", url: "https://www.cnews.ru/inc/rss/news.xml" },
  { source: "TAdviser", url: "https://www.tadviser.ru/xml/tadviser.xml" },
  { source: "ComNews", url: "https://www.comnews.ru/rss" },
];

// Ключевые слова релевантности (в нижнем регистре). Достаточно совпадения
// в заголовке ИЛИ описании. Список сфокусирован строго на B2B-торговле,
// маркетплейсах, интернет-торговле и связанной с ними технологии.
// Намеренно НЕ включаем обобщённые слова (поставки, снабжение, закупки,
// тендер, дилер) — они притягивают военные/энергетические/госзакупочные темы.
const KEYWORDS = [
  // B2B и опт
  "b2b",
  "оптов",
  "оптом",
  "мелкоопт",
  "дистрибуц",
  "дистрибьютор",
  "дистрибутор",
  "дистрибьюшн",
  // Маркетплейсы и площадки
  "маркетплейс",
  "wildberries",
  "вайлдберриз",
  "вайлдберис",
  "ozon",
  "озон",
  "яндекс маркет",
  "яндекс.маркет",
  "мегамаркет",
  "aliexpress",
  "алиэкспресс",
  "селлер",
  "фулфилмент",
  "fulfillment",
  // Интернет-торговля и e-commerce
  "интернет-магазин",
  "интернет-торговл",
  "онлайн-торговл",
  "онлайн-продаж",
  "онлайн-ритейл",
  "электронная коммерц",
  "электронной коммерц",
  "электронную коммерц",
  "электронной торговл",
  "e-commerce",
  "ecommerce",
  "e-com ",
  // Ритейл и e-grocery
  "ритейл",
  "e-grocery",
  "товарооборот",
];

const REVALIDATE_SECONDS = 3600; // обновлять ленту раз в час
const MAX_ITEMS = 60;
const PER_SOURCE_CAP = 12; // не больше N свежих новостей с одного источника

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

// Убираем хвост-источник из заголовков (" | New-Retail.ru", " — РБК" и т.п.).
function cleanTitle(title: string): string {
  // Всё после последней вертикальной черты — почти всегда название источника.
  let t = title.replace(/\s*\|\s*[^|]{1,40}$/u, "").trim();
  // Подстраховка для тире-разделителей: режем только если хвост похож на источник.
  t = t
    .replace(/\s*[—–-]\s*[^—–-]{0,30}$/u, (m) =>
      /retail|oborot|tadviser|forbes|rbc|рбк|\.ru/i.test(m) ? "" : m,
    )
    .trim();
  return t || title.trim();
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

// Ссылка в Atom лежит в атрибуте href, а не в тексте тега <link>.
function atomLink(block: string): string {
  const alt = block.match(
    /<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i,
  );
  if (alt) return alt[1];
  const any = block.match(
    /<link(?![^>]*rel=["']self["'])[^>]*href=["']([^"']+)["']/i,
  );
  return any ? any[1] : "";
}

// Поддерживаем и RSS (<item>), и Atom (<entry>).
function parseFeed(xml: string, source: string): RawItem[] {
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi);
  if (itemBlocks && itemBlocks.length) {
    return itemBlocks.map((block) => ({
      title: stripTags(getTag(block, "title")),
      link: stripTags(getTag(block, "link")),
      description: stripTags(getTag(block, "description")),
      pubDate: stripTags(getTag(block, "pubDate")),
      image: extractImage(block),
      source,
    }));
  }

  const entryBlocks = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return entryBlocks.map((block) => ({
    title: stripTags(getTag(block, "title")),
    link: atomLink(block),
    description: stripTags(getTag(block, "summary") || getTag(block, "content")),
    pubDate: stripTags(getTag(block, "published") || getTag(block, "updated")),
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

// Стабильный короткий идентификатор по URL (djb2-хэш в base36).
function idFromUrl(url: string): string {
  let hash = 5381;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) + hash + url.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

// Полный пул релевантных новостей со всех лент: отфильтрован, без дублей,
// отсортирован по дате. Без среза и лимита на источник — используется и для
// списка (после ограничений), и для поиска по id (по всему пулу).
async function fetchAllRelevant(): Promise<NewsItem[]> {
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
      return parseFeed(xml, feed.source);
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
    const id = idFromUrl(key);
    items.push({
      title: cleanTitle(raw.title),
      date: toIso(raw.pubDate),
      image: raw.image,
      source: raw.source,
      href: `/news/b2b/${id}`,
      external: true,
      id,
      summary: raw.description,
      sourceUrl: raw.link,
    });
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}

export async function fetchB2BNews(): Promise<NewsItem[]> {
  const items = await fetchAllRelevant();

  // Ограничиваем вклад каждого источника, чтобы высокочастотные
  // общеновостные ленты не вытесняли профильные.
  const perSourceCount = new Map<string, number>();
  const balanced = items.filter((item) => {
    const count = perSourceCount.get(item.source) ?? 0;
    if (count >= PER_SOURCE_CAP) return false;
    perSourceCount.set(item.source, count + 1);
    return true;
  });

  return balanced.slice(0, MAX_ITEMS);
}

// Находит одну внешнюю новость по идентификатору (для страницы-пересказа).
// Ищем по всему пулу, а не по урезанному списку, — чтобы ссылка работала
// даже если новость не попала в top-N из-за лимита на источник.
export async function getB2BNewsItem(id: string): Promise<NewsItem | null> {
  const items = await fetchAllRelevant();
  return items.find((item) => item.id === id) ?? null;
}
