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
  coverage?: number; // сколько источников осветили эту новость
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

export function decodeEntities(input: string): string {
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

export function stripTags(input: string): string {
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

// ── Дедупликация похожих новостей из разных источников ──
// Одно и то же событие («Шлюнкин возглавил Яндекс Маркет») приходит из 4-5
// лент разными словами. Кластеризуем по пересечению значимых слов заголовка.

const STOPWORDS = new Set([
  "и", "в", "во", "на", "с", "со", "о", "об", "от", "до", "для", "по", "за",
  "из", "к", "у", "не", "что", "как", "это", "его", "ее", "её", "их", "or",
  "the", "of", "и", "стал", "стала", "стало", "может", "будет", "был", "была",
  "года", "году", "год", "рф", "россии", "россия", "при", "над", "под", "про",
  "уже", "ещё", "еще", "его", "млн", "млрд", "руб",
]);

// Нормализуем слово: только буквы/цифры, грубое усечение окончаний до 6 символов.
function normWord(raw: string): string {
  const cleaned = raw.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
  return cleaned.length > 6 ? cleaned.slice(0, 6) : cleaned;
}

function titleTokens(title: string): Set<string> {
  const set = new Set<string>();
  for (const part of title.split(/\s+/)) {
    const bare = part.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
    if (bare.length < 4 || STOPWORDS.has(bare)) continue;
    set.add(normWord(part));
  }
  return set;
}

const OVERLAP_THRESHOLD = 0.5; // коэффициент перекрытия Шимкевича–Симпсона
const MIN_SHARED = 3; // минимум общих значимых слов (главная защита от ложных склеек)

// Из группы новостей про одно событие оставляем одну (с самым длинным анонсом),
// проставляя ей coverage = число осветивших источников.
function dedupeSimilar(items: NewsItem[]): NewsItem[] {
  const clusters: {
    rep: NewsItem;
    tokens: Set<string>;
    sources: Set<string>;
  }[] = [];

  for (const item of items) {
    const tokens = titleTokens(item.title);
    let placed = false;

    for (const cluster of clusters) {
      let inter = 0;
      for (const t of tokens) if (cluster.tokens.has(t)) inter++;
      const minSize = Math.min(tokens.size, cluster.tokens.size) || 1;
      const overlap = inter / minSize;

      if (overlap >= OVERLAP_THRESHOLD && inter >= MIN_SHARED) {
        cluster.sources.add(item.source);
        // представитель — с самым информативным (длинным) анонсом
        if ((item.summary?.length ?? 0) > (cluster.rep.summary?.length ?? 0)) {
          cluster.rep = item;
        }
        placed = true;
        break;
      }
    }

    if (!placed) {
      clusters.push({
        rep: item,
        tokens,
        sources: new Set([item.source]),
      });
    }
  }

  return clusters
    .map((c) => ({ ...c.rep, coverage: c.sources.size }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Стабильный короткий идентификатор по URL (djb2-хэш в base36).
function idFromUrl(url: string): string {
  let hash = 5381;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) + hash + url.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

// ── Самодостаточная ссылка на новость ──
// Внешние RSS-ленты хранят лишь N последних публикаций, поэтому старые новости
// (в т.ч. архивные) со временем выпадают из выдачи, и поиск по id их не находит.
// Чтобы клик по такой новости не давал 404, зашиваем минимум данных прямо в
// ссылку (base64url-токен), а страница восстанавливает новость из него, если в
// живой ленте её уже нет. Пересказ всё равно подтягивается по sourceUrl.

export function encodeNewsItem(item: NewsItem): string {
  const payload = {
    t: item.title,
    s: item.source,
    u: item.sourceUrl,
    d: item.date,
    i: item.image,
    m: item.summary?.slice(0, 400),
    id: item.id,
  };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function decodeNewsItem(token: string): NewsItem | null {
  try {
    const p = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
    if (!p?.t) return null;
    return {
      title: p.t,
      source: p.s || "Источник",
      date: p.d || new Date().toISOString(),
      image: p.i,
      summary: p.m,
      sourceUrl: p.u,
      id: p.id,
      href: "",
      external: true,
    };
  } catch {
    return null;
  }
}

// Все релевантные новости со всех лент: отфильтрованы, без URL-дублей,
// отсортированы по дате. БЕЗ similarity-дедупа — каждая новость присутствует
// под своим id. Используется для поиска по id (ссылки списка всегда находятся).
async function collectRelevant(): Promise<NewsItem[]> {
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
    const item: NewsItem = {
      title: cleanTitle(raw.title),
      date: toIso(raw.pubDate),
      image: raw.image,
      source: raw.source,
      href: `/news/b2b/${id}`,
      external: true,
      id,
      summary: raw.description,
      sourceUrl: raw.link,
    };
    // Токен с данными новости в ссылке — страховка от 404, когда новость
    // выпала из живой RSS-ленты (см. encodeNewsItem).
    item.href = `/news/b2b/${id}?d=${encodeNewsItem(item)}`;
    items.push(item);
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}

// Пул для списка и дайджеста: с дедупом похожих событий из разных источников.
async function fetchAllRelevant(): Promise<NewsItem[]> {
  return dedupeSimilar(await collectRelevant());
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
// Ищем по ПОЛНОМУ пулу (до similarity-дедупа): любая ссылка из списка —
// будь то представитель кластера или схлопнутая новость — всегда находится.
export async function getB2BNewsItem(id: string): Promise<NewsItem | null> {
  const items = await collectRelevant();
  return items.find((item) => item.id === id) ?? null;
}

// ── Пульс маркетплейсов ──
// Сколько новостей из текущей ленты упоминают каждую площадку — «о ком сейчас
// говорит рынок». Считаем по заголовку + анонсу, одно упоминание на новость.

export interface PulseEntry {
  name: string;
  count: number;
}

const PLAYERS: { name: string; kw: string[] }[] = [
  { name: "Wildberries", kw: ["wildberries", "вайлдберриз", "вайлдберис"] },
  { name: "Ozon", kw: ["ozon", "озон"] },
  { name: "Яндекс Маркет", kw: ["яндекс маркет", "яндекс.маркет", "яндекс-маркет"] },
  { name: "Мегамаркет", kw: ["мегамаркет"] },
  { name: "AliExpress", kw: ["aliexpress", "алиэкспресс"] },
];

export function marketplacePulse(items: NewsItem[]): PulseEntry[] {
  return PLAYERS.map((player) => {
    let count = 0;
    for (const item of items) {
      const haystack = `${item.title} ${item.summary ?? ""}`.toLowerCase();
      if (player.kw.some((kw) => haystack.includes(kw))) count++;
    }
    return { name: player.name, count };
  }).sort((a, b) => b.count - a.count);
}

// Недельный дайджест: главные события за неделю (осветили 2+ ленты), новые
// сверху. В начале недели свежих событий мало, поэтому добираем значимое из
// прошлой недели — оно держится в списке, пока его не вытеснят события текущей.
export async function getWeeklyDigest(target = 6): Promise<NewsItem[]> {
  const items = await fetchAllRelevant();
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const byRecency = (a: NewsItem, b: NewsItem) =>
    new Date(b.date).getTime() - new Date(a.date).getTime() ||
    (b.coverage ?? 1) - (a.coverage ?? 1);

  // Значимые события — те, что осветили минимум 2 источника.
  const important = items.filter((i) => (i.coverage ?? 1) >= 2).sort(byRecency);
  const within = (days: number) =>
    important.filter((i) => new Date(i.date).getTime() >= now - days * day);

  // База — значимое за текущую неделю; если набралось мало (начало недели),
  // расширяем окно до двух недель, добирая прошлонедельные события.
  let digest = within(7);
  if (digest.length < target) digest = within(14);

  // Совсем тихая неделя: дополняем одиночными свежими новостями за 7 дней,
  // чтобы список не схлопывался до пары пунктов.
  if (digest.length < target) {
    const seen = new Set(digest.map((i) => i.href));
    const fillers = items
      .filter(
        (i) => !seen.has(i.href) && new Date(i.date).getTime() >= now - 7 * day,
      )
      .sort(byRecency);
    digest = [...digest, ...fillers];
  }

  return digest.slice(0, target);
}
